// Server-side access to localized content. English is the source; other languages are merged on top of it,
// so anything not yet translated falls back to English.
import { UI_EN } from './ui-en';
import { mergeTranslation } from './format';
import { DEFAULT_LOCALE } from './config';
import { HOME } from '../content/home';
import { PAGES } from '../content/pages';
import { TOOLS, TOOL_MAP } from '../tools';
import { REVERSE_TARGETS } from '../reverse-formats';

const LOADERS = {
  es: () => import('./locales/es/index.js'),
  pt: () => import('./locales/pt/index.js'),
  fr: () => import('./locales/fr/index.js'),
  de: () => import('./locales/de/index.js'),
  ru: () => import('./locales/ru/index.js'),
  tr: () => import('./locales/tr/index.js'),
  ar: () => import('./locales/ar/index.js'),
  hi: () => import('./locales/hi/index.js'),
  id: () => import('./locales/id/index.js'),
};

/** Languages whose translation files exist (English always). Untranslated ones are hidden and not indexed. */
export async function getReadyLocales() {
  const ready = [DEFAULT_LOCALE];
  for (const code of Object.keys(LOADERS)) {
    const b = (await LOADERS[code]()).default;
    if (b.ui && Object.keys(b.ui).length) ready.push(code);
  }
  return ready;
}

async function bundle(lang) {
  if (lang === DEFAULT_LOCALE || !LOADERS[lang]) return null;
  return (await LOADERS[lang]()).default;
}

// Labels and notes of the "MP3 to X" formats that need words (plain "128 kbps" labels are not translated).
function reverseFormatsEn() {
  const out = {};
  for (const [key, t] of Object.entries(REVERSE_TARGETS)) {
    const options = {};
    for (const o of t.options) if (!/^\d+ kbps$/.test(o.label)) options[o.value] = o.label;
    out[key] = { ...(t.note ? { note: t.note } : {}), ...(Object.keys(options).length ? { options } : {}) };
  }
  return out;
}

export const UI_SOURCE = { ...UI_EN, reverseFormats: reverseFormatsEn() };

// Fields of a tool page that are configuration, not text.
const TOOL_SKIP = new Set(['slug', 'kind', 'related', 'src', 'width', 'height', 'linkFormats', 'sites', 'advanced', 'defaultBitrate', 'bitrates', 'showRecord', 'showLink', 'initialMode', 'defaultMono', 'reverse', 'compress', 'defaultType', 'metaTitle']);

/** The translatable text of a tool page (same shape as the tool, strings only). */
export function toolText(value, key) {
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) {
    if (key === 'formats') return undefined; // e.g. linkProps.formats: ['mp3']
    return value.map((v) => toolText(v));
  }
  if (value && typeof value === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(value)) {
      if (TOOL_SKIP.has(k)) continue;
      const t = toolText(v, k);
      if (t !== undefined) out[k] = t;
    }
    return out;
  }
  return undefined;
}

export async function getDictionary(lang) {
  const b = await bundle(lang);
  return b ? mergeTranslation(UI_SOURCE, b.ui) : UI_SOURCE;
}

export async function getHome(lang) {
  const b = await bundle(lang);
  return b ? mergeTranslation(HOME, b.home) : HOME;
}

export async function getPage(lang, slug) {
  const b = await bundle(lang);
  const page = PAGES[slug];
  return b && page ? mergeTranslation(page, b.pages[slug]) : page;
}

function localizeTool(t, b) {
  if (!b || !b.tools[t.slug]) return t;
  const merged = mergeTranslation(t, b.tools[t.slug], toolText(t));
  // metaTitle mirrors seoTitle on every page.
  return { ...merged, metaTitle: t.seoTitle ? merged.seoTitle : merged.metaTitle };
}

export async function getTool(lang, slug) {
  const t = TOOL_MAP[slug];
  if (!t) return null;
  return localizeTool(t, await bundle(lang));
}

export async function getTools(lang) {
  const b = await bundle(lang);
  return Object.fromEntries(TOOLS.map((t) => [t.slug, localizeTool(t, b)]));
}
