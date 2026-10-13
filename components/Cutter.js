'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Icon from './Icon';
import { BitrateSelect, PrivacyNote, ProgressBar, Toggle, overallProgress, stageText } from './tool-ui';
import {
  ACCEPT,
  applyFades,
  baseName,
  concatClips,
  decodeFile,
  encodeMp3,
  formatBytes,
  formatTime,
  sliceSeconds,
  toMono,
  waveformPeaks,
} from '@/lib/audio-engine';

const MIN_LEN = 0.1;

export default function Cutter() {
  const [file, setFile] = useState(null);
  const [decoded, setDecoded] = useState(null);
  const [stage, setStage] = useState('idle'); // idle | loading | ready | encoding | error
  const [progress, setProgress] = useState({ stage: '', value: 0, pct: 0 });
  const [error, setError] = useState('');
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [keep, setKeep] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [bitrate, setBitrate] = useState(192);
  const [mono, setMono] = useState(false);
  const [result, setResult] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [playhead, setPlayhead] = useState(null);
  const [dragover, setDragover] = useState(false);

  const inputRef = useRef(null);
  const canvasRef = useRef(null);
  const waveRef = useRef(null);
  const peaksRef = useRef(null);
  const dragRef = useRef(null);
  const playRef = useRef(null);

  const duration = decoded ? decoded.duration : 0;

  // ----- loading -----
  const load = useCallback(async (f) => {
    if (!f) return;
    stopPlayback();
    setResult((r) => {
      if (r) URL.revokeObjectURL(r.url);
      return null;
    });
    setFile(f);
    setDecoded(null);
    setError('');
    setStage('loading');
    try {
      const d = await decodeFile(f, (s, p) => setProgress({ stage: s, value: overallProgress(s, p) * 2.5, pct: Math.round(p * 100) }));
      peaksRef.current = waveformPeaks(d.channels, 800);
      setDecoded(d);
      setStart(0);
      setEnd(d.duration);
      setStage('ready');
    } catch (err) {
      setError(err.message);
      setStage('error');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ----- waveform drawing -----
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const peaks = peaksRef.current;
    if (!canvas || !peaks || !duration) return;
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);
    const bars = Math.max(40, Math.floor(w / 3));
    const a = start / duration;
    const b = end / duration;
    for (let i = 0; i < bars; i++) {
      const pos = i / bars;
      const peak = peaks[Math.floor(pos * peaks.length)] || 0;
      const bh = Math.max(2, peak * (h - 12));
      const inSel = pos >= a && pos <= b;
      const active = keep ? inSel : !inSel;
      ctx.fillStyle = active ? '#8b5cf6' : '#d6d3e6';
      ctx.fillRect(i * 3, (h - bh) / 2, 2, bh);
    }
  }, [duration, start, end, keep]);

  useEffect(() => {
    draw();
    const onResize = () => draw();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [draw]);

  // ----- dragging the handles -----
  const timeFromEvent = (e) => {
    const rect = waveRef.current.getBoundingClientRect();
    const x = Math.min(Math.max(0, e.clientX - rect.left), rect.width);
    return (x / rect.width) * duration;
  };

  const setStartSafe = (t) => setStart(Math.max(0, Math.min(t, end - MIN_LEN)));
  const setEndSafe = (t) => setEnd(Math.min(duration, Math.max(t, start + MIN_LEN)));

  const onPointerDown = (e) => {
    if (!duration) return;
    const t = timeFromEvent(e);
    const which = e.target.dataset.handle || (Math.abs(t - start) < Math.abs(t - end) ? 'start' : 'end');
    dragRef.current = which;
    e.currentTarget.setPointerCapture(e.pointerId);
    which === 'start' ? setStartSafe(t) : setEndSafe(t);
  };
  const onPointerMove = (e) => {
    if (!dragRef.current) return;
    const t = timeFromEvent(e);
    dragRef.current === 'start' ? setStartSafe(t) : setEndSafe(t);
  };
  const onPointerUp = () => {
    dragRef.current = null;
  };

  const nudge = (which, delta) => (which === 'start' ? setStartSafe(start + delta) : setEndSafe(end + delta));
  const onHandleKey = (which) => (e) => {
    const step = e.shiftKey ? 1 : 0.1;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      nudge(which, -step);
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      nudge(which, step);
    }
  };

  // ----- preview playback -----
  function stopPlayback() {
    const p = playRef.current;
    if (p) {
      try {
        p.source.stop();
      } catch {}
      cancelAnimationFrame(p.raf);
      p.ctx.close().catch(() => {});
      playRef.current = null;
    }
    setPlaying(false);
    setPlayhead(null);
  }

  const play = () => {
    if (!decoded) return;
    stopPlayback();
    const Ctx = window.AudioContext || window.webkitAudioContext;
    const ctx = new Ctx();
    const segment = keep ? sliceSeconds(decoded, start, end) : concatClips([
      { channels: sliceSeconds(decoded, 0, start) },
      { channels: sliceSeconds(decoded, end, duration) },
    ]);
    const len = segment[0].length;
    if (!len) return;
    applyFades(segment, decoded.sampleRate, fadeIn ? Math.min(3, len / decoded.sampleRate / 3) : 0, fadeOut ? Math.min(3, len / decoded.sampleRate / 3) : 0);
    const buffer = ctx.createBuffer(segment.length, len, decoded.sampleRate);
    segment.forEach((c, i) => buffer.copyToChannel(c, i));
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);
    const t0 = ctx.currentTime;
    source.start();
    source.onended = () => stopPlayback();
    const tick = () => {
      const elapsed = ctx.currentTime - t0;
      let pos;
      if (keep) pos = start + elapsed;
      else pos = elapsed < start ? elapsed : elapsed + (end - start);
      setPlayhead(Math.min(pos, duration));
      if (playRef.current) playRef.current.raf = requestAnimationFrame(tick);
    };
    playRef.current = { ctx, source, raf: 0 };
    playRef.current.raf = requestAnimationFrame(tick);
    setPlaying(true);
  };

  useEffect(() => () => stopPlayback(), []);

  // ----- export -----
  const exportMp3 = async () => {
    if (!decoded) return;
    stopPlayback();
    setStage('encoding');
    setProgress({ stage: 'encoding', value: 0, pct: 0 });
    try {
      let channels = keep
        ? sliceSeconds(decoded, start, end)
        : concatClips([{ channels: sliceSeconds(decoded, 0, start) }, { channels: sliceSeconds(decoded, end, duration) }]);
      const secs = channels[0].length / decoded.sampleRate;
      if (secs < MIN_LEN) throw new Error('The selected part is too short.');
      applyFades(channels, decoded.sampleRate, fadeIn ? Math.min(3, secs / 3) : 0, fadeOut ? Math.min(3, secs / 3) : 0);
      if (mono) channels = toMono(channels);
      const blob = await encodeMp3(channels, decoded.sampleRate, bitrate, (p) => setProgress({ stage: 'encoding', value: p, pct: p }));
      setResult((r) => {
        if (r) URL.revokeObjectURL(r.url);
        return { url: URL.createObjectURL(blob), size: blob.size, secs, kbps: bitrate, name: `${baseName(file.name)}-cut.mp3` };
      });
      setStage('ready');
    } catch (err) {
      setError(err.message || 'Could not create the MP3.');
      setStage('ready');
    }
  };

  const reset = () => {
    stopPlayback();
    if (result) URL.revokeObjectURL(result.url);
    setResult(null);
    setFile(null);
    setDecoded(null);
    setStage('idle');
    setError('');
    peaksRef.current = null;
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
      if (e.dataTransfer.files[0]) load(e.dataTransfer.files[0]);
    },
  };

  const outLen = keep ? end - start : duration - (end - start);
  const pct = (t) => `${duration ? (t / duration) * 100 : 0}%`;

  return (
    <div className="converter-wrap" id="converter">
      <div className={`converter${dragover ? ' is-dragover' : ''}`} role="region" aria-label="MP3 cutter" {...dropProps}>
        <input ref={inputRef} type="file" accept={ACCEPT} hidden onChange={(e) => { load(e.target.files[0]); e.target.value = ''; }} />

        {(stage === 'idle' || stage === 'error' || stage === 'loading') && !decoded && (
          <>
            <div className="converter__icon" aria-hidden="true"><span><Icon name="scissors" /></span></div>
            <h2>Upload an audio or video file to cut.</h2>
            <p className="converter__formats">Works with <strong>MP3, WAV, M4A, FLAC, OGG, MP4, MOV, WEBM</strong> and more, up to 500 MB</p>
            {stage === 'loading' ? (
              <div className="tool-status" aria-live="polite">
                <p className="q-meta">{file && file.name} — {stageText(progress.stage, progress.pct) || 'Reading audio…'}</p>
                <ProgressBar value={Math.min(100, progress.value)} label="Loading audio" />
              </div>
            ) : (
              <div className="converter__actions">
                <button type="button" className="btn-grad" onClick={() => inputRef.current.click()}>
                  <Icon name="upload" /> Choose File
                </button>
              </div>
            )}
            {stage !== 'loading' && <p className="drop-hint">or drag and drop a file here</p>}
            {error && <p className="q-meta is-error" role="alert">{error}</p>}
          </>
        )}

        {decoded && (
          <div className="editor">
            <div className="editor__head">
              <div style={{ minWidth: 0 }}>
                <div className="q-name" title={file.name}>{file.name}</div>
                <div className="q-meta">Length {formatTime(duration, true)} · {formatBytes(file.size)}</div>
              </div>
              <button type="button" className="btn-link" onClick={reset}>Choose another file</button>
            </div>

            <div
              className="wave"
              ref={waveRef}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
            >
              <canvas ref={canvasRef} className="wave__canvas" aria-hidden="true" />
              <div className={`wave__sel${keep ? '' : ' is-remove'}`} style={{ left: pct(start), width: `calc(${pct(end)} - ${pct(start)})` }} />
              <div
                className="wave__handle"
                data-handle="start"
                style={{ left: pct(start) }}
                role="slider"
                tabIndex={0}
                aria-label="Start of selection"
                aria-valuemin={0}
                aria-valuemax={Number(duration.toFixed(1))}
                aria-valuenow={Number(start.toFixed(1))}
                aria-valuetext={formatTime(start, true)}
                onKeyDown={onHandleKey('start')}
              />
              <div
                className="wave__handle"
                data-handle="end"
                style={{ left: pct(end) }}
                role="slider"
                tabIndex={0}
                aria-label="End of selection"
                aria-valuemin={0}
                aria-valuemax={Number(duration.toFixed(1))}
                aria-valuenow={Number(end.toFixed(1))}
                aria-valuetext={formatTime(end, true)}
                onKeyDown={onHandleKey('end')}
              />
              {playhead != null && <div className="wave__playhead" style={{ left: pct(playhead) }} />}
            </div>

            <div className="editor__times">
              <label className="time-field">
                Start
                <input type="number" min={0} max={duration} step={0.1} value={Number(start.toFixed(1))} onChange={(e) => setStartSafe(Number(e.target.value) || 0)} />
                <span>{formatTime(start, true)}</span>
              </label>
              <label className="time-field">
                End
                <input type="number" min={0} max={duration} step={0.1} value={Number(end.toFixed(1))} onChange={(e) => setEndSafe(Number(e.target.value) || 0)} />
                <span>{formatTime(end, true)}</span>
              </label>
              <div className="seg-control" role="group" aria-label="What to do with the selection">
                <button type="button" aria-pressed={keep} onClick={() => setKeep(true)}>Keep selection</button>
                <button type="button" aria-pressed={!keep} onClick={() => setKeep(false)}>Remove selection</button>
              </div>
            </div>

            <div className="converter__options">
              <Toggle label="Fade in:" checked={fadeIn} onChange={setFadeIn} />
              <span className="opt-divider" aria-hidden="true" />
              <Toggle label="Fade out:" checked={fadeOut} onChange={setFadeOut} />
              <span className="opt-divider" aria-hidden="true" />
              <BitrateSelect value={bitrate} onChange={setBitrate} />
              <span className="opt-divider" aria-hidden="true" />
              <Toggle label="Mono:" checked={mono} onChange={setMono} />
            </div>

            <div className="converter__actions" style={{ marginTop: 18 }}>
              <button type="button" className="btn-outline" onClick={playing ? stopPlayback : play} disabled={stage === 'encoding'}>
                <Icon name={playing ? 'stop' : 'play'} /> {playing ? 'Stop' : 'Preview'}
              </button>
              <button type="button" className="btn-grad" onClick={exportMp3} disabled={stage === 'encoding'}>
                <Icon name="scissors" /> Cut &amp; Save MP3 ({formatTime(outLen, true)})
              </button>
            </div>

            {stage === 'encoding' && (
              <div className="tool-status" aria-live="polite">
                <p className="q-meta">Encoding MP3… {progress.pct}%</p>
                <ProgressBar value={progress.value} label="Encoding MP3" />
              </div>
            )}
            {error && stage !== 'encoding' && <p className="q-meta is-error" role="alert">{error}</p>}

            {result && stage !== 'encoding' && (
              <div className="result-card" aria-live="polite">
                <span className="q-badge" aria-hidden="true">mp3</span>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div className="q-name">{result.name}</div>
                  <div className="q-meta">{formatTime(result.secs, true)} · {formatBytes(result.size)} · {result.kbps} kbps</div>
                  <audio className="q-audio" controls src={result.url} />
                </div>
                <a className="q-dl" href={result.url} download={result.name}>
                  <Icon name="download" className="icon icon-sm" /> Download
                </a>
              </div>
            )}
          </div>
        )}
        <PrivacyNote />
      </div>
    </div>
  );
}
