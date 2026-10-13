'use client';

import Converter from './Converter';
import Cutter from './Cutter';
import Joiner from './Joiner';
import { COMPRESS_BITRATES, STANDARD_BITRATES } from './tool-ui';

export default function ToolWidget({ kind, tool = {} }) {
  if (kind === 'cut') return <Cutter />;
  if (kind === 'join') return <Joiner />;
  const bitrates = tool.bitrates === 'compress' ? COMPRESS_BITRATES : STANDARD_BITRATES;
  return <Converter {...tool} bitrates={bitrates} />;
}
