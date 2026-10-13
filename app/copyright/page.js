import SimplePage from '@/components/SimplePage';
import { SITE } from '@/lib/site';

export const metadata = {
  title: 'Copyright & DMCA Policy',
  description: 'How rights holders can ask MP3 Converter to block links to their content, and our responsible-use rules.',
  alternates: { canonical: '/copyright' },
};

export default function Copyright() {
  return (
    <SimplePage title="Copyright & DMCA Policy" lead="Last updated: October 2026">
      <section className="section">
        <h2>We respect creators</h2>
        <p>
          MP3 Converter provides tools for converting and downloading media. Users must only process content they own,
          content that is in the public domain or openly licensed, or content they have permission to use. Using our tools
          to infringe copyright is not allowed and breaks our <a href="/terms">Terms of Use</a>.
        </p>
        <p>
          We do not host a library of music or videos. Files created from a link are stored temporarily so the person who
          requested them can download them, and are deleted automatically after 30 minutes.
        </p>
      </section>
      <section className="section">
        <h2>How to ask us to block content</h2>
        <p>
          If you own the rights to content and want us to prevent our tools from downloading it, email{' '}
          <a href={`mailto:${SITE.email}?subject=Copyright%20notice`}>{SITE.email}</a> with:
        </p>
        <ol>
          <li>Your name, company (if any), postal address, phone number and email address.</li>
          <li>A description of the copyrighted work.</li>
          <li>The exact links (URLs) or channel/site you want blocked.</li>
          <li>A statement that you believe in good faith that the use is not authorised by the owner, its agent or the law.</li>
          <li>A statement, under penalty of perjury, that the information is accurate and that you are the owner or authorised to act for the owner.</li>
          <li>Your physical or electronic signature.</li>
        </ol>
        <p>
          We aim to review valid notices within two business days. Approved links are added to our block list, after which
          our service refuses to process them.
        </p>
      </section>
      <section className="section">
        <h2>Repeat abuse</h2>
        <p>
          We limit how many downloads each visitor can start, and we may block visitors who repeatedly misuse the service.
        </p>
      </section>
      <section className="section">
        <h2>Trademarks</h2>
        <p>
          YouTube is a trademark of Google LLC. Other platform names are trademarks of their respective owners. MP3
          Converter is independent and is not affiliated with, endorsed by or sponsored by any of these companies.
        </p>
      </section>
    </SimplePage>
  );
}
