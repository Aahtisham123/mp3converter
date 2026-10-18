'use client';

import Link from 'next/link';
import Icon from '@/components/Icon';
import { useI18n } from '@/components/I18nProvider';
import { NAV_GROUPS, POPULAR_NAV } from '@/lib/site';

// Popular tools and every hub page, so a lost visitor is one click from a working tool.
const LINKS = [
  ...POPULAR_NAV,
  ...NAV_GROUPS.filter((g) => g.hub).map((g) => ({ href: g.hub, icon: g.icon })),
];

export default function NotFound() {
  const { t, path } = useI18n();
  return (
    <section className="not-found container" aria-labelledby="nf-title">
      <title>{`${t('page.notFoundTitle')} | MP3 Converter`}</title>
      <p className="not-found__code" aria-hidden="true">404</p>
      <h1 id="nf-title">{t('page.notFoundTitle')}</h1>
      <p className="not-found__text">{t('page.notFoundText')}</p>
      <p>
        <Link href={path('/')} className="btn-grad">
          <Icon name="home" /> {t('page.notFoundButton')}
        </Link>
      </p>
      <h2 className="not-found__sub">{t('nav.groupPopular')}</h2>
      <div className="grid grid-3">
        {LINKS.map((l) => (
          <Link key={l.href} href={path(l.href)} className="card format-card">
            <span className="card__icon"><Icon name={l.icon} /></span>
            <strong>{t(`nav.${l.href.slice(1)}`)}</strong>
          </Link>
        ))}
      </div>
    </section>
  );
}
