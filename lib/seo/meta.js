// Page metadata shared by every page: title, description, canonical + hreflang and the social share card.
// Next.js replaces a parent's openGraph object instead of merging it, so each page sets the full card here.
import { LOCALE_MAP, alternatesFor, localePath } from '@/lib/i18n/config';
import { SITE } from '@/lib/site';

export const SHARE_IMAGE = { url: '/images/og-mp3-converter.png', width: 1200, height: 630, alt: SITE.name };

/** `title` is the full title as shown in search results and share cards. */
export function pageMeta({ lang, path, title, description, shareDescription = description, ready }) {
  const url = `${SITE.url}${localePath(lang, path)}`;
  return {
    title: { absolute: title },
    description,
    alternates: alternatesFor(lang, path, ready),
    openGraph: {
      type: 'website',
      siteName: SITE.name,
      locale: (LOCALE_MAP[lang] || LOCALE_MAP.en).og,
      url,
      title,
      description: shareDescription,
      images: [SHARE_IMAGE],
    },
    twitter: { card: 'summary_large_image', title, description: shareDescription, images: [SHARE_IMAGE.url] },
  };
}
