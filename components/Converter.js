'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Icon from './Icon';

const MAX_BYTES = 500 * 1024 * 1024;
const ACCEPT = 'audio/*,video/*,.mp3,.wav,.m4a,.aac,.flac,.ogg,.oga,.opus,.wma,.aiff,.aif,.mp4,.mov,.webm,.mkv,.avi,.3gp';

function formatBytes(n) {
  if (!n && n !== 0) return '';
  if (n < 1024 * 1024) return `${Math.max(1, Math.round(n / 1024))} KB`;
  return `${(n / (1024 * 1024)).toFixed(n < 10 * 1024 * 1024 ? 1 : 0)} MB`;
}

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function extOf(name) {
  const m = /\.([a-z0-9]{1,5})$/i.exec(name || '');
  return m ? m[1].toLowerCase() : 'file';
}

function mp3Name(name) {
  return `${(name || 'audio').replace(/\.[^.]+$/, '')}.mp3`;
}

async function decode(file, mono) {
  const data = await file.arrayBuffer();
  const Ctx = window.AudioContext || window.webkitAudioContext;
  let ctx;
  try {
    // MP3 encoders work best at 44.1 kHz; the browser resamples while decoding.
    ctx = new Ctx({ sampleRate: 44100 });
  } catch {
    ctx = new Ctx();
  }
  try {
    const audio = await new Promise((resolve, reject) => {
      const p = ctx.decodeAudioData(data, resolve, reject);
      if (p && p.then) p.then(resolve, reject);
    });
    let channels;
    if (audio.numberOfChannels === 1) {
      channels = [audio.getChannelData(0)];
    } else if (mono) {
      const l = audio.getChannelData(0);
      const r = audio.getChannelData(1);
      const mix = new Float32Array(l.length);
      for (let i = 0; i < l.length; i++) mix[i] = (l[i] + r[i]) / 2;
      channels = [mix];
    } else {
      channels = [audio.getChannelData(0), audio.getChannelData(1)];
    }
    return { channels, sampleRate: audio.sampleRate, duration: audio.duration };
  } finally {
    if (ctx.close) ctx.close().catch(() => {});
  }
}

