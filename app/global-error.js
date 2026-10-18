'use client';

// Last resort when the site layout itself fails, so it cannot use the dictionary or global styles.
export default function GlobalError({ reset }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif', color: '#111827', background: '#fff' }}>
        <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24, textAlign: 'center' }}>
          <div>
            <img src="/images/logo.svg" alt="MP3 Converter" width="56" height="56" />
            <h1 style={{ fontSize: '1.8rem', margin: '18px 0 8px' }}>Something went wrong</h1>
            <p style={{ color: '#4b5563', maxWidth: 440, margin: '0 auto 22px' }}>
              An unexpected error stopped this page. Please try again. Your files were not uploaded anywhere.
            </p>
            <button
              type="button"
              onClick={() => reset()}
              style={{ border: 0, borderRadius: 999, padding: '12px 26px', font: 'inherit', fontWeight: 700, color: '#fff', background: 'linear-gradient(90deg, #3b82f6, #a855f7)', cursor: 'pointer' }}
            >
              Try again
            </button>
            <p style={{ marginTop: 18 }}><a href="/" style={{ color: '#7c3aed' }}>Go to the MP3 Converter</a></p>
          </div>
        </main>
      </body>
    </html>
  );
}
