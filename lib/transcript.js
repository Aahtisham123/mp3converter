// Helpers for the audio-to-text tool: model options, spoken languages and transcript export (TXT, SRT, VTT).

export const SPEECH_RATE = 16000;

/** Whisper models (q8). Sizes are the download the browser caches on first use. */
export const SPEECH_MODELS = [
  { value: 'tiny', size: '41 MB' },
  { value: 'base', size: '77 MB' },
  { value: 'small', size: '249 MB' },
];
export const DEFAULT_SPEECH_MODEL = 'base';

// The site's own languages first, then other widely spoken ones. All are Whisper language codes.
export const SPEECH_LANGUAGES = [
  'en', 'es', 'pt', 'fr', 'de', 'ru', 'tr', 'ar', 'hi', 'id',
  'it', 'nl', 'pl', 'uk', 'ro', 'el', 'cs', 'sv', 'he', 'fa', 'ur', 'bn', 'ta', 'ms', 'tl', 'vi', 'th', 'ja', 'ko', 'zh',
];

/** Language names in the reader's language, e.g. "Spanish" on the English page and "Español" on /es. */
export function languageNames(uiLang) {
  let names = null;
  try {
    names = new Intl.DisplayNames([uiLang, 'en'], { type: 'language' });
  } catch {}
  const name = (code) => {
    const n = names && names.of(code);
    return n ? n.charAt(0).toLocaleUpperCase(uiLang) + n.slice(1) : code.toUpperCase();
  };
  const [own, other] = [SPEECH_LANGUAGES.slice(0, 10), SPEECH_LANGUAGES.slice(10)];
  const sorted = [...own.map((c) => ({ code: c, name: name(c) })).sort((a, b) => a.name.localeCompare(b.name, uiLang)),
    ...other.map((c) => ({ code: c, name: name(c) })).sort((a, b) => a.name.localeCompare(b.name, uiLang))];
  return { list: sorted, name };
}

/** Fills missing end times (the last segment of a window can come back open). */
export function cleanSegments(chunks, duration) {
  return chunks
    .map((c, i) => {
      const start = Number.isFinite(c.start) ? c.start : 0;
      const next = chunks[i + 1];
      let end = Number.isFinite(c.end) ? c.end : next && Number.isFinite(next.start) ? next.start : duration;
      if (!(end > start)) end = Math.min(duration, start + 2);
      return { start, end, text: c.text.trim() };
    })
    .filter((c) => c.text);
}

/** Joins segments into readable paragraphs: a new one after a pause of 2 s or after ~600 characters at a sentence end. */
export function toParagraphs(segments) {
  const paras = [];
  let cur = '';
  let lastEnd = 0;
  for (const s of segments) {
    const pause = s.start - lastEnd;
    if (cur && (pause >= 2 || (cur.length > 600 && /[.!?。？！]$/.test(cur)))) {
      paras.push(cur);
      cur = '';
    }
    cur = cur ? `${cur} ${s.text}` : s.text;
    lastEnd = s.end;
  }
  if (cur) paras.push(cur);
  return paras.join('\n\n');
}

function stamp(sec, sep) {
  const ms = Math.max(0, Math.round(sec * 1000));
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  const pad = (n, l = 2) => String(n).padStart(l, '0');
  return `${pad(h)}:${pad(m)}:${pad(s)}${sep}${pad(ms % 1000, 3)}`;
}

export function toSrt(segments) {
  return segments.map((s, i) => `${i + 1}\n${stamp(s.start, ',')} --> ${stamp(s.end, ',')}\n${s.text}\n`).join('\n');
}

export function toVtt(segments) {
  return `WEBVTT\n\n${segments.map((s) => `${stamp(s.start, '.')} --> ${stamp(s.end, '.')}\n${s.text}\n`).join('\n')}`;
}

/** Short clock for the on-page timestamp list: 1:05 or 1:02:05. */
export function clock(sec) {
  const t = Math.floor(sec);
  const h = Math.floor(t / 3600);
  const m = Math.floor((t % 3600) / 60);
  const s = String(t % 60).padStart(2, '0');
  return h ? `${h}:${String(m).padStart(2, '0')}:${s}` : `${m}:${s}`;
}

export function countWords(text) {
  const m = text.trim().match(/\S+/g);
  return m ? m.length : 0;
}

/** Downmixes and resamples decoded audio to 16 kHz mono with the browser's resampler (falls back to linear). */
export async function toSpeechAudio(decoded, fallbackResample) {
  const { channels, sampleRate } = decoded;
  const Offline = typeof window !== 'undefined' && (window.OfflineAudioContext || window.webkitOfflineAudioContext);
  if (Offline) {
    try {
      const length = Math.ceil((channels[0].length * SPEECH_RATE) / sampleRate);
      const ctx = new Offline(1, length, SPEECH_RATE);
      const buf = ctx.createBuffer(channels.length, channels[0].length, sampleRate);
      channels.forEach((c, i) => buf.copyToChannel(c, i));
      const src = ctx.createBufferSource();
      src.buffer = buf;
      src.connect(ctx.destination);
      src.start();
      const out = await ctx.startRendering();
      return out.getChannelData(0);
    } catch {}
  }
  const mono = channels.length > 1 ? channels[0].map((v, i) => (v + channels[1][i]) / 2) : channels[0];
  return fallbackResample(mono, sampleRate, SPEECH_RATE);
}
