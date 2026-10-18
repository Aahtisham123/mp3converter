/** @type {import('next').NextConfig} */
const MONTH = 60 * 60 * 24 * 30;

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // app/global-not-found.js: a branded 404 for URLs outside the language layouts (e.g. /old-page.php).
  experimental: { globalNotFound: true },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // The voice recorder and transcriber need the microphone; nothing needs the camera or location.
          { key: 'Permissions-Policy', value: 'camera=(), geolocation=(), payment=(), usb=(), microphone=(self)' },
        ],
      },
      // The ~32 MB FFmpeg core and the MP3 encoder only change when their pinned versions change.
      { source: '/ffmpeg/:path*', headers: [{ key: 'Cache-Control', value: `public, max-age=${MONTH}, stale-while-revalidate=${MONTH}` }] },
      { source: '/vendor/:path*', headers: [{ key: 'Cache-Control', value: `public, max-age=${MONTH}, stale-while-revalidate=${MONTH}` }] },
      { source: '/images/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=86400' }] },
      { source: '/icons/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=86400' }] },
    ];
  },
};

export default nextConfig;
