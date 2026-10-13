import Link from 'next/link';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <section className="page-hero container" style={{ paddingTop: 60, paddingBottom: 40 }}>
      <h1>Page not found</h1>
      <p>The page you are looking for does not exist or has moved.</p>
      <p style={{ marginTop: 24 }}>
        <Link href="/" className="btn-grad">Go to the MP3 Converter</Link>
      </p>
    </section>
  );
}
