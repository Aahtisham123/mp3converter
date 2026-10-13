import { SITE } from '@/lib/site';
import { TOOLS } from '@/lib/tools';

export default function sitemap() {
  const now = new Date();
  return [
    { url: `${SITE.url}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    ...TOOLS.map((t) => ({ url: `${SITE.url}/${t.slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 })),
    ...['about', 'contact', 'privacy-policy', 'terms'].map((p) => ({ url: `${SITE.url}/${p}`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 })),
  ];
}
