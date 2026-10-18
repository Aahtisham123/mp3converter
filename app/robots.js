import { SITE } from '@/lib/site';

// Everything is crawlable (Google needs the CSS and JS under /_next to render pages); the sitemap index lists every
// language. Missing pages return 404 with noindex, so nothing else needs blocking.
export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
