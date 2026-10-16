'use client';

import { useEffect, useState } from 'react';
import Converter from './Converter';
import { useI18n } from './I18nProvider';
import ReverseConverter from './ReverseConverter';
import { REVERSE_TARGETS } from '@/lib/reverse-formats';

/** Two-way format converter: "X to MP3" or "MP3 to X". A link ending in #mp3-to-x opens the reverse mode. */
export default function FormatConverter({ reverse, converterProps }) {
  const { t } = useI18n();
  const label = REVERSE_TARGETS[reverse].label;
  const reverseHash = `#mp3-to-${reverse}`;
  const [direction, setDirection] = useState('to-mp3');

  useEffect(() => {
    if (window.location.hash === reverseHash) setDirection('from-mp3');
  }, [reverseHash]);

  const choose = (d) => {
    setDirection(d);
    try {
      const url = d === 'from-mp3' ? reverseHash : window.location.pathname + window.location.search;
      window.history.replaceState(null, '', url);
    } catch {}
  };

  return (
    <>
      <div className="mode-tabs direction-tabs" role="tablist" aria-label={t('direction.label')}>
        <button type="button" role="tab" id="tab-to-mp3" aria-controls="panel-direction" aria-selected={direction === 'to-mp3'} className="mode-tab" onClick={() => choose('to-mp3')}>
          {label} <span aria-hidden="true">→</span><span className="sr-only">{t('direction.to')}</span> MP3
        </button>
        <button type="button" role="tab" id="tab-from-mp3" aria-controls="panel-direction" aria-selected={direction === 'from-mp3'} className="mode-tab" onClick={() => choose('from-mp3')}>
          MP3 <span aria-hidden="true">→</span><span className="sr-only">{t('direction.to')}</span> {label}
        </button>
      </div>
      <div id="panel-direction" role="tabpanel" aria-labelledby={direction === 'to-mp3' ? 'tab-to-mp3' : 'tab-from-mp3'}>
        {direction === 'to-mp3' ? <Converter {...converterProps} /> : <ReverseConverter target={reverse} />}
      </div>
    </>
  );
}
