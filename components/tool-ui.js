'use client';

import Icon from './Icon';

export const STANDARD_BITRATES = [
  { value: 128, label: '128 kbps (small)' },
  { value: 192, label: '192 kbps (standard)' },
  { value: 256, label: '256 kbps (high)' },
  { value: 320, label: '320 kbps (best)' },
];

export const COMPRESS_BITRATES = [
  { value: 32, label: '32 kbps (smallest, voice only)' },
  { value: 64, label: '64 kbps (voice, podcasts)' },
  { value: 96, label: '96 kbps (good balance)' },
  { value: 128, label: '128 kbps (music, small)' },
  { value: 160, label: '160 kbps (music, better)' },
];

export function BitrateSelect({ value, onChange, options = STANDARD_BITRATES, label = 'MP3 Quality:' }) {
  return (
    <label className="opt">
      {label}
      <span className="select-wrap">
        <Icon name="sliders" />
        <select value={value} onChange={(e) => onChange(Number(e.target.value))}>
          {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </span>
    </label>
  );
}

export function Toggle({ label, checked, onChange }) {
  return (
    <label className="opt">
      {label}
      <span className="switch">
        <input type="checkbox" role="switch" checked={checked} onChange={(e) => onChange(e.target.checked)} />
        <span />
      </span>
    </label>
  );
}

export function PrivacyNote() {
  return (
    <p className="privacy-note">
      <Icon name="lock" /> Files are processed inside your browser and are never uploaded to a server.
    </p>
  );
}

export function ProgressBar({ value, label }) {
  return (
    <div className="q-bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(value)} aria-label={label}>
      <span style={{ width: `${value}%` }} />
    </div>
  );
}

export function stageText(stage, pct) {
  switch (stage) {
    case 'queued':
      return 'Waiting…';
    case 'decoding':
      return 'Reading audio…';
    case 'ffmpeg-loading':
      return 'Loading the advanced decoder for this format (first time only)…';
    case 'ffmpeg-decoding':
      return `Extracting audio… ${pct}%`;
    case 'encoding':
      return `Encoding MP3… ${pct}%`;
    default:
      return '';
  }
}

/** Maps a decode/encode stage + local progress (0-1 or 0-100) onto one 0-100 bar. */
export function overallProgress(stage, p = 0) {
  switch (stage) {
    case 'decoding':
      return 8;
    case 'ffmpeg-loading':
      return 12;
    case 'ffmpeg-decoding':
      return 15 + Math.round(p * 25);
    case 'encoding':
      return 40 + Math.round(p * 0.6);
    default:
      return 0;
  }
}
