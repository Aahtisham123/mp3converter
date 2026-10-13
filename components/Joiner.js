'use client';

import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';
import { BitrateSelect, PrivacyNote, ProgressBar, Toggle, overallProgress, stageText } from './tool-ui';
import { ACCEPT, MAX_BYTES, TARGET_RATE, concatClips, decodeFile, encodeMp3, extOf, formatBytes, formatTime, toMono } from '@/lib/audio-engine';

const GAPS = [
  { value: 0, label: 'No gap' },
  { value: 0.5, label: '0.5 second' },
  { value: 1, label: '1 second' },
  { value: 2, label: '2 seconds' },
  { value: 3, label: '3 seconds' },
];

export default function Joiner() {
  const [clips, setClips] = useState([]); // {id, name, ext, size, stage, progress, pct, duration, error}
  const [gap, setGap] = useState(0);
  const [bitrate, setBitrate] = useState(192);
  const [mono, setMono] = useState(false);
  const [joining, setJoining] = useState(null); // progress 0-100 or null
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [dragover, setDragover] = useState(false);

  const inputRef = useRef(null);
  const audioRef = useRef(new Map()); // id -> decoded audio
  const jobsRef = useRef(Promise.resolve());
  const removedRef = useRef(new Set());

  const patch = (id, changes) => setClips((list) => list.map((c) => (c.id === id ? { ...c, ...changes } : c)));

  const addFiles = (fileList) => {
    const files = Array.from(fileList || []);
    if (!files.length) return;
    setError('');
    const added = files.map((file) => ({
      id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
      file,
      name: file.name,
      ext: extOf(file.name) || 'file',
      size: file.size,
      stage: file.size > MAX_BYTES ? 'error' : 'queued',
      progress: 0,
      pct: 0,
      error: file.size > MAX_BYTES ? 'Larger than 500 MB.' : '',
    }));
    setClips((list) => [...list, ...added]);
    added
      .filter((c) => c.stage === 'queued')
      .forEach((c) => {
        jobsRef.current = jobsRef.current.then(async () => {
          if (removedRef.current.has(c.id)) return;
          try {
            const d = await decodeFile(c.file, (s, p) => patch(c.id, { stage: s, progress: Math.min(100, overallProgress(s, p) * 2.5), pct: Math.round(p * 100) }));
            if (removedRef.current.has(c.id)) return;
            audioRef.current.set(c.id, d);
            patch(c.id, { stage: 'ready', duration: d.duration, progress: 100 });
          } catch (err) {
            patch(c.id, { stage: 'error', error: err.message });
          }
        });
      });
  };

  const move = (idx, dir) =>
    setClips((list) => {
      const next = [...list];
      const j = idx + dir;
      if (j < 0 || j >= next.length) return list;
      [next[idx], next[j]] = [next[j], next[idx]];
      return next;
    });

  const remove = (id) => {
    removedRef.current.add(id);
    audioRef.current.delete(id);
    setClips((list) => list.filter((c) => c.id !== id));
  };

  const ready = clips.filter((c) => c.stage === 'ready');
  const loading = clips.some((c) => !['ready', 'error'].includes(c.stage));
  const total = ready.reduce((n, c) => n + c.duration, 0) + gap * Math.max(0, ready.length - 1);

  const join = async () => {
    setError('');
    if (ready.length < 2) {
      setError('Add at least two files to join.');
      return;
    }
    setJoining(0);
    try {
      let channels = concatClips(ready.map((c) => audioRef.current.get(c.id)), gap);
      if (mono) channels = toMono(channels);
      const blob = await encodeMp3(channels, TARGET_RATE, bitrate, (p) => setJoining(p));
      setResult(() => {
        return { url: URL.createObjectURL(blob), size: blob.size, secs: total, kbps: bitrate };
      });
    } catch (err) {
      setError(err.message || 'Joining failed. Try fewer or shorter files.');
    }
    setJoining(null);
  };

  useEffect(() => () => result && URL.revokeObjectURL(result.url), [result]);

  // A finished file no longer matches once the list, order or gap changes.
  const signature = `${ready.map((c) => c.id).join(',')}|${gap}`;
  useEffect(() => {
    setResult(null);
  }, [signature]);

  const dropProps = {
    onDragOver: (e) => {
      e.preventDefault();
      setDragover(true);
    },
    onDragLeave: (e) => {
      if (!e.currentTarget.contains(e.relatedTarget)) setDragover(false);
    },
    onDrop: (e) => {
      e.preventDefault();
      setDragover(false);
      addFiles(e.dataTransfer.files);
    },
  };

  return (
    <div className="converter-wrap" id="converter">
      <div className={`converter${dragover ? ' is-dragover' : ''}`} role="region" aria-label="Audio joiner" {...dropProps}>
        <input ref={inputRef} type="file" accept={ACCEPT} multiple hidden onChange={(e) => { addFiles(e.target.files); e.target.value = ''; }} />

        {clips.length > 0 && (
          <ol className="queue join-list" aria-live="polite">
            {clips.map((c, i) => (
              <li className="q-item" key={c.id}>
                <span className="q-badge" aria-hidden="true">{i + 1}</span>
                <div style={{ minWidth: 0 }}>
                  <div className="q-name" title={c.name}>{c.name}</div>
                  <div className={`q-meta${c.stage === 'error' ? ' is-error' : ''}`}>
                    {c.stage === 'ready' ? `${formatTime(c.duration)} · ${formatBytes(c.size)}` : c.stage === 'error' ? c.error : stageText(c.stage, c.pct)}
                  </div>
                  {!['ready', 'error'].includes(c.stage) && <ProgressBar value={c.progress} label={`Loading ${c.name}`} />}
                </div>
                <div className="q-actions">
                  <button type="button" className="q-remove" onClick={() => move(i, -1)} disabled={i === 0} aria-label={`Move ${c.name} up`}><Icon name="arrowUp" /></button>
                  <button type="button" className="q-remove" onClick={() => move(i, 1)} disabled={i === clips.length - 1} aria-label={`Move ${c.name} down`}><Icon name="arrowDown" /></button>
                  <button type="button" className="q-remove" onClick={() => remove(c.id)} aria-label={`Remove ${c.name}`}><Icon name="x" /></button>
                </div>
              </li>
            ))}
          </ol>
        )}

        {clips.length === 0 ? (
          <>
            <div className="converter__icon" aria-hidden="true"><span><Icon name="layers" /></span></div>
            <h2>Add two or more files to join into one MP3.</h2>
            <p className="converter__formats">Mix <strong>MP3, WAV, M4A, FLAC, OGG, MP4, MOV</strong> and more, up to 500 MB per file</p>
            <div className="converter__actions">
              <button type="button" className="btn-grad" onClick={() => inputRef.current.click()}>
                <Icon name="upload" /> Choose Files
              </button>
            </div>
            <p className="drop-hint">or drag and drop files here</p>
          </>
        ) : (
          <div className="converter__actions">
            <button type="button" className="btn-outline" onClick={() => inputRef.current.click()}>
              <Icon name="plus" /> Add more files
            </button>
            <button type="button" className="btn-grad" onClick={join} disabled={loading || ready.length < 2 || joining != null}>
              <Icon name="layers" /> Join {ready.length} files ({formatTime(total)})
            </button>
          </div>
        )}

        {joining != null && (
          <div className="tool-status" aria-live="polite">
            <p className="q-meta">Joining and encoding MP3… {joining}%</p>
            <ProgressBar value={joining} label="Encoding joined MP3" />
          </div>
        )}
        {error && <p className="q-meta is-error" role="alert">{error}</p>}

        {result && joining == null && (
          <div className="result-card" aria-live="polite">
            <span className="q-badge" aria-hidden="true">mp3</span>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div className="q-name">joined-audio.mp3</div>
              <div className="q-meta">{formatTime(result.secs)} · {formatBytes(result.size)} · {result.kbps} kbps</div>
              <audio className="q-audio" controls src={result.url} />
            </div>
            <a className="q-dl" href={result.url} download="joined-audio.mp3">
              <Icon name="download" className="icon icon-sm" /> Download
            </a>
          </div>
        )}

        <div className="converter__options">
          <label className="opt">
            Gap between files:
            <span className="select-wrap">
              <Icon name="sliders" />
              <select value={gap} onChange={(e) => setGap(Number(e.target.value))}>
                {GAPS.map((g) => <option key={g.value} value={g.value}>{g.label}</option>)}
              </select>
            </span>
          </label>
          <span className="opt-divider" aria-hidden="true" />
          <BitrateSelect value={bitrate} onChange={setBitrate} />
          <span className="opt-divider" aria-hidden="true" />
          <Toggle label="Mono:" checked={mono} onChange={setMono} />
        </div>
        <PrivacyNote />
      </div>
    </div>
  );
}
