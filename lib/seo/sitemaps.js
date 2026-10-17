// Sitemap index (/sitemap.xml) + one sitemap per language (/sitemaps/<lang>.xml), each URL with hreflang links.
import { LOCALES, localePath } from '@/lib/i18n/config';
import { getReadyLocales } from '@/lib/i18n/server';
import { PAGE_SLUGS } from '@/lib/content/pages';
import { SITE } from '@/lib/site';
import { TOOLS } from '@/lib/tools';

// Built once per deployment, so every file reports the same date.
const LASTMOD = new Date().toISOString();
const STYLESHEET = '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>';

const PAGES = [
  { path: '/', changefreq: 'weekly', priority: 1 },
  ...TOOLS.map((t) => ({ path: `/${t.slug}`, changefreq: 'monthly', priority: 0.8 })),
  ...PAGE_SLUGS.map((p) => ({ path: `/${p}`, changefreq: 'yearly', priority: 0.3 })),
];

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const abs = (lang, path) => `${SITE.url}${localePath(lang, path)}`;

export const xmlResponse = (body) =>
  new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });

export async function sitemapIndex() {
  const ready = await getReadyLocales();
  const items = LOCALES.filter((l) => ready.includes(l.code))
    .map((l) => `  <sitemap>\n    <loc>${SITE.url}/sitemaps/${l.code}.xml</loc>\n    <lastmod>${LASTMOD}</lastmod>\n  </sitemap>`)
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n${STYLESHEET}\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</sitemapindex>\n`;
}

export async function languageSitemap(lang) {
  const ready = await getReadyLocales();
  if (!ready.includes(lang)) return null;
  const live = LOCALES.filter((l) => ready.includes(l.code));
  const urls = PAGES.map(({ path, changefreq, priority }) => {
    const alternates = [
      ...live.map((l) => `    <xhtml:link rel="alternate" hreflang="${l.code}" href="${esc(abs(l.code, path))}"/>`),
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${esc(abs('en', path))}"/>`,
    ].join('\n');
    return `  <url>\n    <loc>${esc(abs(lang, path))}</loc>\n    <lastmod>${LASTMOD}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority.toFixed(1)}</priority>\n${alternates}\n  </url>`;
  }).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n${STYLESHEET}\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`;
}
