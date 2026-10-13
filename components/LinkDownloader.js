'use client';

import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';
import { ProgressBar } from './tool-ui';
import { formatBytes, formatTime } from '@/lib/audio-engine';
import { DOWNLOADER_URL } from '@/lib/site';

const MP3_LABELS = { 128: '128 kbps', 192: '192 kbps', 256: '256 kbps', 320: '320 kbps (best)' };
const MP4_LABELS = { 360: '360p', 480: '480p', 720: '720p HD', 1080: '1080p Full HD' };

async function api(path, options) {
  let res;
  try {
    res = await fetch(`${DOWNLOADER_URL}${path}`, {
      ...options,
      headers: options && options.body ? { 'Content-Type': 'application/json' } : undefined,
    });
  } catch {
    throw new Error('Could not reach the download server. Please check your connection and try again.');
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
  return data;
}

export default function LinkDownloader({ defaultType = 'mp3', placeholder = 'Paste a video link, e.g. https://www.youtube.com/watch?v=…' }) {
  const [url, setUrl] = useState('');
  const [info, setInfo] = useState(null);
  const [type, setType] = useState(defaultType);
  const [quality, setQuality] = useState(defaultType === 'mp3' ? 192 : 720);
  const [loading, setLoading] = useState(false);
  const [job, setJob] = useState(null);
  const [error, setError] = useState('');
  const pollRef = useRef(null);

  useEffect(() => () => clearTimeout(pollRef.current), []);

  const options = info ? info.options[type] || [] : [];

  const pickType = (t, inf = info) => {
    setType(t);
    const list = inf ? inf.options[t] || [] : [];
    const preferred = t === 'mp3' ? 192 : 720;
    setQuality(list.includes(preferred) ? preferred : list[list.length - 1]);
  };

  const fetchInfo = async (e) => {
    e && e.preventDefault();
    const link = url.trim();
    if (!link) return;
    if (!DOWNLOADER_URL) {
      // The download server (downloader/) is not connected: NEXT_PUBLIC_DOWNLOADER_URL is not set.
      setError('Link downloads are temporarily unavailable. Please try again later, or download the file and use Upload.');
      return;
    }
    clearTimeout(pollRef.current);
    setError('');
    setInfo(null);
    setJob(null);
    setLoading(true);
    try {
      const data = await api('/api/info', { method: 'POST', body: JSON.stringify({ url: link }) });
      setInfo(data);
      const t = data.options[type] && data.options[type].length ? type : data.options.mp3.length ? 'mp3' : 'mp4';
      pickType(t, data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const paste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setUrl(text.trim());
    } catch {
      setError('Your browser blocked clipboard access. Please paste with Ctrl+V or a long press.');
    }
  };

  const poll = (id) => {
    pollRef.current = setTimeout(async () => {
      try {
        const data = await api(`/api/jobs/${id}`);
        setJob(data);
        if (data.status === 'error') setError(data.error);
        else if (data.status !== 'done') poll(id);
      } catch (err) {
        setError(err.message);
        setJob(null);
      }
    }, 1000);
  };

  const start = async () => {
    setError('');
    setJob({ status: 'queued', progress: 0 });
    try {
      const data = await api('/api/jobs', {
        method: 'POST',
        body: JSON.stringify({ url: info.url || url.trim(), type, quality, title: info.title }),
      });
      setJob(data);
      poll(data.id);
    } catch (err) {
      setError(err.message);
      setJob(null);
    }
  };

  const reset = () => {
    clearTimeout(pollRef.current);
    setUrl('');
    setInfo(null);
    setJob(null);
    setError('');
  };

  const busy = job && !['done', 'error'].includes(job.status);
  const statusText = job
    ? job.status === 'converting'
      ? type === 'mp3' ? 'Converting to MP3…' : 'Preparing your MP4…'
      : job.status === 'queued' ? 'Starting…' : `Downloading… ${job.progress || 0}%`
    : '';

  return (
    <div className="link-box">
      <form className="link-form" onSubmit={fetchInfo}>
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
            disabled={loading || busy}
            required
          />
          {!url && (
            <button type="button" className="btn-link" onClick={paste}>
              Paste
            </button>
          )}
          {url && !loading && !busy && (
            <button type="button" className="q-remove" onClick={reset} aria-label="Clear link">
              <Icon name="x" />
            </button>
          )}
        </div>
        <button type="submit" className="btn-grad" disabled={loading || busy || !url.trim()}>
          {loading ? <span className="spinner" aria-hidden="true" /> : <Icon name="download" />}
          {loading ? 'Checking…' : 'Start'}
        </button>
      </form>

      {error && <p className="q-meta is-error link-error" role="alert">{error}</p>}

      {info && (
        <div className="media-card">
          {info.thumbnail ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="media-card__thumb" src={info.thumbnail} alt="" referrerPolicy="no-referrer" />
          ) : (
            <span className="media-card__thumb media-card__thumb--empty" aria-hidden="true"><Icon name="video" /></span>
          )}
          <div className="media-card__body">
            <div className="q-name" title={info.title}>{info.title}</div>
            <div className="q-meta">
              {[info.uploader, info.duration ? formatTime(info.duration) : null, info.site].filter(Boolean).join(' · ')}
            </div>

            <div className="media-card__choose">
              <div className="seg-control" role="group" aria-label="Format">
                <button type="button" aria-pressed={type === 'mp3'} onClick={() => pickType('mp3')} disabled={!info.options.mp3.length || busy}>
                  MP3 audio
                </button>
                <button type="button" aria-pressed={type === 'mp4'} onClick={() => pickType('mp4')} disabled={!info.options.mp4.length || busy}>
                  MP4 video
                </button>
              </div>
              <span className="select-wrap">
                <Icon name="sliders" />
                <select value={quality} onChange={(e) => setQuality(Number(e.target.value))} disabled={busy} aria-label="Quality">
                  {options.map((q) => (
                    <option key={q} value={q}>{(type === 'mp3' ? MP3_LABELS : MP4_LABELS)[q]}</option>
                  ))}
                </select>
              </span>
            </div>

            {job && job.status === 'done' ? (
              <div className="media-card__done">
                <a className="btn-grad btn-sm" href={`${DOWNLOADER_URL}/api/jobs/${job.id}/file`} download={job.filename}>
                  <Icon name="download" /> Download {type.toUpperCase()} ({formatBytes(job.size)})
                </a>
                <button type="button" className="btn-link" onClick={() => setJob(null)}>Other format</button>
              </div>
            ) : busy ? (
              <div className="tool-status" aria-live="polite" style={{ margin: '12px 0 0', maxWidth: 'none' }}>
                <p className="q-meta">{statusText}</p>
                <ProgressBar value={job.progress || 3} label="Download progress" />
              </div>
            ) : (
              <button type="button" className="btn-grad btn-sm" onClick={start} disabled={!options.length}>
                <Icon name={type === 'mp3' ? 'music' : 'video'} /> Convert to {type.toUpperCase()}
              </button>
            )}
          </div>
        </div>
      )}

      <p className="link-legal">
        Only download videos you own or have permission to use. Files are deleted from our server after 30 minutes.{' '}
        <a href="/copyright">Copyright policy</a>
      </p>
    </div>
  );
}
