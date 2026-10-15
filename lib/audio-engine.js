// Client-side audio engine shared by every tool on the site.
// Decoding: the browser's Web Audio API first, FFmpeg (WebAssembly) as a fallback.
// Encoding: LAME (lamejs) in a Web Worker. Nothing is ever uploaded.

export const MAX_BYTES = 500 * 1024 * 1024;
export const TARGET_RATE = 44100;
export const ACCEPT =
  'audio/*,video/*,.mp3,.wav,.m4a,.aac,.flac,.ogg,.oga,.opus,.wma,.aiff,.aif,.amr,.awb,.3ga,.caf,.ac3,.eac3,.m4b,.alac,.mp4,.m4v,.mov,.webm,.mkv,.avi,.wmv,.flv,.3gp,.mpeg,.mpg,.ts,.vob';

let uid = 0;
const nextId = () => `j${++uid}`;

// ---------- helpers ----------
export function extOf(name) {
  const m = /\.([a-z0-9]{1,5})$/i.exec(name || '');
  return m ? m[1].toLowerCase() : '';
}

export function baseName(name) {
  return (name || 'audio').replace(/\.[^.]+$/, '') || 'audio';
}

export function formatBytes(n) {
  if (n == null) return '';
  if (n < 1024 * 1024) return `${Math.max(1, Math.round(n / 1024))} KB`;
  return `${(n / (1024 * 1024)).toFixed(n < 10 * 1024 * 1024 ? 1 : 0)} MB`;
}

export function formatTime(sec, withTenths = false) {
  if (!Number.isFinite(sec) || sec < 0) sec = 0;
  if (!withTenths) sec = Math.round(sec);
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  const ss = withTenths ? s.toFixed(1).padStart(4, '0') : String(Math.floor(s)).padStart(2, '0');
  return h ? `${h}:${String(m).padStart(2, '0')}:${ss}` : `${String(m).padStart(2, '0')}:${ss}`;
}

/** Rough MP3 size estimate in bytes. */
export function estimateMp3Bytes(seconds, kbps) {
  return Math.round((seconds * kbps * 1000) / 8);
}

// ---------- decoding ----------
function getAudioContext() {
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return null;
  try {
    return new Ctx({ sampleRate: TARGET_RATE });
  } catch {
    return new Ctx();
  }
}

/** Uses the Web Audio standard down-mix rules (5.1 to stereo includes centre and surrounds). */
async function downmixToStereo(audio) {
  const Offline = window.OfflineAudioContext || window.webkitOfflineAudioContext;
  if (!Offline) return audio;
  const ctx = new Offline(2, audio.length, audio.sampleRate);
  const src = ctx.createBufferSource();
  src.buffer = audio;
  src.connect(ctx.destination);
  src.start();
  return ctx.startRendering();
}

async function decodeWithBrowser(arrayBuffer) {
  const ctx = getAudioContext();
  if (!ctx) throw new Error('Web Audio is not available');
  try {
    let audio = await new Promise((resolve, reject) => {
      const p = ctx.decodeAudioData(arrayBuffer, resolve, reject);
      if (p && p.then) p.then(resolve, reject);
    });
    if (!audio || !audio.length) throw new Error('Empty audio');
    // Surround sound (e.g. 5.1): mix all speakers down to stereo instead of keeping only the
    // front left/right channels, which would drop the centre channel where dialogue usually is.
    if (audio.numberOfChannels > 2) audio = await downmixToStereo(audio);
    // Copy out of the AudioBuffer so the arrays can be transferred to workers safely.
    const count = Math.min(audio.numberOfChannels, 2);
    const channels = [];
    for (let c = 0; c < count; c++) {
      const arr = new Float32Array(audio.length);
      arr.set(audio.getChannelData(c));
      channels.push(arr);
    }
    return { channels, sampleRate: audio.sampleRate };
  } finally {
    if (ctx.close) ctx.close().catch(() => {});
  }
}

