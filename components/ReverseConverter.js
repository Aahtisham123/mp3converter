'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Icon from './Icon';
import { PrivacyNote, ProgressBar, Toggle } from './tool-ui';
import { ACCEPT, MAX_BYTES, baseName, convertWithFfmpeg, encodeAmr, extOf, formatBytes, mediaDuration } from '@/lib/audio-engine';
import { REVERSE_TARGETS } from '@/lib/reverse-formats';

function stageText(it) {
  switch (it.stage) {
    case 'queued':
      return 'Waiting…';
    case 'loading':
      return 'Loading the converter (first time only)…';
    case 'decoding':
    case 'ffmpeg-loading':
    case 'ffmpeg-decoding':
      return 'Reading audio…';
    case 'converting':
    case 'encoding':
      return `Converting… ${it.pct || 0}%`;
    default:
      return '';
  }
}

/** Converts MP3 (or other audio) files into the page's format, e.g. MP3 to WMA. */
export default function ReverseConverter({ target }) {
  const t = REVERSE_TARGETS[target];
  const [option, setOption] = useState(t.defaultOption);
  const [mono, setMono] = useState(Boolean(t.defaultMono));
  const [items, setItems] = useState([]);
  const [dragover, setDragover] = useState(false);
  const inputRef = useRef(null);
  const jobsRef = useRef(Promise.resolve());
  const removedRef = useRef(new Set());
  const urlsRef = useRef(new Set());
  const settingsRef = useRef({ option, mono });
  settingsRef.current = { option, mono };

  useEffect(() => () => urlsRef.current.forEach((u) => URL.revokeObjectURL(u)), []);

  const patch = useCallback((id, changes) => setItems((list) => list.map((it) => (it.id === id ? { ...it, ...changes } : it))), []);

  const run = useCallback(
    async (id, file, opt, toMono) => {
      const alive = () => !removedRef.current.has(id);
      if (!alive()) return;
      try {
        let data;
        if (t.amr) {
          data = await encodeAmr(file, Number(opt), (stage, p) => alive() && patch(id, { stage, progress: stage === 'encoding' ? 60 : 25, pct: Math.round((p || 0) * 100) }));
        } else {
          const chosen = t.options.find((o) => o.value === opt) || t.options[0];
          const args = [...chosen.args];
          if (t.allowMono && toMono) args.push('-ac', '1');
          if (t.video) {
            // Stop the still picture exactly where the audio ends.
            const secs = await mediaDuration(file);
            if (secs) args.push('-t', secs.toFixed(3));
          }
          data = await convertWithFfmpeg(file, args, `output.${t.ext}`, (stage, p) => {
            if (!alive()) return;
            const pct = Math.round((p || 0) * 100);
            patch(id, { stage, pct, progress: stage === 'loading' ? 8 : 10 + Math.round(pct * 0.9) });
          });
        }
        if (!alive()) return;
        const blob = new Blob([data], { type: t.mime });
        const url = URL.createObjectURL(blob);
        urlsRef.current.add(url);
        patch(id, { stage: 'done', progress: 100, url, outSize: blob.size });
      } catch (err) {
        if (alive()) {
          patch(id, {
            stage: 'error',
            error: 'This file could not be converted. It may be damaged, protected or not an audio file.',
          });
        }
      }
    },
    [patch, t],
  );

  const addFiles = useCallback(
    (fileList) => {
      const files = Array.from(fileList || []);
      if (!files.length) return;
      const { option: opt, mono: toMono } = settingsRef.current;
      const next = files.map((file) => {
        const id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
        const tooBig = file.size > MAX_BYTES;
        if (!tooBig) jobsRef.current = jobsRef.current.then(() => run(id, file, opt, toMono));
        return {
          id,
          name: file.name,
          ext: extOf(file.name) || 'file',
          size: file.size,
          stage: tooBig ? 'error' : 'queued',
          progress: 0,
          pct: 0,
          error: tooBig ? 'This file is larger than 500 MB.' : '',
        };
      });
      setItems((list) => [...next, ...list]);
    },
    [run],
  );

  const removeItem = (id) => {
    removedRef.current.add(id);
    setItems((list) => {
      const it = list.find((x) => x.id === id);
      if (it && it.url) {
        URL.revokeObjectURL(it.url);
        urlsRef.current.delete(it.url);
      }
      return list.filter((x) => x.id !== id);
    });
  };

  const canPreview = typeof document !== 'undefined' && !t.video && Boolean(document.createElement('audio').canPlayType(t.mime));
  const outName = (it) => `${baseName(it.name)}.${t.ext}`;

  return (
    <div className="converter-wrap" id="converter">
      <div
        className={`converter${dragover ? ' is-dragover' : ''}`}
        role="region"
        aria-label={`MP3 to ${t.label} converter`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragover(true);
        }}
        onDragLeave={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) setDragover(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          setDragover(false);
          addFiles(e.dataTransfer.files);
        }}
      >
        {items.length > 0 && (
          <ul className="queue" aria-live="polite">
            {items.map((it) => (
              <li className="q-item" key={it.id}>
                <span className="q-badge" aria-hidden="true">{it.stage === 'done' ? t.ext : it.ext}</span>
                <div style={{ minWidth: 0 }}>
                  <div className="q-name" title={it.name}>{it.stage === 'done' ? outName(it) : it.name}</div>
                  <div className={`q-meta${it.stage === 'error' ? ' is-error' : ''}`}>
                    {it.stage === 'done' ? `${formatBytes(it.size)} → ${formatBytes(it.outSize)} ${t.label}` : it.stage === 'error' ? it.error : stageText(it)}
                  </div>
                  {!['done', 'error'].includes(it.stage) && <ProgressBar value={it.progress} label={`Converting ${it.name}`} />}
                  {it.stage === 'done' && canPreview && <audio className="q-audio" controls preload="none" src={it.url} />}
                </div>
                <div className="q-actions">
                  {it.stage === 'done' && (
                    <a className="q-dl" href={it.url} download={outName(it)}>
                      <Icon name="download" className="icon icon-sm" /> Download
                    </a>
                  )}
                  <button type="button" className="q-remove" onClick={() => removeItem(it.id)} aria-label={`Remove ${it.name}`}>
                    <Icon name="x" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="converter__icon" aria-hidden="true">
          <span>
            <Icon name="upload" />
          </span>
        </div>
        <h2>Upload MP3 files to convert to {t.label}.</h2>
        <p className="converter__formats">
          Works with <strong>MP3</strong> and other audio files (WAV, M4A, FLAC, OGG…), up to 500 MB per file
        </p>
        <div className="converter__actions">
          <button type="button" className="btn-grad" onClick={() => inputRef.current && inputRef.current.click()}>
            <Icon name="upload" /> Choose MP3 Files
          </button>
          <input
            ref={inputRef}
            type="file"
            accept={`.mp3,audio/mpeg,${ACCEPT}`}
            multiple
            hidden
            onChange={(e) => {
              addFiles(e.target.files);
              e.target.value = '';
            }}
          />
        </div>
        <p className="drop-hint">or drag and drop files here</p>

        <div className="converter__options">
          {t.options.length > 1 && (
            <label className="opt">
              {t.label} quality:
              <span className="select-wrap">
                <Icon name="sliders" />
                <select value={option} onChange={(e) => setOption(e.target.value)}>
                  {t.options.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </span>
            </label>
          )}
          {t.allowMono && (
            <>
              {t.options.length > 1 && <span className="opt-divider" aria-hidden="true" />}
              <Toggle label="Mono (smaller file):" checked={mono} onChange={setMono} />
            </>
          )}
          {t.note && <p className="reverse-note">{t.note}</p>}
        </div>
        <PrivacyNote />
      </div>
    </div>
  );
}
