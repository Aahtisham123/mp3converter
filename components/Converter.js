'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Icon from './Icon';
import LinkDownloader from './LinkDownloader';
import { BitrateSelect, PrivacyNote, ProgressBar, STANDARD_BITRATES, Toggle, overallProgress, stageText } from './tool-ui';
import { ACCEPT, MAX_BYTES, baseName, decodeFile, encodeMp3, extOf, formatBytes, formatTime, toMono } from '@/lib/audio-engine';

const DEFAULT_FORMATS = 'WAV, M4A, AAC, FLAC, OGG, OPUS, WMA, MP4, MOV, WEBM, MKV, AVI';

export default function Converter({
  heading = 'Upload an audio or video file to convert to MP3.',
  formats = DEFAULT_FORMATS,
  defaultBitrate = 192,
  bitrates = STANDARD_BITRATES,
  defaultMono = false,
  initialMode = 'upload',
  showRecord = true,
  showLink = false,
  compress = false,
  buttonLabel = 'Choose Files',
}) {
  const [mode, setMode] = useState(initialMode);
  const [bitrate, setBitrate] = useState(defaultBitrate);
  const [mono, setMono] = useState(defaultMono);
  const [items, setItems] = useState([]);
  const [dragover, setDragover] = useState(false);
  const [recState, setRecState] = useState('idle');
  const [recSeconds, setRecSeconds] = useState(0);
  const [recError, setRecError] = useState('');

  const inputRef = useRef(null);
  const settingsRef = useRef({ bitrate, mono });
  const removedRef = useRef(new Set());
  const recorderRef = useRef(null);
  const timerRef = useRef(null);
  const urlsRef = useRef(new Set());
  const jobsRef = useRef(Promise.resolve());

  settingsRef.current = { bitrate, mono };

  const patch = useCallback((id, changes) => {
    setItems((list) => list.map((it) => (it.id === id ? { ...it, ...changes } : it)));
  }, []);

  // Files are converted one at a time so only one decoded file sits in memory.
  const runJob = useCallback(
    async (id, file, kbps, toMonoOut) => {
      const alive = () => !removedRef.current.has(id);
      if (!alive()) return;
      try {
        const decoded = await decodeFile(file, (stage, p) => alive() && patch(id, { stage, progress: overallProgress(stage, p), pct: Math.round(p * 100) }));
        if (!alive()) return;
        const channels = toMonoOut ? toMono(decoded.channels) : decoded.channels;
        patch(id, { stage: 'encoding', progress: 40, pct: 0, kbps, duration: decoded.duration });
        const blob = await encodeMp3(channels, decoded.sampleRate, kbps, (p) => alive() && patch(id, { progress: overallProgress('encoding', p), pct: p }));
        if (!alive()) return;
        const url = URL.createObjectURL(blob);
        urlsRef.current.add(url);
        patch(id, { stage: 'done', progress: 100, url, outSize: blob.size });
      } catch (err) {
        if (alive()) patch(id, { stage: 'error', error: (err && err.message) || 'Conversion failed.' });
      }
    },
    [patch],
  );

  const convert = useCallback(
    (id, file) => {
      // Lock in the quality settings chosen when the file was added.
      const { bitrate: kbps, mono: toMonoOut } = settingsRef.current;
      jobsRef.current = jobsRef.current.then(() => runJob(id, file, kbps, toMonoOut));
    },
    [runJob],
  );

  const addFiles = useCallback(
    (fileList) => {
      const files = Array.from(fileList || []);
      if (!files.length) return;
      const next = files.map((file) => {
        const id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
        const tooBig = file.size > MAX_BYTES;
        if (!tooBig) convert(id, file);
        return {
          id,
          name: file.name,
          ext: extOf(file.name) || 'file',
          size: file.size,
          stage: tooBig ? 'error' : 'queued',
          progress: 0,
          pct: 0,
          error: tooBig ? 'This file is larger than 500 MB. Please trim or split it first.' : '',
        };
      });
      setItems((list) => [...next, ...list]);
    },
    [convert],
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

  const clearDone = () => items.filter((it) => it.stage === 'done' || it.stage === 'error').forEach((it) => removeItem(it.id));

  const downloadAll = () => {
    items
      .filter((it) => it.stage === 'done')
      .forEach((it, i) => {
        setTimeout(() => {
          const a = document.createElement('a');
          a.href = it.url;
          a.download = `${baseName(it.name)}.mp3`;
          document.body.appendChild(a);
          a.click();
          a.remove();
        }, i * 400);
      });
  };

  useEffect(
    () => () => {
      urlsRef.current.forEach((u) => URL.revokeObjectURL(u));
      clearInterval(timerRef.current);
      const rec = recorderRef.current;
      if (rec && rec.state !== 'inactive') rec.stop();
    },
    [],
  );

  // ----- Recording -----
  const startRecording = async () => {
    setRecError('');
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || !window.MediaRecorder) {
      setRecError('Recording is not supported in this browser. Please try Chrome, Edge, Firefox or Safari.');
      return;
    }
    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
    } catch (err) {
      setRecError(
        err && err.name === 'NotFoundError'
          ? 'No microphone was found. Plug one in and try again.'
          : 'Microphone access was blocked. Allow it in your browser settings and try again.',
      );
      return;
    }
    try {
      const rec = new MediaRecorder(stream);
      const chunks = [];
      rec.ondataavailable = (e) => e.data && e.data.size && chunks.push(e.data);
      rec.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        clearInterval(timerRef.current);
        setRecState('idle');
        if (!chunks.length) {
          setRecError('Nothing was recorded. Please try again.');
          return;
        }
        const type = rec.mimeType || chunks[0].type || 'audio/webm';
        const stamp = new Date().toISOString().slice(0, 19).replace(/[T:]/g, '-');
        const ext = type.includes('mp4') ? 'm4a' : type.includes('ogg') ? 'ogg' : 'webm';
        addFiles([new File(chunks, `recording-${stamp}.${ext}`, { type })]);
      };
      recorderRef.current = rec;
      rec.start(1000);
      const started = Date.now();
      setRecSeconds(0);
      timerRef.current = setInterval(() => setRecSeconds((Date.now() - started) / 1000), 250);
      setRecState('recording');
    } catch {
      stream.getTracks().forEach((t) => t.stop());
      setRecError('Recording could not start in this browser.');
    }
  };

  const stopRecording = () => {
    const rec = recorderRef.current;
    if (rec && rec.state !== 'inactive') rec.stop();
  };

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
      if (recState === 'recording') return;
      setMode('upload');
      addFiles(e.dataTransfer.files);
    },
  };

  const metaText = (it) => {
    if (it.stage === 'error') return it.error;
    if (it.stage === 'done') {
      const saved = it.size > it.outSize ? ` · ${Math.round((1 - it.outSize / it.size) * 100)}% smaller` : '';
      return `${formatBytes(it.size)} → ${formatBytes(it.outSize)} · ${it.kbps} kbps · ${formatTime(it.duration)}${compress ? saved : ''}`;
    }
    return stageText(it.stage, it.pct);
  };

  const doneCount = items.filter((it) => it.stage === 'done').length;
  const busy = items.some((it) => !['done', 'error'].includes(it.stage));

  return (
    <div className="converter-wrap" id="converter">
      {showRecord && (
        <div className="mode-tabs" role="tablist" aria-label="Choose input">
          <button type="button" role="tab" id="tab-upload" aria-controls="panel-converter" aria-selected={mode === 'upload'} className="mode-tab" onClick={() => setMode('upload')} disabled={recState === 'recording'}>
            <Icon name="music" /> Upload
          </button>
          {showLink && (
            <button type="button" role="tab" id="tab-link" aria-controls="panel-converter" aria-selected={mode === 'link'} className="mode-tab" onClick={() => setMode('link')} disabled={recState === 'recording'}>
              <Icon name="link" /> Paste Link
            </button>
          )}
          <button type="button" role="tab" id="tab-record" aria-controls="panel-converter" aria-selected={mode === 'record'} className="mode-tab" onClick={() => setMode('record')}>
            <Icon name="mic" /> Record
          </button>
        </div>
      )}

      <div
        id="panel-converter"
        role={showRecord ? 'tabpanel' : 'region'}
        aria-labelledby={showRecord ? `tab-${mode}` : undefined}
        aria-label={showRecord ? undefined : 'MP3 converter'}
        className={`converter${dragover ? ' is-dragover' : ''}`}
        {...dropProps}
      >
        {items.length > 0 && (
          <>
            <ul className="queue" aria-live="polite">
              {items.map((it) => (
                <li className="q-item" key={it.id}>
                  <span className="q-badge" aria-hidden="true">{it.stage === 'done' ? 'mp3' : it.ext}</span>
                  <div style={{ minWidth: 0 }}>
                    <div className="q-name" title={it.name}>{it.stage === 'done' ? `${baseName(it.name)}.mp3` : it.name}</div>
                    <div className={`q-meta${it.stage === 'error' ? ' is-error' : ''}`}>{metaText(it)}</div>
                    {!['done', 'error'].includes(it.stage) && <ProgressBar value={it.progress} label={`Converting ${it.name}`} />}
                    {it.stage === 'done' && <audio className="q-audio" controls preload="none" src={it.url} />}
                  </div>
                  <div className="q-actions">
                    {it.stage === 'done' && (
                      <a className="q-dl" href={it.url} download={`${baseName(it.name)}.mp3`}>
                        <Icon name="download" className="icon icon-sm" /> Download
                      </a>
                    )}
                    <button type="button" className="q-remove" onClick={() => removeItem(it.id)} aria-label={`Remove ${it.name}`} title={busy && !['done', 'error'].includes(it.stage) ? 'Cancel' : 'Remove'}>
                      <Icon name="x" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="queue-bar">
              {doneCount > 1 && (
                <button type="button" className="btn-outline btn-sm" onClick={downloadAll}>
                  <Icon name="download" className="icon icon-sm" /> Download all ({doneCount})
                </button>
              )}
              {!busy && (
                <button type="button" className="btn-link" onClick={clearDone}>
                  Clear list
                </button>
              )}
            </div>
          </>
        )}

        <div className="converter__icon" aria-hidden="true">
          <span>
            <Icon name={mode === 'upload' ? 'upload' : mode === 'link' ? 'link' : 'mic'} />
          </span>
        </div>

        {mode === 'link' ? (
          <>
            <h2>Paste a video link to download it or convert it to MP3.</h2>
            <p className="converter__formats">Works with YouTube, Vimeo, Dailymotion, direct video links and many more sites</p>
            <LinkDownloader />
          </>
        ) : mode === 'upload' ? (
          <>
            <h2>{heading}</h2>
            <p className="converter__formats">
              Supported formats: <strong>{formats}</strong> and more, up to 500 MB per file
            </p>
            <div className="converter__actions">
              <button type="button" className="btn-grad" onClick={() => inputRef.current && inputRef.current.click()}>
                <Icon name="upload" /> {buttonLabel}
              </button>
              <input
                ref={inputRef}
                type="file"
                accept={ACCEPT}
                multiple
                hidden
                onChange={(e) => {
                  addFiles(e.target.files);
                  e.target.value = '';
                }}
              />
            </div>
            <p className="drop-hint">or drag and drop files here</p>
          </>
        ) : (
          <>
            <h2>Record your voice and save it as an MP3.</h2>
            {recState === 'recording' ? (
              <p className="recorder__time">
                <span className="rec-dot" aria-hidden="true" />
                {formatTime(recSeconds)}
              </p>
            ) : (
              <p className="converter__formats">Uses your microphone. The recording never leaves your device.</p>
            )}
            <div className="converter__actions">
              {recState === 'recording' ? (
                <button type="button" className="btn-grad" onClick={stopRecording}>
                  <Icon name="stop" /> Stop &amp; Convert
                </button>
              ) : (
                <button type="button" className="btn-grad" onClick={startRecording}>
                  <Icon name="record" /> Start Recording
                </button>
              )}
            </div>
            {recError && <p className="q-meta is-error" role="alert">{recError}</p>}
          </>
        )}

        {mode !== 'link' && (
          <>
            <div className="converter__options">
              <BitrateSelect value={bitrate} onChange={setBitrate} options={bitrates} />
              <span className="opt-divider" aria-hidden="true" />
              <Toggle label="Mono (smaller file):" checked={mono} onChange={setMono} />
            </div>
            <PrivacyNote />
          </>
        )}
      </div>
    </div>
  );
}
