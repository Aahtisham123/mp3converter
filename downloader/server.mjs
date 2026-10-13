// MP3 Converter link download service.
// Fetches a video from a pasted link with yt-dlp, optionally converts it to MP3 with FFmpeg,
// and serves the result for a limited time. No dependencies beyond Node 20+, yt-dlp and FFmpeg.

import { spawn } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { mkdir, readdir, rm, stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { lookup } from 'node:dns/promises';
import { isIP } from 'node:net';
import { join } from 'node:path';

// ---------------------------------------------------------------- config
const env = process.env;
const CONFIG = {
  port: Number(env.PORT || 8080),
  allowedOrigins: (env.ALLOWED_ORIGINS || 'https://mp3convert.tools,https://www.mp3convert.tools').split(',').map((s) => s.trim()).filter(Boolean),
  workDir: env.WORK_DIR || '/tmp/mp3c-jobs',
  ytdlp: env.YTDLP_BIN || 'yt-dlp',
  jsRuntime: env.YTDLP_JS_RUNTIME ?? 'node', // YouTube needs a JS runtime; '' disables the flag
  proxy: env.YTDLP_PROXY || '',
  cookies: env.YTDLP_COOKIES || '',
  maxDuration: Number(env.MAX_DURATION_SECONDS || 3 * 60 * 60),
  maxFilesize: env.MAX_FILESIZE || '1500M',
  maxConcurrent: Number(env.MAX_CONCURRENT_JOBS || 3),
  jobsPerHour: Number(env.JOBS_PER_IP_PER_HOUR || 20),
  infoPerHour: Number(env.INFO_PER_IP_PER_HOUR || 60),
  jobTimeoutMs: Number(env.JOB_TIMEOUT_MINUTES || 30) * 60_000,
  fileTtlMs: Number(env.FILE_TTL_MINUTES || 30) * 60_000,
  trustProxy: env.TRUST_PROXY === '1',
  allowPrivate: env.ALLOW_PRIVATE_URLS === '1', // testing only
  blocklist: (env.BLOCKLIST || '').split(',').map((s) => s.trim().toLowerCase()).filter(Boolean),
};

const MP3_QUALITIES = [128, 192, 256, 320];
const MP4_QUALITIES = [360, 480, 720, 1080];

// ---------------------------------------------------------------- helpers
const log = (...a) => console.log(new Date().toISOString(), ...a);

function send(res, status, body, headers = {}) {
  const data = typeof body === 'string' ? body : JSON.stringify(body);
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...headers });
  res.end(data);
}

function clientIp(req) {
  if (CONFIG.trustProxy) {
    const fwd = req.headers['x-forwarded-for'];
    if (fwd) return String(fwd).split(',')[0].trim();
  }
  return req.socket.remoteAddress || 'unknown';
}

async function readJson(req, limit = 8 * 1024) {
  let size = 0;
  const chunks = [];
  for await (const chunk of req) {
    size += chunk.length;
    if (size > limit) throw Object.assign(new Error('Request too large'), { status: 413 });
    chunks.push(chunk);
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');
  } catch {
    throw Object.assign(new Error('Invalid JSON'), { status: 400 });
  }
}

// Simple sliding-window rate limiter kept in memory.
const hits = new Map();
function rateLimited(ip, bucket, perHour) {
  const key = `${bucket}:${ip}`;
  const now = Date.now();
  const list = (hits.get(key) || []).filter((t) => now - t < 3_600_000);
  if (list.length >= perHour) {
    hits.set(key, list);
    return true;
  }
  list.push(now);
  hits.set(key, list);
  return false;
}

function isPrivateAddress(addr) {
  if (isIP(addr) === 4) {
    const [a, b] = addr.split('.').map(Number);
    return a === 10 || a === 127 || a === 0 || (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) || (a === 100 && b >= 64 && b <= 127) || a >= 224;
  }
  const v = addr.toLowerCase();
  if (v.startsWith('::ffff:')) return isPrivateAddress(v.slice(7));
  return v === '::1' || v === '::' || v.startsWith('fc') || v.startsWith('fd') || v.startsWith('fe80');
}

