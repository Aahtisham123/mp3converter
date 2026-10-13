'use client';

import Converter from './Converter';
import Icon from './Icon';
import Cutter from './Cutter';
import Joiner from './Joiner';
import LinkDownloader from './LinkDownloader';
import { COMPRESS_BITRATES, STANDARD_BITRATES } from './tool-ui';

export default function ToolWidget({ kind, tool = {} }) {
  if (kind === 'cut') return <Cutter />;
  if (kind === 'join') return <Joiner />;
  if (kind === 'link') {
    return (
      <div className="converter-wrap" id="converter">
        <div className="converter" role="region" aria-label="Video link downloader">
          <div className="converter__icon" aria-hidden="true"><span><Icon name="link" /></span></div>
          <h2>{tool.heading}</h2>
          <p className="converter__formats">{tool.formats}</p>
          <LinkDownloader defaultType={tool.defaultType} placeholder={tool.placeholder} />
        </div>
      </div>
    );
  }
  const bitrates = tool.bitrates === 'compress' ? COMPRESS_BITRATES : STANDARD_BITRATES;
  return <Converter {...tool} bitrates={bitrates} />;
}
