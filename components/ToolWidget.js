'use client';

import Converter from './Converter';
import Cutter from './Cutter';
import FormatConverter from './FormatConverter';
import Icon from './Icon';
import { useI18n } from './I18nProvider';
import Rich from './Rich';
import Joiner from './Joiner';
import LinkDownloader from './LinkDownloader';
import Transcriber from './Transcriber';
import { COMPRESS_BITRATES, STANDARD_BITRATES } from './tool-ui';

function ComingSoon({ tool }) {
  const { t, lang } = useI18n();
  return (
    <div className="converter-wrap" id="converter">
      <div className="converter soon-card" role="region" aria-label={t('soon.region', { name: tool.name })}>
        <div className="converter__icon" aria-hidden="true"><span><Icon name="music" /></span></div>
        <h2>
          {tool.heading} <span className="soon-badge">{t('soon.badge')}</span>
        </h2>
        <p className="converter__formats">{tool.formats}</p>
        <div className="link-box">
          <div className="link-input" aria-disabled="true">
            <Icon name="link" />
            <input type="url" placeholder={tool.placeholder} disabled aria-label={t('soon.linkLabel')} />
          </div>
          <div className="converter__actions" style={{ marginTop: 16 }}>
            <button type="button" className="btn-grad" disabled>
              <Icon name="zap" /> {t('soon.button')}
            </button>
          </div>
          <p className="link-legal">
            <Rich text={t('soon.note')} lang={lang} />
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ToolWidget({ kind, tool = {} }) {
  const { t } = useI18n();
  if (kind === 'cut') return <Cutter />;
  if (kind === 'join') return <Joiner />;
  if (kind === 'transcribe') return <Transcriber />;
  if (kind === 'soon') return <ComingSoon tool={tool} />;
  if (kind === 'link') {
    return (
      <div className="converter-wrap" id="converter">
        <div className="converter" role="region" aria-label={t('link.regionLabel')}>
          <div className="converter__icon" aria-hidden="true"><span><Icon name="link" /></span></div>
          <h2>{tool.heading}</h2>
          <p className="converter__formats">{tool.formats}</p>
          <LinkDownloader
            formats={tool.linkFormats}
            sites={tool.sites}
            advanced={tool.advanced}
            defaultType={tool.defaultType}
            placeholder={tool.placeholder}
          />
        </div>
      </div>
    );
  }
  const { bitrates, reverse, ...rest } = tool;
  const converterProps = { ...rest, bitrates: bitrates === 'compress' ? COMPRESS_BITRATES : STANDARD_BITRATES };
  if (reverse) return <FormatConverter reverse={reverse} converterProps={converterProps} />;
  return <Converter {...converterProps} />;
}
