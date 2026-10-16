'use client';

import Icon from './Icon';
import { useI18n } from './I18nProvider';

// Labels come from the dictionary (bitrates.<key>).
export const STANDARD_BITRATES = [
  { value: 128, key: 'small' },
  { value: 192, key: 'standard' },
  { value: 256, key: 'high' },
  { value: 320, key: 'best' },
];

export const COMPRESS_BITRATES = [
  { value: 32, key: 'smallestVoice' },
  { value: 64, key: 'voice' },
  { value: 96, key: 'balance' },
  { value: 128, key: 'musicSmall' },
  { value: 160, key: 'musicBetter' },
];

export function BitrateSelect({ value, onChange, options = STANDARD_BITRATES, label }) {
  const { t } = useI18n();
  return (
    <label className="opt">
      {label || t('converter.quality')}
      <span className="select-wrap">
        <Icon name="sliders" />
        <select value={value} onChange={(e) => onChange(Number(e.target.value))}>
          {options.map((o) => (
            <option key={o.value} value={o.value}>{t(`bitrates.${o.key}`, { kbps: o.value })}</option>
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
  const { t } = useI18n();
  return (
    <p className="privacy-note">
      <Icon name="lock" /> {t('converter.privacy')}
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

/** Progress text for a decode/encode stage; `t` is the translate function from useI18n(). */
export function stageText(stage, pct, t) {
  switch (stage) {
    case 'queued':
      return t('stage.queued');
    case 'decoding':
      return t('stage.decoding');
    case 'ffmpeg-loading':
      return t('stage.ffmpegLoading');
    case 'ffmpeg-decoding':
      return t('stage.ffmpegDecoding', { pct });
    case 'encoding':
      return t('stage.encoding', { pct });
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