/** Validates a user-supplied link. Returns a normalised URL string or throws a friendly error. */
async function checkUrl(input) {
  const raw = String(input || '').trim();
  let url;
  try {
    url = new URL(raw);
  } catch {
    throw Object.assign(new Error('Please paste a full link that starts with http:// or https://'), { status: 400 });
  }
  if (!['http:', 'https:'].includes(url.protocol) || raw.length > 2048) {
    throw Object.assign(new Error('Please paste a full link that starts with http:// or https://'), { status: 400 });
  }
  const host = url.hostname.replace(/^\[|\]$/g, '').toLowerCase();
  if (CONFIG.blocklist.some((b) => host === b || host.endsWith(`.${b}`) || raw.toLowerCase().includes(b))) {
    throw Object.assign(new Error('Downloads from this link have been disabled at the request of the rights holder.'), { status: 451 });
  }
  if (!CONFIG.allowPrivate) {
    if (host === 'localhost' || host.endsWith('.local') || host.endsWith('.internal')) {
      throw Object.assign(new Error('This link is not allowed.'), { status: 400 });
    }
    let addrs;
    try {
      addrs = isIP(host) ? [{ address: host }] : await lookup(host, { all: true });
    } catch {
      throw Object.assign(new Error('We could not reach that website. Please check the link.'), { status: 400 });
    }
    if (addrs.some((a) => isPrivateAddress(a.address))) {
      throw Object.assign(new Error('This link is not allowed.'), { status: 400 });
    }
  }
  return url.toString();
}

function baseArgs() {
  const args = ['--no-playlist', '--no-warnings', '--no-progress', '--socket-timeout', '20', '--retries', '3'];
  if (CONFIG.jsRuntime) args.push('--js-runtimes', CONFIG.jsRuntime);
  if (CONFIG.proxy) args.push('--proxy', CONFIG.proxy);
  if (CONFIG.cookies) args.push('--cookies', CONFIG.cookies);
  return args;
}

/** Turns yt-dlp's stderr into something a visitor can understand. */
function friendlyError(stderr = '') {
  const s = stderr.toLowerCase();
  if (s.includes('confirm your age') || s.includes('age-restricted') || s.includes('inappropriate for some users'))
    return 'This video is age-restricted and cannot be downloaded.';
  if (s.includes('sign in to confirm') || s.includes('http error 429') || s.includes('too many requests') ||
      s.includes('http error 403') || s.includes('forbidden') || s.includes('po token'))
    return 'The website is temporarily blocking downloads from our server. Please try again in a few minutes.';
  if (s.includes('private video') || s.includes('members-only') || s.includes('join this channel'))
    return 'This video is private or for members only, so it cannot be downloaded.';
  if (s.includes('requested format is not available')) return 'That quality is not available for this video. Try another option.';
  if (s.includes('drm')) return 'This video is copy protected (DRM) and cannot be downloaded.';
  if (s.includes('unsupported url')) return 'We could not find a video on that page. Try the direct link to the video page.';
  if (s.includes('larger than max-filesize') || s.includes('file is larger')) return 'This video is too large to download here.';
  if (s.includes('does not pass filter')) return `Live streams and videos longer than ${Math.round(CONFIG.maxDuration / 3600)} hours cannot be downloaded.`;
  if (s.includes('video unavailable') || s.includes('not available') || s.includes('http error 404') || s.includes('http error 410'))
    return 'This video is unavailable or has been removed.';
  return 'Something went wrong while fetching this video. Please check the link and try again.';
}

function run(args, { timeoutMs = 60_000, onLine } = {}) {
  return new Promise((resolve) => {
    const child = spawn(CONFIG.ytdlp, args, { stdio: ['ignore', 'pipe', 'pipe'] });
    let stdout = '';
    let stderr = '';
    let buffer = '';
    const timer = setTimeout(() => child.kill('SIGKILL'), timeoutMs);
    child.stdout.on('data', (d) => {
      const text = d.toString();
      if (onLine) {
        buffer += text;
        const lines = buffer.split(/\r?\n/);
        buffer = lines.pop();
        lines.forEach(onLine);
      } else stdout += text;
    });
    child.stderr.on('data', (d) => {
      stderr += d.toString();
      if (stderr.length > 20_000) stderr = stderr.slice(-20_000);
    });
    child.on('error', (err) => {
      clearTimeout(timer);
      resolve({ code: -1, stdout, stderr: String(err) });
    });
    child.on('close', (code) => {
      clearTimeout(timer);
      resolve({ code, stdout, stderr });
    });
  });
}