function parseWav(bytes) {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const tag = (o) => String.fromCharCode(bytes[o], bytes[o + 1], bytes[o + 2], bytes[o + 3]);
  if (tag(0) !== 'RIFF' || tag(8) !== 'WAVE') throw new Error('Bad WAV');
  let offset = 12;
  let fmt = null;
  while (offset + 8 <= bytes.length) {
    const id = tag(offset);
    let size = view.getUint32(offset + 4, true);
    const body = offset + 8;
    if (id === 'fmt ') {
      fmt = {
        channels: view.getUint16(body + 2, true),
        sampleRate: view.getUint32(body + 4, true),
        bits: view.getUint16(body + 14, true),
      };
    } else if (id === 'data') {
      if (!fmt || fmt.bits !== 16) throw new Error('Unsupported WAV');
      if (size === 0 || size === 0xffffffff || body + size > bytes.length) size = bytes.length - body;
      const frames = Math.floor(size / (2 * fmt.channels));
      const channels = Array.from({ length: Math.min(fmt.channels, 2) }, () => new Float32Array(frames));
      for (let i = 0; i < frames; i++) {
        for (let c = 0; c < channels.length; c++) {
          channels[c][i] = view.getInt16(body + (i * fmt.channels + c) * 2, true) / 32768;
        }
      }
      return { channels, sampleRate: fmt.sampleRate };
    }
    offset = body + size + (size & 1);
  }
  throw new Error('No audio data');
}

let ffWorker = null;
function getFfmpegWorker() {
  if (!ffWorker) ffWorker = new Worker('/ffmpeg-worker.js');
  return ffWorker;
}

function decodeWithFfmpeg(file, onStage) {
  return new Promise((resolve, reject) => {
    const id = nextId();
    const worker = getFfmpegWorker();
    const onMessage = (e) => {
      const msg = e.data;
      if (msg.id !== id) return;
      if (msg.type === 'loaded') onStage && onStage('ffmpeg-decoding', 0);
      else if (msg.type === 'progress') onStage && onStage('ffmpeg-decoding', msg.progress);
      else {
        worker.removeEventListener('message', onMessage);
        worker.removeEventListener('error', onError);
        if (msg.type === 'done') {
          try {
            resolve(parseWav(msg.data));
          } catch (err) {
            reject(err);
          }
        } else reject(new Error(msg.message));
      }
    };
    const onError = () => {
      worker.removeEventListener('message', onMessage);
      worker.terminate();
      ffWorker = null;
      reject(new Error('The fallback decoder could not start'));
    };
    worker.addEventListener('message', onMessage);
    worker.addEventListener('error', onError);
    worker.postMessage({ id, file, ext: extOf(file.name) });
  });
}

// Serialise heavy work so several files never compete for memory at once.
let lock = Promise.resolve();
function exclusive(task) {
  const run = lock.then(task, task);
  lock = run.catch(() => {});
  return run;
}

/**
 * Decode any audio or video file to PCM.
 * onStage(stage, progress) — stage: 'reading' | 'decoding' | 'ffmpeg-loading' | 'ffmpeg-decoding'
 * Resolves to { channels: Float32Array[], sampleRate, duration }.
 */
export function decodeFile(file, onStage) {
  return exclusive(async () => {
    if (file.size > MAX_BYTES) throw new Error('This file is larger than 500 MB. Please split it first.');
    onStage && onStage('decoding', 0);
    let result;
    try {
      result = await decodeWithBrowser(await file.arrayBuffer());
    } catch {
      onStage && onStage('ffmpeg-loading', 0);
      try {
        result = await decodeWithFfmpeg(file, onStage);
      } catch (err) {
        throw new Error(
          err && /audio track/i.test(err.message)
            ? 'We could not find any sound in this file. It may be a silent video or a damaged file.'
            : 'This file could not be read. It may be damaged, protected (DRM) or use a very rare codec.',
        );
      }
    }
    if (result.sampleRate !== TARGET_RATE) {
      result = { channels: result.channels.map((c) => resample(c, result.sampleRate, TARGET_RATE)), sampleRate: TARGET_RATE };
    }
    return { ...result, duration: result.channels[0].length / result.sampleRate };
  });
}

// ---------- processing ----------
export function resample(data, from, to) {
  if (from === to) return data;
  const ratio = from / to;
  const out = new Float32Array(Math.floor(data.length / ratio));
  for (let i = 0; i < out.length; i++) {
    const pos = i * ratio;
    const i0 = Math.floor(pos);
    const i1 = Math.min(i0 + 1, data.length - 1);
    const t = pos - i0;
    out[i] = data[i0] * (1 - t) + data[i1] * t;
  }
  return out;
}

export function toMono(channels) {
  if (channels.length === 1) return [channels[0]];
  const [l, r] = channels;
  const mix = new Float32Array(l.length);
  for (let i = 0; i < l.length; i++) mix[i] = (l[i] + r[i]) * 0.5;
  return [mix];
}

