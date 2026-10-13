import SimplePage from '@/components/SimplePage';
import { SITE } from '@/lib/site';

export const metadata = {
  title: 'Contact',
  description: 'Contact the MP3 Converter team with questions, bug reports or feature ideas.',
  alternates: { canonical: '/contact' },
};

export default function Contact() {
  return (
    <SimplePage title="Contact Us" lead="We read every message and reply as soon as we can.">
      <section className="section">
        <h2>Email</h2>
        <p>
          Send us an email at <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>
        <h3>When reporting a problem, please include</h3>
        <ul>
          <li>The tool you used (for example, MP4 to MP3 or MP3 Cutter).</li>
          <li>Your browser and device (for example, Chrome on Windows or Safari on iPhone).</li>
          <li>The file format and roughly how long or large the file was.</li>
          <li>The exact error message, if one appeared.</li>
        </ul>
        <p>Please do not send us the audio file itself unless we ask. Because the tool runs in your browser, we never see your files.</p>
      </section>
    </SimplePage>
  );
}
