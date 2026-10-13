import SimplePage from '@/components/SimplePage';
import { SITE } from '@/lib/site';

export const metadata = {
  title: 'Privacy Policy',
  description: 'How MP3 Converter handles your data. Files are processed in your browser and never uploaded to our servers.',
  alternates: { canonical: '/privacy-policy' },
};

export default function Privacy() {
  return (
    <SimplePage title="Privacy Policy" lead="Last updated: October 2026">
      <section className="section">
        <h2>The short version</h2>
        <p>
          The files you convert, cut, compress, join or record on {SITE.url.replace('https://', '')} are processed inside your own
          browser. They are not uploaded to, stored on or viewed by our servers.
        </p>
      </section>
      <section className="section">
        <h2>Files and recordings</h2>
        <p>
          When you choose a file or record with your microphone, the audio is read and converted in your browser’s memory.
          The resulting MP3 is offered to you as a download. When you close or reload the page, this data is cleared.
        </p>
      </section>
      <section className="section">
        <h2>Microphone</h2>
        <p>
          The recorder only accesses your microphone after you press Start Recording and your browser asks for permission.
          The recording is used only to create your MP3 on this page.
        </p>
      </section>
      <section className="section">
        <h2>Information stored in your browser</h2>
        <p>
          We save one small setting in your browser’s local storage: whether the sidebar is collapsed. Your browser may also
          cache the converter’s program files so the site loads faster next time.
        </p>
      </section>
      <section className="section">
        <h2>Server logs</h2>
        <p>
          Like any website, our hosting provider may keep standard technical logs, such as IP address, browser type and the
          pages requested, for security and reliability. These logs do not contain your audio files.
        </p>
      </section>
      <section className="section">
        <h2>Changes and contact</h2>
        <p>
          If we add analytics or advertising in the future, we will update this page first. For any privacy question, email{' '}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>
      </section>
    </SimplePage>
  );
}
