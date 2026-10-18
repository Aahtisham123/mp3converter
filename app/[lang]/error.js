'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { useI18n } from '@/components/I18nProvider';

// Shown when a page crashes; the sidebar and footer stay, so the visitor can carry on.
export default function PageError({ error, reset }) {
  const { t, path } = useI18n();
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <section className="not-found container" aria-labelledby="err-title">
      <p className="not-found__code" aria-hidden="true">!</p>
      <h1 id="err-title">{t('page.errorTitle')}</h1>
      <p className="not-found__text">{t('page.errorText')}</p>
      <p className="not-found__actions">
        <button type="button" className="btn-grad" onClick={() => reset()}>
          {t('page.errorRetry')}
        </button>
        <Link href={path('/')} className="btn-outline">
          <Icon name="home" /> {t('page.notFoundButton')}
        </Link>
      </p>
    </section>
  );
}
