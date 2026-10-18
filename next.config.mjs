/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // app/global-not-found.js: a branded 404 for URLs outside the language layouts (e.g. /old-page.php).
  experimental: { globalNotFound: true },
};

export default nextConfig;
