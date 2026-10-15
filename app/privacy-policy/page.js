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
          Files you upload, record, cut, compress or join on {SITE.url.replace('https://', '')} are processed inside your own
          browser and are never sent to us. When you paste a link, our download server fetches that link for you and
          deletes the result after 30 minutes.
        </p>
      </section>
      <section className="section">
        <h2>Files and recordings on your device</h2>
        <p>
          When you choose a file or record with your microphone, the audio is read and converted in your browser’s memory.
          The resulting MP3 is offered to you as a download. When you close or reload the page, this data is cleared.
        </p>
      </section>
      <section className="section">
        <h2>Links you paste</h2>
        <p>
          To download from a link, we send the link to our download server, which fetches the video from the website and,
          if you choose, converts it to MP3. The finished file is stored only so you can download it and is deleted
          automatically after 30 minutes. We keep the IP address of each request in memory for up to one hour to apply
          fair-use limits, and our server logs record technical errors without the content of the files.
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
        <h2>Reviews you submit</h2>
        <p>
          If you write a review, we store your name, email address, star rating, review text and, if you add one, a small
          copy of your photo. We show your name, photo, rating and review on the website. We never publish or sell your
          email address; we use it only to confirm your review, to stop duplicate or fake reviews and to contact you about
          your review. To change or remove your review, email us and we will delete it.
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