export function toStereo(channels) {
  return channels.length === 2 ? channels : [channels[0], channels[0].slice()];
}

/** Copy a time range (seconds) out of decoded audio. */
export function sliceSeconds(decoded, start, end) {
  const a = Math.max(0, Math.floor(start * decoded.sampleRate));
  const b = Math.min(decoded.channels[0].length, Math.ceil(end * decoded.sampleRate));
  return decoded.channels.map((c) => c.slice(a, Math.max(a, b)));
}

export function applyFades(channels, sampleRate, fadeIn, fadeOut) {
  const len = channels[0].length;
  const fi = Math.min(len, Math.floor(fadeIn * sampleRate));
  const fo = Math.min(len, Math.floor(fadeOut * sampleRate));
  for (const c of channels) {
    for (let i = 0; i < fi; i++) c[i] *= i / fi;
    for (let i = 0; i < fo; i++) c[len - 1 - i] *= i / fo;
  }
  return channels;
}

/** Join several decoded clips (all at TARGET_RATE) with an optional gap in seconds. */
export function concatClips(clips, gapSeconds = 0) {
  const stereo = clips.some((c) => c.channels.length > 1);
  const gap = Math.floor(gapSeconds * TARGET_RATE);
  const total = clips.reduce((n, c) => n + c.channels[0].length, 0) + gap * Math.max(0, clips.length - 1);
  const out = Array.from({ length: stereo ? 2 : 1 }, () => new Float32Array(total));
  let pos = 0;
  clips.forEach((clip, idx) => {
    const src = stereo ? toStereo(clip.channels) : clip.channels;
    out.forEach((dst, c) => dst.set(src[c], pos));
    pos += clip.channels[0].length + (idx < clips.length - 1 ? gap : 0);
  });
  return out;
}

/** Peaks for drawing a waveform: returns `buckets` values between 0 and 1. */
export function waveformPeaks(channels, buckets = 600) {
  const data = channels[0];
  const step = Math.max(1, Math.floor(data.length / buckets));
  const peaks = new Float32Array(buckets);
  let max = 0;
  for (let b = 0; b < buckets; b++) {
    let peak = 0;
    const start = b * step;
    const end = Math.min(data.length, start + step);
    for (let i = start; i < end; i += 16) {
      const v = Math.abs(data[i]);
      if (v > peak) peak = v;
    }
    peaks[b] = peak;
    if (peak > max) max = peak;
  }
  if (max > 0) for (let b = 0; b < buckets; b++) peaks[b] /= max;
  return peaks;
}

/** Encode PCM to a WAV blob (used for instant previews). */
export function encodeWav(channels, sampleRate) {
  const n = channels[0].length;
  const ch = channels.length;
  const buf = new ArrayBuffer(44 + n * ch * 2);
  const v = new DataView(buf);
  const w = (o, s) => [...s].forEach((c, i) => v.setUint8(o + i, c.charCodeAt(0)));
  w(0, 'RIFF'); v.setUint32(4, 36 + n * ch * 2, true); w(8, 'WAVE'); w(12, 'fmt ');
  v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, ch, true);
  v.setUint32(24, sampleRate, true); v.setUint32(28, sampleRate * ch * 2, true);
  v.setUint16(32, ch * 2, true); v.setUint16(34, 16, true); w(36, 'data'); v.setUint32(40, n * ch * 2, true);
  let o = 44;
  for (let i = 0; i < n; i++) {
    for (let c = 0; c < ch; c++) {
      const s = Math.max(-1, Math.min(1, channels[c][i]));
      v.setInt16(o, s < 0 ? s * 0x8000 : s * 0x7fff, true);
      o += 2;
    }
  }
  return new Blob([buf], { type: 'audio/wav' });
}

// ---------- MP3 encoding ----------
let mp3Worker = null;
function getMp3Worker() {
  if (!mp3Worker) mp3Worker = new Worker('/mp3-worker.js');
  return mp3Worker;
}

/**
 * Encode PCM to MP3. The channel arrays are transferred to the worker (they become unusable
 * afterwards), so pass copies if you still need the audio.
 */
