'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Icon from './Icon';
import { useI18n } from './I18nProvider';
import Rich from './Rich';
import { PrivacyNote, ProgressBar, stageText } from './tool-ui';
import { ACCEPT, baseName, decodeFile, formatBytes, formatTime, resample } from '@/lib/audio-engine';
import {
  DEFAULT_SPEECH_MODEL,
  SPEECH_LANGUAGES,
  SPEECH_MODELS,
  clock,
  cleanSegments,
  countWords,
  languageNames,
  toParagraphs,
  toSpeechAudio,
  toSrt,
  toVtt,
} from '@/lib/transcript';

// Set when this browser's graphics card could not load or run the model, so it is not tried again.
const GPU_FAILED_KEY = 'mp3c:transcribe-gpu-failed';
function gpuFailedBefore() {
  try {
    return localStorage.getItem(GPU_FAILED_KEY) === '1';
  } catch {
    return false;
  }
}

function friendlyError(message, t) {
  if (/fetch|network|load model|Could not locate|404|Failed to/i.test(message)) return t('transcriber.modelFailed');
  if (/memory|allocation|RangeError|out of bounds/i.test(message)) return t('transcriber.memory');
  return t('transcriber.failed');
}

function saveText(text, name, type) {
  const url = URL.createObjectURL(new Blob([text], { type: `${type};charset=utf-8` }));
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

export default function Transcriber() {
  const { t, err: tErr, lang } = useI18n();
  const [file, setFile] = useState(null);
  const [language, setLanguage] = useState('auto');
  const [model, setModel] = useState(DEFAULT_SPEECH_MODEL);
  const [stage, setStage] = useState('idle'); // idle | reading | model | detecting | transcribing | done | error
  const [progress, setProgress] = useState({ value: 0, pct: 0, done: 0, total: 0, decode: '' });
  const [live, setLive] = useState('');
  const [result, setResult] = useState(null); // { segments, language, detected, duration }
  const [text, setText] = useState('');
  const [view, setView] = useState('text');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [dragover, setDragover] = useState(false);
  const [mode, setMode] = useState('upload'); // upload | record
  const [device, setDevice] = useState(null); // 'webgpu' | 'wasm', reported by the worker
  const [recState, setRecState] = useState('idle');
  const [recSeconds, setRecSeconds] = useState(0);

  const inputRef = useRef(null);
  const workerRef = useRef(null);
  const audioRef = useRef(null); // { key: File, data: Float32Array, duration }
  const runRef = useRef(0);
  const recorderRef = useRef(null);
  const timerRef = useRef(null);

  const names = useMemo(() => languageNames(lang), [lang]);
  const busy = ['reading', 'model', 'detecting', 'transcribing'].includes(stage);

  useEffect(
    () => () => {
      if (workerRef.current) workerRef.current.terminate();
      clearInterval(timerRef.current);
      const rec = recorderRef.current;
      if (rec && rec.state !== 'inactive') rec.stop();
    },
    [],
  );

  const getWorker = () => {
    if (!workerRef.current) {
      workerRef.current = new Worker('/transcribe-worker.js', { type: 'module' });
      workerRef.current.addEventListener('message', (e) => {
        if (e.data.type !== 'gpu-failed') return;
        try {
          localStorage.setItem(GPU_FAILED_KEY, '1');
        } catch {}
      });
    }
    return workerRef.current;
  };

  // Start downloading the speech model while the visitor is still choosing options; the transcription reuses it.
  const preload = (size = model) => getWorker().postMessage({ type: 'preload', size, cpuOnly: gpuFailedBefore() });

  const pick = (f) => {
    if (!f || busy) return;
    preload();
    setFile(f);
    audioRef.current = null;
    setResult(null);
    setText('');
    setError('');
    setStage('idle');
  };

  const transcribe = async (f = file) => {
    if (!f || busy) return;
    const file = f;
    const run = ++runRef.current;
    setError('');
    setResult(null);
    setLive('');
    setCopied(false);
    try {
      if (!audioRef.current || audioRef.current.key !== file) {
        setStage('reading');
        setProgress({ value: 2, pct: 0, done: 0, total: 0, decode: '' });
        const decoded = await decodeFile(file, (s, p) => run === runRef.current && setProgress((x) => ({ ...x, value: 2 + Math.round(p * 6), decode: s, pct: Math.round(p * 100) })));
        const data = await toSpeechAudio(decoded, resample);
        audioRef.current = { key: file, data, duration: decoded.duration };
      }
      if (run !== runRef.current) return;
      const { data, duration } = audioRef.current;
      setStage('model');
      setProgress({ value: 10, pct: 0, done: 0, total: 0, decode: '' });

      const worker = getWorker();
      const audio = data.slice();
      const message = await new Promise((resolve, reject) => {
        worker.onerror = (e) => reject(new Error(e.message || 'worker error'));
        worker.onmessage = (e) => {
          const m = e.data;
          // Download progress has no id: it may come from a preload that this run is now waiting for.
          if (m.type !== 'loading' && m.id !== run) return;
          if (m.type === 'loading') setProgress((x) => ({ ...x, value: 10 + Math.round(m.progress * 0.25), pct: Math.round(m.progress), bytes: m.total || x.bytes }));
          else if (m.type === 'engine') setDevice(m.device);
          else if (m.type === 'detecting') setStage('detecting');
          else if (m.type === 'progress') {
            setStage('transcribing');
            setProgress((x) => ({ ...x, done: m.done, total: m.total, value: 38 + Math.round((m.done / m.total) * 60) }));
          } else if (m.type === 'partial') setLive((s) => (s + m.text).slice(-1500));
          else if (m.type === 'done') resolve(m);
          else if (m.type === 'error') reject(new Error(m.message));
        };
        worker.postMessage({ id: run, audio, size: model, language, candidates: SPEECH_LANGUAGES, cpuOnly: gpuFailedBefore() }, [audio.buffer]);
      });
      if (run !== runRef.current) return;
      const segments = cleanSegments(message.chunks, duration);
      const body = segments.length ? toParagraphs(segments) : message.text;
      setResult({ segments, language: message.language, detected: language === 'auto', duration });
      setText(body);
      setView('text');
      setStage(body.trim() ? 'done' : 'error');
      if (!body.trim()) setError(t('transcriber.empty'));
    } catch (e) {
      if (run !== runRef.current) return;
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
      const msg = e && e.message ? e.message : '';
      setError(/could not be read|no sound|larger than 500|could not find any sound/i.test(msg) ? tErr(msg) : friendlyError(msg, t));
      setStage('error');
    }
  };

  // ----- Recording: the take is transcribed as soon as it stops -----
  const startRecording = async () => {
    setError('');
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || !window.MediaRecorder) {
      setError(t('converter.recUnsupported'));
      return;
    }
    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
    } catch (err) {
      setError(err && err.name === 'NotFoundError' ? t('converter.recNoMic') : t('converter.recBlocked'));
      return;
    }
    try {
      const rec = new MediaRecorder(stream);
      const chunks = [];
      rec.ondataavailable = (e) => e.data && e.data.size && chunks.push(e.data);
      rec.onstop = () => {
        stream.getTracks().forEach((tr) => tr.stop());
        clearInterval(timerRef.current);
        setRecState('idle');
        if (!chunks.length) {
          setError(t('converter.recEmpty'));
          return;
        }
        const type = rec.mimeType || chunks[0].type || 'audio/webm';
        const stamp = new Date().toISOString().slice(0, 19).replace(/[T:]/g, '-');
        const ext = type.includes('mp4') ? 'm4a' : type.includes('ogg') ? 'ogg' : 'webm';
        const take = new File(chunks, `recording-${stamp}.${ext}`, { type });
        pick(take);
        transcribe(take);
      };
      recorderRef.current = rec;
      rec.start(1000);
      preload();
      const started = Date.now();
      setRecSeconds(0);
      timerRef.current = setInterval(() => setRecSeconds((Date.now() - started) / 1000), 250);
      setRecState('recording');
    } catch {
      stream.getTracks().forEach((tr) => tr.stop());
      setError(t('converter.recFailed'));
    }
  };

  const stopRecording = () => {
    const rec = recorderRef.current;
    if (rec && rec.state !== 'inactive') rec.stop();
  };

  const cancel = () => {
    runRef.current++;
    if (workerRef.current) {
      workerRef.current.terminate();
      workerRef.current = null;
    }
    setStage('idle');
    setLive('');
  };

  const reset = () => {
    cancel();
    setFile(null);
    setResult(null);
    setText('');
    setError('');
    audioRef.current = null;
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const name = file ? baseName(file.name) : 'transcript';
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
      if (e.dataTransfer.files[0]) pick(e.dataTransfer.files[0]);
    },
  };

  let status = '';
  if (stage === 'reading') status = stageText(progress.decode, progress.pct, t) || t('transcriber.reading');
  if (stage === 'model') status = progress.pct ? t('transcriber.downloading', { pct: progress.pct, size: progress.bytes ? formatBytes(progress.bytes) : SPEECH_MODELS.find((m) => m.value === model).size }) : t('transcriber.loadingModel');
  if (stage === 'detecting') status = t('transcriber.detecting');
  if (stage === 'transcribing') status = t('transcriber.transcribing', { done: Math.min(progress.done + 1, progress.total), total: progress.total });

  return (
    <div className="converter-wrap" id="converter">
      <div className={`converter${dragover ? ' is-dragover' : ''}`} role="region" aria-label={t('transcriber.region')} {...dropProps}>
        <input ref={inputRef} type="file" accept={ACCEPT} hidden onChange={(e) => { pick(e.target.files[0]); e.target.value = ''; }} />

        <div className="mode-tabs" role="tablist" aria-label={t('converter.chooseInput')}>
          <button type="button" role="tab" aria-selected={mode === 'upload'} className="mode-tab" onClick={() => setMode('upload')} disabled={busy || recState === 'recording'}>
            <Icon name="upload" /> {t('converter.upload')}
          </button>
          <button type="button" role="tab" aria-selected={mode === 'record'} className="mode-tab" onClick={() => setMode('record')} disabled={busy}>
            <Icon name="mic" /> {t('converter.record')}
          </button>
        </div>

        {!file && mode === 'record' ? (
          <>
            <div className="converter__icon" aria-hidden="true"><span><Icon name="mic" /></span></div>
            <h2>{t('transcriber.recordHeading')}</h2>
            {recState === 'recording' ? (
              <p className="recorder__time">
                <span className="rec-dot" aria-hidden="true" />
                {formatTime(recSeconds)}
              </p>
            ) : (
              <p className="converter__formats">{t('converter.recordNote')}</p>
            )}
            <div className="converter__actions">
              {recState === 'recording' ? (
                <button type="button" className="btn-grad" onClick={stopRecording}>
                  <Icon name="stop" /> {t('transcriber.stopTranscribe')}
                </button>
              ) : (
                <button type="button" className="btn-grad" onClick={startRecording}>
                  <Icon name="record" /> {t('converter.startRecording')}
                </button>
              )}
            </div>
          </>
        ) : !file ? (
          <>
            <div className="converter__icon" aria-hidden="true"><span><Icon name="fileText" /></span></div>
            <h2>{t('transcriber.heading')}</h2>
            <p className="converter__formats"><Rich text={t('transcriber.works', { formats: 'MP3, WAV, M4A, OGG, FLAC, MP4, MOV, WEBM' })} lang={lang} /></p>
            <div className="converter__actions">
              <button type="button" className="btn-grad" onClick={() => inputRef.current.click()}>
                <Icon name="upload" /> {t('transcriber.chooseFile')}
              </button>
            </div>
            <p className="drop-hint">{t('transcriber.dropHint')}</p>
          </>
        ) : (
          <div className="editor__head">
            <div style={{ minWidth: 0 }}>
              <div className="q-name" title={file.name}>{file.name}</div>
              <div className="q-meta">
                {audioRef.current ? t('transcriber.fileInfo', { time: formatTime(audioRef.current.duration), size: formatBytes(file.size) }) : formatBytes(file.size)}
              </div>
            </div>
            <button type="button" className="btn-link" onClick={reset} disabled={busy}>{mode === 'record' ? t('transcriber.newRecording') : t('transcriber.another')}</button>
          </div>
        )}

        <div className="converter__options">
          <label className="opt">
            {t('transcriber.language')}
            <span className="select-wrap">
              <Icon name="globe" />
              <select value={language} onChange={(e) => setLanguage(e.target.value)} disabled={busy || recState === 'recording'}>
                <option value="auto">{t('transcriber.auto')}</option>
                {names.list.map((l) => <option key={l.code} value={l.code}>{l.name}</option>)}
              </select>
            </span>
          </label>
          <span className="opt-divider" aria-hidden="true" />
          <label className="opt">
            {t('transcriber.model')}
            <span className="select-wrap">
              <Icon name="sliders" />
              <select
                value={model}
                onChange={(e) => {
                  setModel(e.target.value);
                  if (file) preload(e.target.value);
                }}
                disabled={busy || recState === 'recording'}
              >
                {SPEECH_MODELS.map((m) => <option key={m.value} value={m.value}>{t(`transcriber.models.${m.value}`, { size: m.size })}</option>)}
              </select>
            </span>
          </label>
        </div>
        <p className="transcript-hint"><Rich text={t('transcriber.modelHint')} lang={lang} /></p>

        {file && (
          <div className="converter__actions" style={{ marginTop: 14 }}>
            {busy ? (
              <button type="button" className="btn-outline" onClick={cancel}>
                <Icon name="x" /> {t('transcriber.cancel')}
              </button>
            ) : (
              <button type="button" className="btn-grad" onClick={() => transcribe()}>
                <Icon name="fileText" /> {result ? t('transcriber.again') : t('transcriber.start')}
              </button>
            )}
          </div>
        )}

        {busy && (
          <div className="tool-status" aria-live="polite">
            <p className="q-meta">{status}</p>
            <ProgressBar value={Math.min(100, progress.value)} label={t('transcriber.progressLabel')} />
            {stage === 'model' && <p className="transcript-hint">{t('transcriber.firstTime')}</p>}
            {device === 'webgpu' && stage !== 'model' && <p className="transcript-hint transcript-gpu"><Icon name="zap" /> {t('transcriber.gpu')}</p>}
            {live && (
              <div className="transcript-live">
                <span className="eyebrow">{t('transcriber.livePreview')}</span>
                <p dir="auto">{live.length > 320 ? `…${live.slice(-320)}` : live}</p>
              </div>
            )}
          </div>
        )}
        {error && !busy && <p className="q-meta is-error" role="alert">{error}</p>}

        {result && stage === 'done' && (
          <div className="transcript" aria-live="polite">
            <div className="transcript__head">
              <p className="q-meta">
                <Rich text={t(result.detected ? 'transcriber.detected' : 'transcriber.chosen', { name: names.name(result.language) })} lang={lang} />
                {' · '}{t('transcriber.words', { count: countWords(text) })}
              </p>
              <div className="seg-control" role="group" aria-label={t('transcriber.viewLabel')}>
                <button type="button" aria-pressed={view === 'text'} onClick={() => setView('text')}>{t('transcriber.viewText')}</button>
                <button type="button" aria-pressed={view === 'times'} onClick={() => setView('times')}>{t('transcriber.viewTimes')}</button>
              </div>
            </div>
            {result.detected && <p className="transcript-hint">{t('transcriber.wrongLanguage')}</p>}

            {view === 'text' ? (
              <textarea
                className="transcript__text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                aria-label={t('transcriber.transcriptLabel')}
                dir="auto"
                rows={12}
              />
            ) : (
              <ol className="transcript__segs" dir="auto">
                {result.segments.map((s, i) => (
                  <li key={i}>
                    <time>{clock(s.start)}</time>
                    <span>{s.text}</span>
                  </li>
                ))}
              </ol>
            )}
            {view === 'text' && <p className="transcript-hint">{t('transcriber.editHint')}</p>}

            <div className="transcript__actions">
              <button type="button" className="btn-grad btn-sm" onClick={copy}>
                <Icon name={copied ? 'check' : 'copy'} /> {copied ? t('transcriber.copied') : t('transcriber.copy')}
              </button>
              <span className="transcript__dl-label">{t('transcriber.downloadAs')}</span>
              <button type="button" className="btn-outline btn-sm" onClick={() => saveText(text, `${name}.txt`, 'text/plain')}>
                <Icon name="download" /> TXT
              </button>
              <button type="button" className="btn-outline btn-sm" onClick={() => saveText(toSrt(result.segments), `${name}.srt`, 'application/x-subrip')} disabled={!result.segments.length}>
                <Icon name="download" /> SRT
              </button>
              <button type="button" className="btn-outline btn-sm" onClick={() => saveText(toVtt(result.segments), `${name}.vtt`, 'text/vtt')} disabled={!result.segments.length}>
                <Icon name="download" /> VTT
              </button>
            </div>
          </div>
        )}
        <PrivacyNote />
      </div>
    </div>
  );
}
