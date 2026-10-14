'use client';

import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';
import { formatBytes, formatTime } from '@/lib/audio-engine';
import { DOWNLOADER_URL } from '@/lib/site';

const QUALITIES = {
  mp3: [
    { value: 64, label: '64 kbps (smallest)' },
    { value: 96, label: '96 kbps' },
    { value: 128, label: '128 kbps' },
    { value: 160, label: '160 kbps' },
    { value: 192, label: '192 kbps (recommended)' },
    { value: 256, label: '256 kbps' },
    { value: 320, label: '320 kbps (best)' },
  ],
  mp4: [
    { value: 240, label: '240p (smallest)' },
    { value: 360, label: '360p' },
    { value: 480, label: '480p' },
    { value: 720, label: '720p HD' },
    { value: 1080, label: '1080p Full HD' },
  ],
};
const DEFAULT_QUALITY = { mp3: 192, mp4: 720 };

const YOUTUBE_HOSTS = ['youtube.com', 'youtu.be', 'youtube-nocookie.com'];
const TIKTOK_HOSTS = ['tiktok.com'];

function hostOf(link) {
  try {
    return new URL(link).hostname.toLowerCase();
  } catch {
    return '';
  }
}
const matches = (host, list) => list.some((d) => host === d || host.endsWith(`.${d}`));

/** Parses "1:23", "01:02:03" or "83" into seconds. Empty input returns null. */
function parseTime(value) {
  const v = String(value || '').trim();
  if (!v) return null;
  if (!/^\d{1,3}(:\d{1,2}){0,2}$/.test(v)) return NaN;
  return v.split(':').reduce((sum, part) => sum * 60 + Number(part), 0);
}

/** Checks a link against the page's rules. Returns null or { message, href, label }. */
function siteProblem(link, sites) {
  const host = hostOf(link);
  if (sites === 'youtube' && !matches(host, YOUTUBE_HOSTS)) {
    return { message: 'This tool works with YouTube links only. For other websites, use our Online Video Downloader.', href: '/online-video-downloader', label: 'Open Online Video Downloader' };
  }
  if (sites === 'other' && matches(host, YOUTUBE_HOSTS)) {
    return { message: 'For YouTube links, please use our dedicated YouTube tools.', href: '/youtube-to-mp3', label: 'Open YouTube to MP3' };
  }
  if (sites === 'other' && matches(host, TIKTOK_HOSTS)) {
    return { message: 'TikTok support is coming soon. Please check back shortly.', href: '/tiktok-to-mp3', label: 'About TikTok to MP3' };
  }
  return null;
}

async function api(path, options) {
  let res;
  try {
    res = await fetch(`${DOWNLOADER_URL}${path}`, {
      ...options,
      headers: options && options.body ? { 'Content-Type': 'application/json' } : undefined,
    });
  } catch {
    // Tell the site owner (browser console) why the request failed.
    try {
      await fetch(`${DOWNLOADER_URL}/health`, { mode: 'no-cors', cache: 'no-store' });
      console.error(
        `[MP3 Converter] The download server at ${DOWNLOADER_URL} is running but refused this website. ` +
          `Add "${window.location.origin}" to ALLOWED_ORIGINS on the download server.`,
      );
      throw new Error('Link downloads are not available on this website address yet. Please try again later.');
    } catch (err) {
      if (err.message.startsWith('Link downloads')) throw err;
      console.error(`[MP3 Converter] The download server at ${DOWNLOADER_URL} is not responding. Is it running?`);
    }
    throw new Error('Could not reach the download server. It may be starting up, so please wait a minute and try again.');
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
  return data;
}

const RADIUS = 66;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/** Circular progress: spins while waiting, fills up with the percentage in the middle. */
function ProgressRing({ percent, spinning, label }) {
  const pct = Math.max(0, Math.min(100, Math.round(percent)));
  return (
    <div className={`ring${spinning ? ' is-spinning' : ''}`} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label={label}>
      <svg viewBox="0 0 160 160" aria-hidden="true">
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#3b82f6" />
            <stop offset="1" stopColor="#a855f7" />
          </linearGradient>
        </defs>
        <circle className="ring__track" cx="80" cy="80" r={RADIUS} />
        <circle
          className="ring__bar"
          cx="80"
          cy="80"
          r={RADIUS}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - pct / 100)}
        />
        <circle className="ring__spin" cx="80" cy="80" r={RADIUS} strokeDasharray={`${CIRCUMFERENCE * 0.18} ${CIRCUMFERENCE}`} />
      </svg>
      <div className="ring__center">
        <span className="ring__pct">{pct}<small>%</small></span>
        <span className="ring__label">{label}</span>
      </div>
    </div>
  );
}

