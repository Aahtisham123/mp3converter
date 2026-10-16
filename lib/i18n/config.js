// Supported languages. English lives at the site root (/youtube-to-mp3); the others get a prefix (/es/youtube-to-mp3).

export const DEFAULT_LOCALE = 'en';

export const LOCALES = [
  { code: 'en', name: 'English', native: 'English', dir: 'ltr', og: 'en_US' },
  { code: 'es', name: 'Spanish', native: 'Español', dir: 'ltr', og: 'es_ES' },
  { code: 'pt', name: 'Portuguese', native: 'Português', dir: 'ltr', og: 'pt_BR' },
  { code: 'fr', name: 'French', native: 'Français', dir: 'ltr', og: 'fr_FR' },
  { code: 'de', name: 'German', native: 'Deutsch', dir: 'ltr', og: 'de_DE' },
  { code: 'ru', name: 'Russian', native: 'Русский', dir: 'ltr', og: 'ru_RU' },
  { code: 'tr', name: 'Turkish', native: 'Türkçe', dir: 'ltr', og: 'tr_TR' },
  { code: 'ar', name: 'Arabic', native: 'العربية', dir: 'rtl', og: 'ar_AR' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', dir: 'ltr', og: 'hi_IN' },
  { code: 'id', name: 'Indonesian', native: 'Bahasa Indonesia', dir: 'ltr', og: 'id_ID' },
];

export const LOCALE_CODES = LOCALES.map((l) => l.code);
export const LOCALE_MAP = Object.fromEntries(LOCALES.map((l) => [l.code, l]));
export const isLocale = (code) => LOCALE_CODES.includes(code);

/** '/youtube-to-mp3' → '/es/youtube-to-mp3' (English stays unprefixed). Hashes and external links pass through. */
export function localePath(lang, path = '/') {
  if (!path || !path.startsWith('/') || path.startsWith('//')) return path;
  if (!lang || lang === DEFAULT_LOCALE) return path;
  return path === '/' ? `/${lang}` : `/${lang}${path}`;
}

/** '/es/youtube-to-mp3' → { lang: 'es', path: '/youtube-to-mp3' } */
export function splitLocale(pathname = '/') {
  const first = pathname.split('/')[1];
  if (first && isLocale(first)) {
    // '/en/...' only appears internally (English is served from the root).
    if (first === DEFAULT_LOCALE) return { lang: DEFAULT_LOCALE, path: pathname.slice(3) || '/' };
    return { lang: first, path: pathname.slice(first.length + 1) || '/' };
  }
  return { lang: DEFAULT_LOCALE, path: pathname || '/' };
}

/** Canonical + hreflang links for a page path such as '/' or '/youtube-to-mp3'. */
export function alternatesFor(lang, path, ready = LOCALE_CODES) {
  const languages = Object.fromEntries(LOCALES.filter((l) => ready.includes(l.code)).map((l) => [l.code, localePath(l.code, path)]));
  languages['x-default'] = path;
  return { canonical: localePath(lang, path), languages };
}
