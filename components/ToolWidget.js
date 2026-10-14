'use client';

import Converter from './Converter';
import Cutter from './Cutter';
import Icon from './Icon';
import Joiner from './Joiner';
import LinkDownloader from './LinkDownloader';
import { COMPRESS_BITRATES, STANDARD_BITRATES } from './tool-ui';

function ComingSoon({ tool }) {
  return (
    <div className="converter-wrap" id="converter">
      <div className="converter soon-card" role="region" aria-label={`${tool.name} (coming soon)`}>
        <div className="converter__icon" aria-hidden="true"><span><Icon name="music" /></span></div>
        <h2>
          {tool.heading} <span className="soon-badge">Coming soon</span>
        </h2>
        <p className="converter__formats">{tool.formats}</p>
        <div className="link-box">
          <div className="link-input" aria-disabled="true">
            <Icon name="link" />
            <input type="url" placeholder={tool.placeholder} disabled aria-label="Link (coming soon)" />
          </div>
          <div className="converter__actions" style={{ marginTop: 16 }}>
            <button type="button" className="btn-grad" disabled>
              <Icon name="zap" /> Convert to MP3 (coming soon)
            </button>
          </div>
          <p className="link-legal">
            We are still testing this tool. Meanwhile, if you saved a video file on your device, convert it with{' '}
            <a href="/mp4-to-mp3">MP4 to MP3</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ToolWidget({ kind, tool = {} }) {
  if (kind === 'cut') return <Cutter />;
  if (kind === 'join') return <Joiner />;
  if (kind === 'soon') return <ComingSoon tool={tool} />;
  if (kind === 'link') {
    return (
      <div className="converter-wrap" id="converter">
        <div className="converter" role="region" aria-label="Video link converter">
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
  const { bitrates, ...rest } = tool;
  return <Converter {...rest} bitrates={bitrates === 'compress' ? COMPRESS_BITRATES : STANDARD_BITRATES} />;
}