function safeFilename(title, ext) {
  const clean = String(title || 'download')
    .replace(/[\\/:*?"<>|\u0000-\u001f]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 120) || 'download';
  return `${clean}.${ext}`;
}

// ---------------------------------------------------------------- jobs
const jobs = new Map();
let running = 0;

function publicJob(job) {
  return {
    id: job.id,
    status: job.status, // queued | downloading | converting | done | error
    progress: job.progress,
    error: job.error || undefined,
    filename: job.filename || undefined,
    size: job.size || undefined,
  };
}

async function startJob(job) {
  running++;
  job.status = 'downloading';
  const out = join(CONFIG.workDir, job.id);
  await mkdir(out, { recursive: true });

  const args = [
    ...baseArgs(),
    '--newline',
    '--progress',
    '--progress-template', 'download:PROGRESS %(progress._percent_str)s',
    '--max-filesize', CONFIG.maxFilesize,
    '--match-filter', `!is_live & duration <=? ${CONFIG.maxDuration}`,
    '--no-mtime',
    '--restrict-filenames',
    '-o', join(out, 'media.%(ext)s'),
  ];
  if (job.type === 'mp3') {
    args.push('-f', 'bestaudio/best', '-x', '--audio-format', 'mp3', '--audio-quality', `${job.quality}K`);
  } else {
    args.push(
      '-f', 'bv*+ba/b',
      '-S', `res:${job.quality},vcodec:h264,acodec:m4a`,
      '--merge-output-format', 'mp4',
      '--remux-video', 'mp4',
    );
  }
  args.push('--', job.url);

  let files = 0;
  const result = await run(args, {
    timeoutMs: CONFIG.jobTimeoutMs,
    onLine: (line) => {
      const m = /^PROGRESS\s+([\d.]+)%/.exec(line.trim());
      if (m) {
        // Video and audio are often downloaded separately; show the second half for the audio part.
        const pct = Number(m[1]);
        if (pct < 1 && job.lastPct > 90) files++;
        job.lastPct = pct;
        const weight = job.type === 'mp4' ? (files === 0 ? 0.85 : 0.1) : 0.9;
        const offset = job.type === 'mp4' && files > 0 ? 85 : 0;
        job.progress = Math.min(95, Math.round(offset + pct * weight));
      } else if (/\[(ExtractAudio|Merger|VideoRemuxer|FixupM3u8)\]/.test(line)) {
        job.status = 'converting';
        job.progress = Math.max(job.progress, 95);
      }
    },
  });
  running--;

  const produced = (await readdir(out).catch(() => [])).filter((f) => f.startsWith('media.') && f.endsWith(`.${job.type}`));
  if (result.code !== 0 || !produced.length) {
    job.status = 'error';
    job.error = friendlyError(result.stderr);
    log('job failed', job.id, result.code, result.stderr.split('\n').filter(Boolean).slice(-2).join(' | '));
    await rm(out, { recursive: true, force: true });
    return;
  }
  job.path = join(out, produced[0]);
  job.size = (await stat(job.path)).size;
  job.filename = safeFilename(job.title, job.type);
  job.status = 'done';
  job.progress = 100;
  job.finishedAt = Date.now();
  log('job done', job.id, job.type, job.quality, job.size);
}

// Remove old jobs and their files.
setInterval(async () => {
  const now = Date.now();
  for (const [id, job] of jobs) {
    const age = now - (job.finishedAt || job.createdAt);
    if ((job.status === 'done' || job.status === 'error') && age > CONFIG.fileTtlMs) {
      jobs.delete(id);
      await rm(join(CONFIG.workDir, id), { recursive: true, force: true });
    }
  }
  for (const [key, list] of hits) if (!list.some((t) => now - t < 3_600_000)) hits.delete(key);
}, 60_000).unref();

// ---------------------------------------------------------------- routes
async function handleInfo(req, res, ip) {
  if (rateLimited(ip, 'info', CONFIG.infoPerHour)) return send(res, 429, { error: 'Too many requests. Please wait a little and try again.' });
  const { url } = await readJson(req);
  const target = await checkUrl(url);
  const result = await run([...baseArgs(), '--dump-single-json', '--skip-download', '--', target], { timeoutMs: 45_000 });
  if (result.code !== 0) {
    log('info failed', new URL(target).hostname, result.code, result.stderr.split('\n').filter(Boolean).slice(-3).join(' | '));
    return send(res, 422, { error: friendlyError(result.stderr) });
  }
  let info;
  try {
    info = JSON.parse(result.stdout);
  } catch {
    return send(res, 422, { error: friendlyError('') });
  }
  if (info._type === 'playlist') return send(res, 422, { error: 'Playlists are not supported. Please paste the link to a single video.' });
  if (info.is_live) return send(res, 422, { error: 'Live streams cannot be downloaded.' });
  if (info.duration && info.duration > CONFIG.maxDuration) {
    return send(res, 422, { error: `Videos longer than ${Math.round(CONFIG.maxDuration / 3600)} hours cannot be downloaded.` });
  }
  const formats = Array.isArray(info.formats) ? info.formats : [info];
  const heights = new Set();
  let hasAudio = false;
  let hasVideo = false;
  for (const f of formats) {
    if (f.vcodec && f.vcodec !== 'none') hasVideo = true;
    if (f.acodec && f.acodec !== 'none') hasAudio = true;
    if (f.height && f.vcodec !== 'none') heights.add(f.height);
  }
  if (!hasVideo && !hasAudio && info.ext) hasVideo = ['mp4', 'webm', 'mkv', 'mov'].includes(info.ext);
  if (!hasAudio && !hasVideo) hasAudio = true; // unknown direct file: let the job try
  const maxH = Math.max(0, ...heights);
  const mp4 = hasVideo ? MP4_QUALITIES.filter((q, i) => i === 0 || q <= maxH || !maxH) : [];
  send(res, 200, {
    title: info.title || info.id || 'Video',
    thumbnail: info.thumbnail || null,
    duration: info.duration || null,
    uploader: info.uploader || info.channel || null,
    site: info.extractor_key && info.extractor_key !== 'Generic' ? info.extractor_key : null,
    url: info.webpage_url || target,
    options: { mp3: hasAudio || hasVideo ? MP3_QUALITIES : [], mp4 },
  });
}

async function handleCreateJob(req, res, ip) {
  const { url, type, quality, title } = await readJson(req);
  const target = await checkUrl(url);
  const q = Number(quality);
  if (!['mp3', 'mp4'].includes(type) || !(type === 'mp3' ? MP3_QUALITIES : MP4_QUALITIES).includes(q)) {
    return send(res, 400, { error: 'Please choose a valid format and quality.' });
  }
  if (running >= CONFIG.maxConcurrent) return send(res, 503, { error: 'Our server is busy right now. Please try again in a minute.' });
  if (rateLimited(ip, 'job', CONFIG.jobsPerHour)) return send(res, 429, { error: 'You have reached the hourly download limit. Please try again later.' });
  const job = {
    id: randomUUID(),
    url: target,
    type,
    quality: q,
    title: typeof title === 'string' ? title.slice(0, 200) : 'download', // only used for the file name
    status: 'queued',
    progress: 0,
    lastPct: 0,
    createdAt: Date.now(),
  };
  jobs.set(job.id, job);
  startJob(job).catch((err) => {
    job.status = 'error';
    job.error = friendlyError(String(err));
  });
  send(res, 202, publicJob(job));
}

function handleFile(req, res, job) {
  if (!job || job.status !== 'done') return send(res, 404, { error: 'This download has expired. Please start again.' });
  const name = job.filename;
  const ascii = name.replace(/[^\x20-\x7e]/g, '_').replace(/"/g, "'");
  res.writeHead(200, {
    'Content-Type': job.type === 'mp3' ? 'audio/mpeg' : 'video/mp4',
    'Content-Length': job.size,
    'Content-Disposition': `attachment; filename="${ascii}"; filename*=UTF-8''${encodeURIComponent(name)}`,
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
  });
  createReadStream(job.path).pipe(res);
}

const server = createServer(async (req, res) => {
  const origin = req.headers.origin;
  const cors = origin && (CONFIG.allowedOrigins.includes('*') || CONFIG.allowedOrigins.includes(origin))
    ? { 'Access-Control-Allow-Origin': origin, Vary: 'Origin' }
    : {};
  for (const [k, v] of Object.entries(cors)) res.setHeader(k, v);
  if (req.method === 'OPTIONS') {
    res.writeHead(204, { ...cors, 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '86400' });
    return res.end();
  }

  const ip = clientIp(req);
  const { pathname } = new URL(req.url, 'http://localhost');
  try {
    if (req.method === 'GET' && pathname === '/health') return send(res, 200, { ok: true, running, jobs: jobs.size });
    if (req.method === 'POST' && pathname === '/api/info') return await handleInfo(req, res, ip);
    if (req.method === 'POST' && pathname === '/api/jobs') return await handleCreateJob(req, res, ip);
    const m = /^\/api\/jobs\/([0-9a-f-]{36})(\/file)?$/.exec(pathname);
    if (m && req.method === 'GET') {
      const job = jobs.get(m[1]);
      if (m[2]) return handleFile(req, res, job);
      if (!job) return send(res, 404, { error: 'This download has expired. Please start again.' });
      return send(res, 200, publicJob(job));
    }
    send(res, 404, { error: 'Not found' });
  } catch (err) {
    send(res, err.status || 500, { error: err.status ? err.message : 'Server error. Please try again.' });
    if (!err.status) log('error', err);
  }
});

await rm(CONFIG.workDir, { recursive: true, force: true });
await mkdir(CONFIG.workDir, { recursive: true });
server.listen(CONFIG.port, () => log(`downloader listening on :${CONFIG.port}`));
