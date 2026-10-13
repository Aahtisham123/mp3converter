import Link from 'next/link';
import SimplePage from '@/components/SimplePage';

export const metadata = {
  title: 'About Us',
  description: 'Learn who builds MP3 Converter, how the tool works and why it converts audio privately in your browser.',
  alternates: { canonical: '/about' },
};

export default function About() {
  return (
    <SimplePage title="About MP3 Converter" lead="Simple, private audio tools that anyone can use.">
      <section className="section">
        <h2>Why we built this</h2>
        <p>
          Most online converters ask you to upload your files to a server, wait in a queue, and then download the result.
          That is slow, and it means handing your private recordings to a stranger. We wanted something better: a converter
          that is fast, free and keeps your files on your own device.
        </p>
        <p>
          So we built MP3 Converter as a tool that runs entirely in your web browser. There is no upload, no account and
          no limit on how many files you convert.
        </p>
      </section>
      <section className="section">
        <h2>How the tool works</h2>
        <ul className="checklist">
          <li><strong>Decoding.</strong> Your browser’s Web Audio engine reads common formats. For others, such as MKV, AVI or WMA, we load FFmpeg, a widely used open-source media library, compiled to WebAssembly.</li>
          <li><strong>Encoding.</strong> The MP3 is created with LAME, the open-source encoder trusted for over two decades, running in a background worker.</li>
          <li><strong>Saving.</strong> The finished MP3 goes straight from your browser’s memory to your downloads folder.</li>
        </ul>
      </section>
      <section className="section">
        <h2>Our principles</h2>
        <ul className="checklist">
          <li>Your files stay on your device.</li>
          <li>Plain, honest explanations without technical jargon.</li>
          <li>Free tools without watermarks or sign-up walls.</li>
          <li>Respect for creators: please only convert content you own or may use.</li>
        </ul>
        <p>
          Questions or ideas? <Link href="/contact">Get in touch</Link>.
        </p>
      </section>
    </SimplePage>
  );
}
