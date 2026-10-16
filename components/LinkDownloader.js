'use client';

import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';
import { useI18n } from './I18nProvider';
import Rich from './Rich';
import { formatBytes, formatTime } from '@/lib/audio-engine';
import { DOWNLOADER_URL } from '@/lib/site';

// Plain labels; some get a translated description from the dictionary (link.mp3Qualities etc.).
const QUALITIES = {
  mp3: [64, 96, 128, 160, 192, 256, 320].map((value) => ({ value, label: `${value} kbps` })),
  mp4: [240, 360, 480, 720, 1080].map((value) => ({ value, label: `${value}p` })),
  wav: [44100, 48000].map((value) => ({ value, label: `${value / 1000} kHz` })),
};
const DEFAULT_QUALITY = { mp3: 192, mp4: 720, wav: 44100 };
const hasAudioExtras = (t) => t === 'mp3' || t === 'wav';

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

/** Checks a link against the page's rules. Returns null or { message, href, label } as dictionary keys. */
function siteProblem(link, sites) {
  const host = hostOf(link);
  if (sites === 'youtube' && !matches(host, YOUTUBE_HOSTS)) {
    return { message: 'link.youtubeOnly', href: '/online-video-downloader', label: 'link.youtubeOnlyCta' };
  }
  if (sites === 'other' && matches(host, YOUTUBE_HOSTS)) {
    return { message: 'link.useYoutubeTools', href: '/youtube-to-mp3', label: 'link.useYoutubeToolsCta' };
  }
  if (sites === 'other' && matches(host, TIKTOK_HOSTS)) {
    return { message: 'link.tiktokSoon', href: '/tiktok-to-mp3', label: 'link.tiktokSoonCta' };
  }
  return null;
}

