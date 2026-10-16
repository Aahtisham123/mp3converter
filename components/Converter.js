'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Icon from './Icon';
import { useI18n } from './I18nProvider';
import Rich from './Rich';
import LinkDownloader from './LinkDownloader';
import { BitrateSelect, PrivacyNote, ProgressBar, STANDARD_BITRATES, Toggle, overallProgress, stageText } from './tool-ui';
import { ACCEPT, MAX_BYTES, baseName, decodeFile, encodeMp3, extOf, formatBytes, formatTime, toMono } from '@/lib/audio-engine';

const DEFAULT_FORMATS = 'WAV, M4A, AAC, FLAC, OGG, OPUS, WMA, MP4, MOV, WEBM, MKV, AVI';

export default function Converter({
  heading,
  formats = DEFAULT_FORMATS,
  defaultBitrate = 192,
  bitrates = STANDARD_BITRATES,
  defaultMono = false,
  initialMode = 'upload',
  showRecord = true,
  showLink = false,
  linkProps = {},
  compress = false,
  buttonLabel,
}) {
  const { t, err: tErr, lang } = useI18n();
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
        if (alive()) patch(id, { stage: 'error', error: tErr(err && err.message) || t('converter.failed') });
      }
    },
    [patch, t, tErr],
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
          error: tooBig ? t('converter.tooBig') : '',
        };
      });
      setItems((list) => [...next, ...list]);
    },
    [convert, t],
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
      setRecError(t('converter.recUnsupported'));
      return;
    }
    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
    } catch (err) {
      setRecError(
        err && err.name === 'NotFoundError'
          ? t('converter.recNoMic')
          : t('converter.recBlocked'),
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
          setRecError(t('converter.recEmpty'));
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
      setRecError(t('converter.recFailed'));
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
      const saved = it.size > it.outSize ? ` · ${t('converter.smaller', { pct: Math.round((1 - it.outSize / it.size) * 100) })}` : '';
      return `${formatBytes(it.size)} → ${formatBytes(it.outSize)} · ${it.kbps} kbps · ${formatTime(it.duration)}${compress ? saved : ''}`;
    }
    return stageText(it.stage, it.pct, t);
  };

  const hasTabs = showRecord || showLink;
  const doneCount = items.filter((it) => it.stage === 'done').length;
  const busy = items.some((it) => !['done', 'error'].includes(it.stage));

  return (
    <div className="converter-wrap" id="converter">
      {hasTabs && (
        <div className="mode-tabs" role="tablist" aria-label={t('converter.chooseInput')}>
          <button type="button" role="tab" id="tab-upload" aria-controls="panel-converter" aria-selected={mode === 'upload'} className="mode-tab" onClick={() => setMode('upload')} disabled={recState === 'recording'}>
            <Icon name="music" /> {t('converter.upload')}
          </button>
          {showLink && (
            <button type="button" role="tab" id="tab-link" aria-controls="panel-converter" aria-selected={mode === 'link'} className="mode-tab" onClick={() => setMode('link')} disabled={recState === 'recording'}>
              <Icon name="link" /> {t('converter.pasteLink')}
            </button>
          )}
          {showRecord && (
            <button type="button" role="tab" id="tab-record" aria-controls="panel-converter" aria-selected={mode === 'record'} className="mode-tab" onClick={() => setMode('record')}>
              <Icon name="mic" /> {t('converter.record')}
            </button>
          )}
        </div>
      )}

      <div
        id="panel-converter"
        role={hasTabs ? 'tabpanel' : 'region'}
        aria-labelledby={hasTabs ? `tab-${mode}` : undefined}
        aria-label={hasTabs ? undefined : t('converter.regionLabel')}
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
                    {!['done', 'error'].includes(it.stage) && <ProgressBar value={it.progress} label={t('converter.converting', { name: it.name })} />}
                    {it.stage === 'done' && <audio className="q-audio" controls preload="none" src={it.url} />}
                  </div>
                  <div className="q-actions">
                    {it.stage === 'done' && (
                      <a className="q-dl" href={it.url} download={`${baseName(it.name)}.mp3`}>
                        <Icon name="download" className="icon icon-sm" /> {t('converter.download')}
                      </a>
                    )}
                    <button type="button" className="q-remove" onClick={() => removeItem(it.id)} aria-label={t('converter.remove', { name: it.name })} title={busy && !['done', 'error'].includes(it.stage) ? t('converter.cancel') : t('converter.removeShort')}>
                      <Icon name="x" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="queue-bar">
              {doneCount > 1 && (
                <button type="button" className="btn-outline btn-sm" onClick={downloadAll}>
                  <Icon name="download" className="icon icon-sm" /> {t('converter.downloadAll', { count: doneCount })}
                </button>
              )}
              {!busy && (
                <button type="button" className="btn-link" onClick={clearDone}>
                  {t('converter.clearList')}
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
            <h2>{linkProps.heading || t('converter.linkHeading')}</h2>
            <p className="converter__formats">
              {linkProps.subheading || t('converter.linkSub')}
            </p>
            <LinkDownloader formats={['mp3']} sites="other" {...linkProps} />
          </>
        ) : mode === 'upload' ? (
          <>
            <h2>{heading || t('converter.heading')}</h2>
            <p className="converter__formats">
              <Rich text={t('converter.supported', { formats })} lang={lang} />
            </p>
            <div className="converter__actions">
              <button type="button" className="btn-grad" onClick={() => inputRef.current && inputRef.current.click()}>
                <Icon name="upload" /> {buttonLabel || t('converter.chooseFiles')}
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
            <p className="drop-hint">{t('converter.dropHint')}</p>
          </>
        ) : (
          <>
            <h2>{t('converter.recordHeading')}</h2>
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
                  <Icon name="stop" /> {t('converter.stopConvert')}
                </button>
              ) : (
                <button type="button" className="btn-grad" onClick={startRecording}>
                  <Icon name="record" /> {t('converter.startRecording')}
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
              <Toggle label={t('converter.mono')} checked={mono} onChange={setMono} />
            </div>
            <PrivacyNote />
          </>
        )}
      </div>
    </div>
  );
}