export function encodeMp3(channels, sampleRate, kbps, onProgress) {
  return exclusive(
    () =>
      new Promise((resolve, reject) => {
        const id = nextId();
        const worker = getMp3Worker();
        const onMessage = (e) => {
          const msg = e.data;
          if (msg.id !== id) return;
          if (msg.type === 'progress') onProgress && onProgress(msg.progress);
          else {
            worker.removeEventListener('message', onMessage);
            worker.removeEventListener('error', onError);
            msg.type === 'done' ? resolve(msg.blob) : reject(new Error(msg.message));
          }
        };
        const onError = () => {
          worker.removeEventListener('message', onMessage);
          worker.terminate();
          mp3Worker = null;
          reject(new Error('The MP3 encoder could not start'));
        };
        worker.addEventListener('message', onMessage);
        worker.addEventListener('error', onError);
        const buffers = [...new Set(channels.map((c) => c.buffer))];
        worker.postMessage({ id, channels, sampleRate, bitrate: kbps }, buffers);
      }),
  );
}

// ---------------------------------------------------------------- reverse conversions (MP3 -> other formats)

/**
 * Converts a file with FFmpeg (WebAssembly) in the browser. `args` uses "IN" as a placeholder for the input
 * file; `outName` decides the output format by its extension. Resolves to a Uint8Array.
 * onProgress(stage, p): stage 'loading' (first use downloads the converter) or 'converting' with p from 0 to 1.
 */
export function convertWithFfmpeg(file, args, outName, onProgress) {
  return exclusive(
    () =>
      new Promise((resolve, reject) => {
        const id = nextId();
        const worker = getFfmpegWorker();
        onProgress && onProgress('loading', 0);
        const onMessage = (e) => {
          const msg = e.data;
          if (msg.id !== id) return;
          if (msg.type === 'loaded') onProgress && onProgress('converting', 0);
          else if (msg.type === 'progress') onProgress && onProgress('converting', msg.progress);
          else {
            worker.removeEventListener('message', onMessage);
            worker.removeEventListener('error', onError);
            msg.type === 'done' ? resolve(msg.data) : reject(new Error(msg.message));
          }
        };
        const onError = () => {
          worker.removeEventListener('message', onMessage);
          worker.terminate();
          ffWorker = null;
          reject(new Error('The converter could not start'));
        };
        worker.addEventListener('message', onMessage);
        worker.addEventListener('error', onError);
        worker.postMessage({ id, type: 'convert', file, ext: extOf(file.name) || 'mp3', args, out: outName });
      }),
  );
}

/** Reads a file's duration in seconds using the browser's media element (null if unknown). */
export function mediaDuration(file) {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const el = document.createElement('audio');
    const done = (v) => {
      clearTimeout(timer);
      URL.revokeObjectURL(url);
      resolve(Number.isFinite(v) && v > 0 ? v : null);
    };
    const timer = setTimeout(() => done(null), 8000);
    el.preload = 'metadata';
    el.onloadedmetadata = () => done(el.duration);
    el.onerror = () => done(null);
    el.src = url;
  });
}

let amrWorker = null;

/** Encodes any audio file to AMR-NB (8 kHz mono). mode 0-7 = 4.75 to 12.2 kbps. Resolves to a Uint8Array. */
export async function encodeAmr(file, mode, onStage) {
  const decoded = await decodeFile(file, onStage);
  const mono = toMono(decoded.channels)[0];
  onStage && onStage('encoding', 0);
  // Resample to 8 kHz with the browser's filtered resampler (cleaner than simple decimation).
  const Offline = window.OfflineAudioContext || window.webkitOfflineAudioContext;
  const off = new Offline(1, Math.max(1, Math.ceil((mono.length * 8000) / decoded.sampleRate)), 8000);
  const buffer = off.createBuffer(1, mono.length, decoded.sampleRate);
  buffer.copyToChannel(mono, 0);
  const src = off.createBufferSource();
  src.buffer = buffer;
  src.connect(off.destination);
  src.start();
  const samples = (await off.startRendering()).getChannelData(0).slice();
  return new Promise((resolve, reject) => {
    if (!amrWorker) amrWorker = new Worker('/vendor/amrnb-worker.js');
    const id = nextId();
    const onMessage = (e) => {
      if (e.data.id !== id) return;
      amrWorker.removeEventListener('message', onMessage);
      e.data.error ? reject(new Error(e.data.error)) : resolve(e.data.amr);
    };
    amrWorker.addEventListener('message', onMessage);
    amrWorker.postMessage({ id, samples, mode }, [samples.buffer]);
  });
}
