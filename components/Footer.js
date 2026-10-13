import Link from 'next/link';
import { NAV_GROUPS, PRIMARY_NAV, SITE } from '@/lib/site';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <Link href="/" className="topbar__brand" style={{ display: 'inline-flex' }}>
            <img src="/images/logo.svg" alt="" width="32" height="32" />
            {SITE.name}
          </Link>
          <p>
            A free, private MP3 converter that runs in your browser. Convert audio and video to MP3 without
            installing software or creating an account.
          </p>
        </div>
        <nav aria-label="Converters">
          <h3>Converters</h3>
          <ul>
            {PRIMARY_NAV.slice(1).map((l) => (
              <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Formats and tools">
          <h3>Formats &amp; Tools</h3>
          <ul>
            {NAV_GROUPS.flatMap((g) => g.items).slice(0, 7).map((l) => (
              <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Company">
          <h3>Company</h3>
          <ul>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            <li><Link href="/terms">Terms of Use</Link></li>
          </ul>
        </nav>
      </div>
      <div className="footer__bottom">
        <span>© {year} mp3convert.tools. All rights reserved.</span>
        <span>Please only convert files you own or have permission to use.</span>
      </div>
    </footer>
  );
}