/** Calls the download server. Errors carry a translated message (`t` is from useI18n). */
async function api(path, options, t) {
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
      throw Object.assign(new Error(t('link.notAllowed')), { local: true });
    } catch (err) {
      if (err.local) throw err;
      console.error(`[MP3 Converter] The download server at ${DOWNLOADER_URL} is not responding. Is it running?`);
    }
    throw new Error(t('link.unreachable'));
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || t('link.generic'));
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
  placeholder,
}) {
  const { t, err: tErr, path: lp, lang, dict } = useI18n();
  const qualityLabel = (kind, q) => {
    const extra = dict.link && dict.link[`${kind}Qualities`] && dict.link[`${kind}Qualities`][q.value];
    return extra || q.label;
  };
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
      setError(t('link.clipboard'));
    }
  };

  const poll = (id, run) => {
    pollRef.current = setTimeout(async () => {
      if (run !== runRef.current) return;
      try {
        const data = await api(`/api/jobs/${id}`, undefined, t);
        if (run !== runRef.current) return;
        setJob(data);
        if (data.status === 'error') {
          setError(tErr(data.error));
          setJob(null);
        } else if (data.status !== 'done') poll(id, run);
      } catch (err) {
        if (run !== runRef.current) return;
        setError(tErr(err.message));
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
      setError(t('link.fullLink'));
      return;
    }
    const problem = siteProblem(link, sites);
    if (problem) {
      setError(t(problem.message));
      setHint({ href: problem.href, label: t(problem.label) });
      return;
    }
    const extras = {};
    if (advanced && hasAudioExtras(type)) {
      if (mono) extras.mono = true;
      if (trimOn) {
        const a = parseTime(trimStart) ?? 0;
        const b = parseTime(trimEnd);
        if (Number.isNaN(a) || b == null || Number.isNaN(b) || b <= a) {
          setError(t('link.badTimes'));
          return;
        }
        extras.start = a;
        extras.end = b;
      }
    }
    if (!DOWNLOADER_URL) {
      // The download server (downloader/) is not connected: NEXT_PUBLIC_DOWNLOADER_URL is not set.
      setError(t('link.unavailable'));
      return;
    }
    clearTimeout(pollRef.current);
    const run = ++runRef.current;
    setJob({ status: 'queued', progress: 0 });
    try {
      const data = await api('/api/jobs', { method: 'POST', body: JSON.stringify({ url: link, type, quality, ...extras }) }, t);
      if (run !== runRef.current) return;
      setJob(data);
      if (data.status !== 'done') poll(data.id, run);
    } catch (err) {
      if (run !== runRef.current) return;
      setError(tErr(err.message));
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

  let ringLabel = t('link.starting');
  let spinning = true;
  if (job) {
    if (job.status === 'converting') ringLabel = type === 'mp3' ? t('link.convertingRing') : t('link.finishing');
    else if (job.status === 'downloading' && job.progress > 0) {
      ringLabel = t('link.downloading');
      spinning = false;
    } else if (job.title) ringLabel = t('link.fetching');
  }

  const meta = job && (job.title || job.thumbnail) ? job : null;

  return (
    <div className="link-box">
      {!busy && !done && (
        <form className="link-form-v2" onSubmit={convert}>
          <label className="sr-only" htmlFor="video-link">{t('link.linkLabel')}</label>
          <div className="link-input">
            <Icon name="link" />
            <input
              id="video-link"
              type="url"
              inputMode="url"
              autoComplete="off"
              spellCheck={false}
              placeholder={placeholder || t('link.placeholder')}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
            {url ? (
              <button type="button" className="q-remove" onClick={() => setUrl('')} aria-label={t('link.clear')}>
                <Icon name="x" />
              </button>
            ) : (
              <button type="button" className="btn-link" onClick={paste}>{t('link.paste')}</button>
            )}
          </div>

          <div className="link-options">
            {formats.length > 1 && (
              <div className="seg-control" role="group" aria-label={t('link.format')}>
                <button type="button" aria-pressed={type === 'mp3'} onClick={() => pickType('mp3')}>
                  <Icon name="music" className="icon icon-sm" /> {t('link.mp3Audio')}
                </button>
                <button type="button" aria-pressed={type === 'mp4'} onClick={() => pickType('mp4')}>
                  <Icon name="video" className="icon icon-sm" /> {t('link.mp4Video')}
                </button>
              </div>
            )}
            <span className="select-wrap">
              <Icon name="sliders" />
              <select value={quality} onChange={(e) => setQuality(Number(e.target.value))} aria-label={t('link.quality')}>
                {QUALITIES[type].map((q) => (
                  <option key={q.value} value={q.value}>{qualityLabel(type, q)}</option>
                ))}
              </select>
            </span>
          </div>

          {advanced && hasAudioExtras(type) && (
            <div className="link-advanced">
              <label className="opt">
                {t('link.mono')}
                <span className="switch">
                  <input type="checkbox" role="switch" checked={mono} onChange={(e) => setMono(e.target.checked)} />
                  <span />
                </span>
              </label>
              <label className="opt">
                {t('link.cut')}
                <span className="switch">
                  <input type="checkbox" role="switch" checked={trimOn} onChange={(e) => setTrimOn(e.target.checked)} />
                  <span />
                </span>
              </label>
              {trimOn && (
                <div className="link-trim">
                  <label className="time-field">
                    {t('link.from')}
                    <input type="text" inputMode="numeric" placeholder="0:00" value={trimStart} onChange={(e) => setTrimStart(e.target.value)} aria-label={t('link.startTime')} />
                  </label>
                  <label className="time-field">
                    {t('link.to')}
                    <input type="text" inputMode="numeric" placeholder="2:30" value={trimEnd} onChange={(e) => setTrimEnd(e.target.value)} aria-label={t('link.endTime')} />
                  </label>
                </div>
              )}
            </div>
          )}

          <button type="submit" className="btn-grad link-convert" disabled={!url.trim()}>
            <Icon name="zap" /> {t('link.convertTo', { format: type.toUpperCase() })}
          </button>
        </form>
      )}

      {error && (
        <p className="q-meta is-error link-error" role="alert">
          {error}
          {hint && hint.href && (
            <>
              {' '}
              <a href={lp(hint.href)}>{hint.label} →</a>
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
                <div className="q-name" title={meta.title}>{meta.title || t('link.yourVideo')}</div>
                <div className="q-meta">
                  {[
                    meta.uploader,
                    meta.duration ? formatTime(meta.duration) : null,
                    `${type.toUpperCase()} · ${QUALITIES[type].find((q) => q.value === quality)?.label || ''}`,
                    advanced && hasAudioExtras(type) && mono ? t('link.mono').replace(/[:：]\s*$/, '') : null,
                    advanced && hasAudioExtras(type) && trimOn && trimEnd ? `${trimStart || '0:00'}–${trimEnd}` : null,
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
              <p className="ring-hint">{t('link.keepOpen')}</p>
              <button type="button" className="btn-link" onClick={reset}>{t('link.cancel')}</button>
            </>
          )}

          {done && (
            <>
              <a className="ring-download" href={`${DOWNLOADER_URL}/api/jobs/${job.id}/file`} download={job.filename}>
                <span className="ring-download__inner">
                  <Icon name="download" />
                  <span>{t('link.download')}</span>
                  <small>{type.toUpperCase()} · {formatBytes(job.size)}</small>
                </span>
              </a>
              <p className="ring-file" title={job.filename}>{job.filename}</p>
              <div className="ring-actions">
                <button type="button" className="btn-outline btn-sm" onClick={reset}>
                  <Icon name="sliders" className="icon icon-sm" /> {t('link.otherFormat')}
                </button>
                <button type="button" className="btn-link" onClick={startOver}>{t('link.another')}</button>
              </div>
            </>
          )}
        </div>
      )}

      <p className="link-legal">
        <Rich text={t('link.legal')} lang={lang} />
      </p>
    </div>
  );
}
