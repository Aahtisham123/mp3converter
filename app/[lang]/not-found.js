'use client';

import Link from 'next/link';
import { useI18n } from '@/components/I18nProvider';

export default function NotFound() {
  const { t, path } = useI18n();
  return (
    <section className="page-hero container" style={{ paddingTop: 60, paddingBottom: 40 }}>
      <title>{t('page.notFoundTitle')}</title>
      <meta name="robots" content="noindex" />
      <h1>{t('page.notFoundTitle')}</h1>
      <p>{t('page.notFoundText')}</p>
      <p style={{ marginTop: 24 }}>
        <Link href={path('/')} className="btn-grad">{t('page.notFoundButton')}</Link>
      </p>
    </section>
  );
}