export default function LinkDownloader({
  formats = ['mp3', 'mp4'],
  sites = 'any', // 'any' | 'youtube' | 'other'
  advanced = false, // MP3 extras: mono and trim
  defaultType,
  placeholder = 'Paste a video or audio link…',
}) {
  const initialType = defaultType && formats.includes(defaultType) ? defaultType : formats[0];
  const [url, setUrl] = useState('');
  const [type, setType] = useState(initialType);
  const [quality, setQuality] = useState(DEFAULT_QUALITY[initialType]);
  const [mono, setMono] = useState(false);
  const [trimOn, setTrimOn] = useState(false);
  const [trimStart, setTrimStart] = useState('');
  const [trimEnd, setTrimEnd] = useState('');
  const [job, setJob] = useState(null);
  const [error, setError] = useState('');
  const [hint, setHint] = useState(null);
  const pollRef = useRef(null);
  const runRef = useRef(0);

  useEffect(() => () => clearTimeout(pollRef.current), []);

  const busy = Boolean(job && !['done', 'error'].includes(job.status));
  const done = Boolean(job && job.status === 'done');

  const pickType = (t) => {
    setType(t);
    setQuality(DEFAULT_QUALITY[t]);
  };

  const paste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setUrl(text.trim());
    } catch {
      setError('Your browser blocked clipboard access. Please paste with Ctrl+V or a long press.');
    }
  };

  const poll = (id, run) => {
    pollRef.current = setTimeout(async () => {
      if (run !== runRef.current) return;
      try {
        const data = await api(`/api/jobs/${id}`);
        if (run !== runRef.current) return;
        setJob(data);
        if (data.status === 'error') {
          setError(data.error);
          setJob(null);
        } else if (data.status !== 'done') poll(id, run);
      } catch (err) {
        if (run !== runRef.current) return;
        setError(err.message);
        setJob(null);
      }
    }, 1000);
  };

  const convert = async (e) => {
    e && e.preventDefault();
    const link = url.trim();
    if (!link || busy) return;
    setError('');
    setHint(null);
    if (!/^https?:\/\//i.test(link)) {
      setError('Please paste a full link that starts with http:// or https://');
      return;
    }
    const problem = siteProblem(link, sites);
    if (problem) {
      setError(problem.message);
      setHint(problem);
      return;
    }
    const extras = {};
    if (advanced && type === 'mp3') {
      if (mono) extras.mono = true;
      if (trimOn) {
        const a = parseTime(trimStart) ?? 0;
        const b = parseTime(trimEnd);
        if (Number.isNaN(a) || b == null || Number.isNaN(b) || b <= a) {
          setError('Please enter a start and end time like 1:20 and 2:45 (the end must be after the start).');
          return;
        }
        extras.start = a;
        extras.end = b;
      }
    }
    if (!DOWNLOADER_URL) {
      // The download server (downloader/) is not connected: NEXT_PUBLIC_DOWNLOADER_URL is not set.
      setError('Link downloads are temporarily unavailable. Please try again later, or download the file and use Upload.');
      return;
    }
    clearTimeout(pollRef.current);
    const run = ++runRef.current;
    setJob({ status: 'queued', progress: 0 });
    try {
      const data = await api('/api/jobs', { method: 'POST', body: JSON.stringify({ url: link, type, quality, ...extras }) });
      if (run !== runRef.current) return;
      setJob(data);
      if (data.status !== 'done') poll(data.id, run);
    } catch (err) {
      if (run !== runRef.current) return;
      setError(err.message);
      setJob(null);
    }
  };

  const reset = () => {
    runRef.current++;
    clearTimeout(pollRef.current);
    setJob(null);
    setError('');
  };

  const startOver = () => {
    reset();
    setUrl('');
  };

  let ringLabel = 'Starting…';
  let spinning = true;
  if (job) {
    if (job.status === 'converting') ringLabel = type === 'mp3' ? 'Converting…' : 'Finishing…';
    else if (job.status === 'downloading' && job.progress > 0) {
      ringLabel = 'Downloading';
      spinning = false;
    } else if (job.title) ringLabel = 'Fetching…';
  }

  const meta = job && (job.title || job.thumbnail) ? job : null;

  return (
    <div className="link-box">
      {!busy && !done && (
        <form className="link-form-v2" onSubmit={convert}>
          <label className="sr-only" htmlFor="video-link">Video link</label>
          <div className="link-input">
            <Icon name="link" />
            <input
              id="video-link"
              type="url"
              inputMode="url"
              autoComplete="off"
              spellCheck={false}
              placeholder={placeholder}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
            {url ? (
              <button type="button" className="q-remove" onClick={() => setUrl('')} aria-label="Clear link">
                <Icon name="x" />
              </button>
            ) : (
              <button type="button" className="btn-link" onClick={paste}>Paste</button>
            )}
          </div>

          <div className="link-options">
            {formats.length > 1 && (
              <div className="seg-control" role="group" aria-label="Format">
                <button type="button" aria-pressed={type === 'mp3'} onClick={() => pickType('mp3')}>
                  <Icon name="music" className="icon icon-sm" /> MP3 audio
                </button>
                <button type="button" aria-pressed={type === 'mp4'} onClick={() => pickType('mp4')}>
                  <Icon name="video" className="icon icon-sm" /> MP4 video
                </button>
              </div>
            )}
            <span className="select-wrap">
              <Icon name="sliders" />
              <select value={quality} onChange={(e) => setQuality(Number(e.target.value))} aria-label="Quality">
                {QUALITIES[type].map((q) => (
                  <option key={q.value} value={q.value}>{q.label}</option>
                ))}
              </select>
            </span>
          </div>

          {advanced && type === 'mp3' && (
            <div className="link-advanced">
              <label className="opt">
                Mono:
                <span className="switch">
                  <input type="checkbox" role="switch" checked={mono} onChange={(e) => setMono(e.target.checked)} />
                  <span />
                </span>
              </label>
              <label className="opt">
                Cut a part:
                <span className="switch">
                  <input type="checkbox" role="switch" checked={trimOn} onChange={(e) => setTrimOn(e.target.checked)} />
                  <span />
                </span>
              </label>
              {trimOn && (
                <div className="link-trim">
                  <label className="time-field">
                    From
                    <input type="text" inputMode="numeric" placeholder="0:00" value={trimStart} onChange={(e) => setTrimStart(e.target.value)} aria-label="Start time" />
                  </label>
                  <label className="time-field">
                    To
                    <input type="text" inputMode="numeric" placeholder="2:30" value={trimEnd} onChange={(e) => setTrimEnd(e.target.value)} aria-label="End time" />
                  </label>
                </div>
              )}
            </div>
          )}

          <button type="submit" className="btn-grad link-convert" disabled={!url.trim()}>
            <Icon name="zap" /> Convert to {type.toUpperCase()}
          </button>
        </form>
      )}

      {error && (
        <p className="q-meta is-error link-error" role="alert">
          {error}
          {hint && hint.href && (
            <>
              {' '}
              <a href={hint.href}>{hint.label} →</a>
            </>
          )}
        </p>
      )}

      {(busy || done) && (
        <div className="link-stage" aria-live="polite">
          {meta && (
            <div className="media-mini">
              {meta.thumbnail ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={meta.thumbnail} alt="" referrerPolicy="no-referrer" />
              ) : (
                <span className="media-mini__ph" aria-hidden="true"><Icon name={type === 'mp3' ? 'music' : 'video'} /></span>
              )}
              <div style={{ minWidth: 0 }}>
                <div className="q-name" title={meta.title}>{meta.title || 'Your video'}</div>
                <div className="q-meta">
                  {[
                    meta.uploader,
                    meta.duration ? formatTime(meta.duration) : null,
                    `${type.toUpperCase()} · ${QUALITIES[type].find((q) => q.value === quality)?.label.replace(/ \(.*\)/, '') || ''}`,
                    advanced && type === 'mp3' && mono ? 'Mono' : null,
                    advanced && type === 'mp3' && trimOn && trimEnd ? `${trimStart || '0:00'}–${trimEnd}` : null,
                  ]
                    .filter(Boolean)
                    .join(' · ')}
                </div>
              </div>
            </div>
          )}

          {busy && (
            <>
              <ProgressRing percent={job.progress || 0} spinning={spinning} label={ringLabel} />
              <p className="ring-hint">Please keep this page open. Long videos can take a minute or two.</p>
              <button type="button" className="btn-link" onClick={reset}>Cancel</button>
            </>
          )}

          {done && (
            <>
              <a className="ring-download" href={`${DOWNLOADER_URL}/api/jobs/${job.id}/file`} download={job.filename}>
                <span className="ring-download__inner">
                  <Icon name="download" />
                  <span>Download</span>
                  <small>{type.toUpperCase()} · {formatBytes(job.size)}</small>
                </span>
              </a>
              <p className="ring-file" title={job.filename}>{job.filename}</p>
              <div className="ring-actions">
                <button type="button" className="btn-outline btn-sm" onClick={reset}>
                  <Icon name="sliders" className="icon icon-sm" /> Other format
                </button>
                <button type="button" className="btn-link" onClick={startOver}>Convert another link</button>
              </div>
            </>
          )}
        </div>
      )}

      <p className="link-legal">
        Only download videos you own or have permission to use. Files are deleted from our server after 30 minutes.{' '}
        <a href="/copyright">Copyright policy</a>
      </p>
    </div>
  );
}
