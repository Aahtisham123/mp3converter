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
          You are responsible for the files and links you process. Only convert, download, cut, compress or join content
          that you own, that is openly licensed, that you have permission to use, or that the law allows you to copy. Do
          not use the tools to infringe copyright, to get around copy protection, or in breach of another website’s
          terms of service. See our <a href="/copyright">Copyright &amp; DMCA Policy</a>.
        </p>
      </section>
      <section className="section">
        <h2>Fair use of the link downloader</h2>
        <p>
          To keep the service available for everyone, we limit how many downloads each visitor can start per hour, the
          length of videos and the size of files. Automated or bulk use is not allowed. We may block access in case of abuse.
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
          The site uses LAME (via lamejs, LGPL) for MP3 encoding, FFmpeg (via ffmpeg.wasm and on our server) for decoding and
          converting, and yt-dlp (Unlicense) for fetching media from links. These
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
