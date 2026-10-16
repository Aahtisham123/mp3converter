'use client';

import { createContext, useCallback, useContext, useMemo } from 'react';
import { getPath, interpolate, translateError } from '@/lib/i18n/format';
import { DEFAULT_LOCALE, localePath } from '@/lib/i18n/config';
import { UI_EN } from '@/lib/i18n/ui-en';

const I18nContext = createContext({ lang: DEFAULT_LOCALE, dict: UI_EN, ready: [DEFAULT_LOCALE] });

export function I18nProvider({ lang, dict, ready, children }) {
  const value = useMemo(() => ({ lang, dict, ready }), [lang, dict, ready]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

/** { lang, dict, t('a.b', vars), path('/x'), err(message) } for client components. */
export function useI18n() {
  const { lang, dict, ready } = useContext(I18nContext);
  const t = useCallback((key, vars) => {
    const v = getPath(dict, key);
    return interpolate(typeof v === 'string' ? v : getPath(UI_EN, key) ?? key, vars);
  }, [dict]);
  const path = useCallback((p) => localePath(lang, p), [lang]);
  const err = useCallback((m) => translateError(m, dict, lang), [dict, lang]);
  return { lang, dict, ready, t, path, err };
}
