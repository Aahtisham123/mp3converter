import Link from 'next/link';
import SocialLinks from './SocialLinks';
import { localePath } from '@/lib/i18n/config';
import { NAV_GROUPS, PRIMARY_NAV, SITE } from '@/lib/site';

export default function Footer({ lang, dict }) {
  const year = new Date().getFullYear();
  const f = dict.footer;
  const href = (p) => localePath(lang, p);
  const label = (p) => dict.nav[p.slice(1)];
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <Link href={href('/')} className="topbar__brand" style={{ display: 'inline-flex' }}>
            <img src="/images/logo.svg" alt="" width="32" height="32" />
            {SITE.name}
          </Link>
          <p>{dict.site.tagline}</p>
          <p className="footer__follow">{f.follow}</p>
          <SocialLinks label={f.socialLabel} itemLabel={f.socialItem} />
        </div>
        <nav aria-label={f.converters}>
          <h3>{f.converters}</h3>
          <ul>
            {PRIMARY_NAV.slice(1).map((l) => (
              <li key={l.href}><Link href={href(l.href)}>{label(l.href)}</Link></li>
            ))}
          </ul>
        </nav>
        <nav aria-label={f.formatsTools}>
          <h3>{f.formatsTools}</h3>
          <ul>
            {NAV_GROUPS.flatMap((g) => g.items).slice(0, 7).map((l) => (
              <li key={l.href}><Link href={href(l.href)}>{label(l.href)}</Link></li>
            ))}
          </ul>
        </nav>
        <nav aria-label={f.company}>
          <h3>{f.company}</h3>
          <ul>
            <li><Link href={href('/about')}>{f.about}</Link></li>
            <li><Link href={href('/contact')}>{f.contact}</Link></li>
            <li><Link href={href('/privacy-policy')}>{f.privacy}</Link></li>
            <li><Link href={href('/terms')}>{f.terms}</Link></li>
            <li><Link href={href('/copyright')}>{f.copyright}</Link></li>
          </ul>
        </nav>
      </div>
      <div className="footer__bottom">
        <span>{f.rights.replace('{year}', year)}</span>
        <span>{f.disclaimer}</span>
      </div>
    </footer>
  );
}