export default function Converter() {
  const [mode, setMode] = useState('upload');
  const [bitrate, setBitrate] = useState(192);
  const [mono, setMono] = useState(false);
  const [items, setItems] = useState([]);
  const [dragover, setDragover] = useState(false);
  const [recState, setRecState] = useState('idle'); // idle | recording | error
  const [recSeconds, setRecSeconds] = useState(0);
  const [recError, setRecError] = useState('');

  const inputRef = useRef(null);
  const workerRef = useRef(null);
  const queueRef = useRef([]);
  const busyRef = useRef(false);
  const settingsRef = useRef({ bitrate, mono });
  const recorderRef = useRef(null);
  const timerRef = useRef(null);
  const urlsRef = useRef([]);

  settingsRef.current = { bitrate, mono };

  const patch = useCallback((id, changes) => {
    setItems((list) => list.map((it) => (it.id === id ? { ...it, ...changes } : it)));
  }, []);

  const getWorker = () => {
    if (!workerRef.current) workerRef.current = new Worker('/mp3-worker.js');
    return workerRef.current;
  };

  const encode = (id, decoded, kbps) =>
    new Promise((resolve, reject) => {
      const worker = getWorker();
      const onMessage = (e) => {
        if (e.data.id !== id) return;
        if (e.data.type === 'progress') patch(id, { progress: 30 + Math.round(e.data.progress * 0.7) });
        if (e.data.type === 'done' || e.data.type === 'error') {
          worker.removeEventListener('message', onMessage);
          e.data.type === 'done' ? resolve(e.data.blob) : reject(new Error(e.data.message));
        }
      };
      worker.addEventListener('message', onMessage);
      worker.postMessage(
        { id, channels: decoded.channels, sampleRate: decoded.sampleRate, bitrate: kbps },
        decoded.channels.map((c) => c.buffer).filter((b, i, a) => a.indexOf(b) === i && b.byteLength),
      );
    });

  const pump = useCallback(async () => {
    if (busyRef.current) return;
    busyRef.current = true;
    while (queueRef.current.length) {
      const { id, file } = queueRef.current.shift();
      const { bitrate: kbps, mono: toMono } = settingsRef.current;
      try {
        patch(id, { status: 'decoding', progress: 10 });
        const decoded = await decode(file, toMono);
        patch(id, { status: 'encoding', progress: 30, duration: decoded.duration, kbps });
        const blob = await encode(id, decoded, kbps);
        const url = URL.createObjectURL(blob);
        urlsRef.current.push(url);
        patch(id, { status: 'done', progress: 100, url, outSize: blob.size });
      } catch (err) {
        patch(id, {
          status: 'error',
          error:
            err && err.name === 'EncodingError'
              ? 'Your browser could not read the audio in this file. Try another format or browser.'
              : 'Conversion failed. The file may be damaged or use an unsupported codec.',
        });
      }
    }
    busyRef.current = false;
  }, [patch]);

  const addFiles = useCallback(
    (fileList) => {
      const files = Array.from(fileList || []);
      if (!files.length) return;
      const next = files.map((file) => {
        const id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
        const tooBig = file.size > MAX_BYTES;
        if (!tooBig) queueRef.current.push({ id, file });
        return {
          id,
          name: file.name,
          ext: extOf(file.name),
          size: file.size,
          status: tooBig ? 'error' : 'queued',
          progress: 0,
          error: tooBig ? 'This file is larger than 500 MB. Please trim it or split it first.' : '',
        };
      });
      setItems((list) => [...next, ...list]);
      pump();
    },
    [pump],
  );

  const removeItem = (id) => {
    queueRef.current = queueRef.current.filter((q) => q.id !== id);
    setItems((list) => {
      const it = list.find((x) => x.id === id);
      if (it && it.url) URL.revokeObjectURL(it.url);
      return list.filter((x) => x.id !== id);
    });
  };

  useEffect(
    () => () => {
      urlsRef.current.forEach((u) => URL.revokeObjectURL(u));
      if (workerRef.current) workerRef.current.terminate();
      clearInterval(timerRef.current);
      const rec = recorderRef.current;
      if (rec && rec.state !== 'inactive') rec.stop();
    },
    [],
  );

  // ----- Recording -----
  const startRecording = async () => {
    setRecError('');
    if (!navigator.mediaDevices || !window.MediaRecorder) {
      setRecState('error');
      setRecError('Recording is not supported in this browser.');
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const rec = new MediaRecorder(stream);
      const chunks = [];
      rec.ondataavailable = (e) => e.data.size && chunks.push(e.data);
      rec.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        clearInterval(timerRef.current);
        setRecState('idle');
        const type = rec.mimeType || 'audio/webm';
        const stamp = new Date().toISOString().slice(0, 19).replace(/[T:]/g, '-');
        const ext = type.includes('mp4') ? 'm4a' : type.includes('ogg') ? 'ogg' : 'webm';
        addFiles([new File(chunks, `recording-${stamp}.${ext}`, { type })]);
      };
      recorderRef.current = rec;
      rec.start();
      setRecSeconds(0);
      const started = Date.now();
      timerRef.current = setInterval(() => setRecSeconds((Date.now() - started) / 1000), 250);
      setRecState('recording');
    } catch {
      setRecState('error');
      setRecError('Microphone access was blocked. Allow it in your browser settings and try again.');
    }
  };

  const stopRecording = () => {
    const rec = recorderRef.current;
    if (rec && rec.state !== 'inactive') rec.stop();
  };

  // ----- Drag and drop -----
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
      setMode('upload');
      addFiles(e.dataTransfer.files);
    },
  };

  const statusText = (it) => {
    switch (it.status) {
      case 'queued':
        return 'Waiting…';
      case 'decoding':
        return 'Reading audio…';
      case 'encoding':
        return `Encoding MP3 at ${it.kbps} kbps… ${it.progress}%`;
      case 'done':
        return `${formatBytes(it.size)} → ${formatBytes(it.outSize)} MP3 · ${it.kbps} kbps · ${formatTime(it.duration || 0)}`;
      default:
        return it.error;
    }
  };

  return (
    <div className="converter-wrap" id="converter">
      <div className="mode-tabs" role="tablist" aria-label="Choose input">
        <button
          type="button"
          role="tab"
          id="tab-upload"
          aria-controls="panel-converter"
          aria-selected={mode === 'upload'}
          className="mode-tab"
          onClick={() => setMode('upload')}
        >
          <Icon name="music" /> Upload
        </button>
        <button
          type="button"
          role="tab"
          id="tab-record"
          aria-controls="panel-converter"
          aria-selected={mode === 'record'}
          className="mode-tab"
          onClick={() => setMode('record')}
        >
          <Icon name="mic" /> Record
        </button>
      </div>

      <div
        id="panel-converter"
        role="tabpanel"
        aria-labelledby={mode === 'upload' ? 'tab-upload' : 'tab-record'}
        className={`converter${dragover ? ' is-dragover' : ''}`}
        {...dropProps}
      >
        <ul className="queue" aria-live="polite">
          {items.map((it) => (
            <li className="q-item" key={it.id}>
              <span className="q-badge" aria-hidden="true">{it.status === 'done' ? 'mp3' : it.ext}</span>
              <div style={{ minWidth: 0 }}>
                <div className="q-name" title={it.name}>{it.status === 'done' ? mp3Name(it.name) : it.name}</div>
                <div className={`q-meta${it.status === 'error' ? ' is-error' : ''}`}>{statusText(it)}</div>
                {(it.status === 'decoding' || it.status === 'encoding' || it.status === 'queued') && (
                  <div className="q-bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={it.progress} aria-label={`Converting ${it.name}`}>
                    <span style={{ width: `${it.progress}%` }} />
                  </div>
                )}
              </div>
              <div className="q-actions">
                {it.status === 'done' && (
                  <a className="q-dl" href={it.url} download={mp3Name(it.name)}>
                    <Icon name="download" className="icon" style={{ width: 16, height: 16 }} /> Download
                  </a>
                )}
                <button type="button" className="q-remove" onClick={() => removeItem(it.id)} aria-label={`Remove ${it.name}`}>
                  <Icon name="x" />
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="converter__icon" aria-hidden="true">
          <span>
            <Icon name={mode === 'upload' ? 'upload' : 'mic'} />
          </span>
        </div>

        {mode === 'upload' ? (
          <>
            <h2>Upload an audio or video file to convert to MP3.</h2>
            <p className="converter__formats">
              Supported formats: <strong>WAV, M4A, AAC, FLAC, OGG, OPUS, MP4, MOV, WEBM, MKV</strong> and more, up to 500 MB
            </p>
            <div className="converter__actions">
              <button type="button" className="btn-grad" onClick={() => inputRef.current && inputRef.current.click()}>
                <Icon name="upload" /> Choose Files
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
          </>
        ) : (
          <>
            <h2>Record your voice and save it as an MP3.</h2>
            {recState === 'recording' ? (
              <p className="recorder__time" aria-live="off">
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

        <div className="converter__options">
          <label className="opt">
            MP3 Quality:
            <span className="select-wrap">
              <Icon name="sliders" />
              <select value={bitrate} onChange={(e) => setBitrate(Number(e.target.value))}>
                <option value={128}>128 kbps (small)</option>
                <option value={192}>192 kbps (standard)</option>
                <option value={256}>256 kbps (high)</option>
                <option value={320}>320 kbps (best)</option>
              </select>
            </span>
          </label>
          <span className="opt-divider" aria-hidden="true" />
          <label className="opt">
            Mono (smaller file):
            <span className="switch">
              <input type="checkbox" role="switch" checked={mono} onChange={(e) => setMono(e.target.checked)} />
              <span />
            </span>
          </label>
        </div>
        <p className="privacy-note">
          <Icon name="lock" /> Files are converted inside your browser and are never uploaded to a server.
        </p>
      </div>
    </div>
  );
}
