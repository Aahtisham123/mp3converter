// 404 for URLs that never reach a language layout, e.g. /old-page.php or an unknown language prefix.
import { Inter } from 'next/font/google';
import Icon from '@/components/Icon';
import { NAV_GROUPS, POPULAR_NAV } from '@/lib/site';
import { UI_EN } from '@/lib/i18n/ui-en';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });

export const metadata = {
  title: `${UI_EN.page.notFoundTitle} | MP3 Converter`,
  robots: { index: false },
};

const LINKS = [...POPULAR_NAV, ...NAV_GROUPS.filter((g) => g.hub).map((g) => ({ href: g.hub, icon: g.icon }))];

export default function GlobalNotFound() {
  const nav = UI_EN.nav;
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <main className="not-found not-found--global">
          <a href="/" className="not-found__brand">
            <img src="/images/logo.svg" alt="" width="34" height="34" /> MP3 Converter
          </a>
          <p className="not-found__code" aria-hidden="true">404</p>
          <h1>{UI_EN.page.notFoundTitle}</h1>
          <p className="not-found__text">{UI_EN.page.notFoundText}</p>
          <p>
            <a href="/" className="btn-grad"><Icon name="home" /> {UI_EN.page.notFoundButton}</a>
          </p>
          <h2 className="not-found__sub">{nav.groupPopular}</h2>
          <div className="grid grid-3" style={{ width: '100%' }}>
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="card format-card">
                <span className="card__icon"><Icon name={l.icon} /></span>
                <strong>{nav[l.href.slice(1)]}</strong>
              </a>
            ))}
          </div>
        </main>
      </body>
    </html>
  );
}
