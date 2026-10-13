import SimplePage from '@/components/SimplePage';
import { SITE } from '@/lib/site';

export const metadata = {
  title: 'Terms of Use',
  description: 'The terms for using the free MP3 Converter tools.',
  alternates: { canonical: '/terms' },
};

export default function Terms() {
  return (
    <SimplePage title="Terms of Use" lead="Last updated: October 2026">
      <section className="section">
        <h2>Using the tools</h2>
        <p>
          MP3 Converter is free to use for personal and commercial purposes. By using the site, you agree to these terms.
        </p>
      </section>
      <section className="section">
        <h2>Your content and copyright</h2>
        <p>
          You are responsible for the files you process. Only convert, cut, compress or join content that you own, that you
          have permission to use, or that the law allows you to copy. Do not use the tools to infringe copyright or to get
          around copy protection.
        </p>
      </section>
      <section className="section">
        <h2>No warranty</h2>
        <p>
          The tools are provided “as is”. We work hard to make them reliable, but we cannot guarantee that every file will
          convert or that the service will always be available. Always keep a copy of your original files.
        </p>
      </section>
      <section className="section">
        <h2>Open-source software</h2>
        <p>
          The site uses LAME (via lamejs, LGPL) for MP3 encoding and FFmpeg (via ffmpeg.wasm) for decoding some formats. These
          projects remain the property of their authors and are used under their licences.
        </p>
      </section>
      <section className="section">
        <h2>Contact</h2>
        <p>
          Questions about these terms? Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>
      </section>
    </SimplePage>
  );
}
