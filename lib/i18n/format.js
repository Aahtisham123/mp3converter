// Small helpers shared by server and client code.

/** Reads 'a.b.c' from a nested object. */
export function getPath(obj, key) {
  return key.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);
}

/** 'Hello {name}' + { name: 'Ann' } → 'Hello Ann' */
export function interpolate(str, vars) {
  if (!vars || typeof str !== 'string') return str;
  return str.replace(/\{(\w+)\}/g, (m, k) => (vars[k] == null ? m : String(vars[k])));
}

/**
 * Copies translated strings from `tr` onto `base`, but only where `shape` (the translatable part of base)
 * has a string. Missing or mismatched translations fall back to the English text.
 */
export function mergeTranslation(base, tr, shape = base) {
  if (typeof shape === 'string') return typeof tr === 'string' && tr.trim() ? tr : base;
  if (Array.isArray(shape)) {
    if (!Array.isArray(base)) return base;
    return base.map((item, i) => (i < shape.length ? mergeTranslation(item, Array.isArray(tr) ? tr[i] : undefined, shape[i]) : item));
  }
  if (shape && typeof shape === 'object') {
    if (!base || typeof base !== 'object') return base;
    const out = { ...base };
    for (const k of Object.keys(shape)) out[k] = mergeTranslation(base[k], tr && typeof tr === 'object' ? tr[k] : undefined, shape[k]);
    return out;
  }
  return base;
}

// Error messages thrown by lib/audio-engine.js, mapped to dictionary keys.
const ENGINE_ERRORS = {
  'This file is larger than 500 MB. Please split it first.': 'errors.tooBigSplit',
  'We could not find any sound in this file. It may be a silent video or a damaged file.': 'errors.noSound',
  'This file could not be read. It may be damaged, protected (DRM) or use a very rare codec.': 'errors.unreadable',
};

/** Translates a known engine or server error message; unknown messages are returned unchanged. */
export function translateError(message, dict, lang) {
  if (!message || lang === 'en') return message;
  const key = ENGINE_ERRORS[message];
  if (key) return getPath(dict, key) || message;
  const srv = dict.serverErrors && dict.serverErrors[message];
  if (srv) return srv;
  const prefixes = dict.serverErrorPrefixes || {};
  for (const p of Object.keys(prefixes)) if (message.startsWith(p)) return prefixes[p];
  return message;
}
