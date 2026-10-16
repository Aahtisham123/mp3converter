import { LOCALES, localePath } from '@/lib/i18n/config';
import { getReadyLocales } from '@/lib/i18n/server';
import { PAGE_SLUGS } from '@/lib/content/pages';
import { SITE } from '@/lib/site';
import { TOOLS } from '@/lib/tools';

// Every page in every language, each listing its translations (hreflang) for search engines.
export default async function sitemap() {
  const now = new Date();
  const ready = await getReadyLocales();
  const live = LOCALES.filter((l) => ready.includes(l.code));
  const entry = (path, changeFrequency, priority) =>
    live.map((l) => ({
      url: `${SITE.url}${localePath(l.code, path)}`,
      lastModified: now,
      changeFrequency,
      priority: l.code === 'en' ? priority : Math.round(priority * 0.9 * 10) / 10,
      alternates: {
        languages: Object.fromEntries([...live.map((x) => [x.code, `${SITE.url}${localePath(x.code, path)}`]), ['x-default', `${SITE.url}${path}`]]),
      },
    }));
  return [
    ...entry('/', 'weekly', 1),
    ...TOOLS.flatMap((t) => entry(`/${t.slug}`, 'monthly', 0.8)),
    ...PAGE_SLUGS.flatMap((p) => entry(`/${p}`, 'yearly', 0.3)),
  ];
}
