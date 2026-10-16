'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Icon from './Icon';
import { useI18n } from './I18nProvider';
import { LOCALES, LOCALE_MAP, localePath, splitLocale } from '@/lib/i18n/config';

/** Globe button with a menu of languages; each entry links to the same page in that language. */
export default function LanguageSwitcher({ className = '' }) {
  const { lang, t, ready } = useI18n();
  const pathname = usePathname() || '/';
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);
  const { path } = splitLocale(pathname);
  const current = LOCALE_MAP[lang] || LOCALES[0];

  useEffect(() => {
    if (!open) return undefined;
    const onDoc = (e) => boxRef.current && !boxRef.current.contains(e.target) && setOpen(false);
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('pointerdown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className={`lang-switch ${className}`} ref={boxRef}>
      <button
        type="button"
        className="icon-btn lang-switch__btn"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={`${t('shell.chooseLanguage')}: ${current.native}`}
        title={t('shell.language')}
        onClick={() => setOpen((v) => !v)}
      >
        <Icon name="globe" />
        <span className="lang-switch__code" aria-hidden="true">{current.code.toUpperCase()}</span>
      </button>
      {open && (
        <ul className="lang-switch__menu" role="menu" aria-label={t('shell.chooseLanguage')}>
          {LOCALES.filter((l) => !ready || ready.includes(l.code) || l.code === lang).map((l) => (
            <li key={l.code} role="none">
              {/* Full page load, so the <html lang/dir> of the new language is applied cleanly. */}
              <a
                role="menuitem"
                href={localePath(l.code, path)}
                hrefLang={l.code}
                lang={l.code}
                aria-current={l.code === lang ? 'true' : undefined}
                className={l.code === lang ? 'is-active' : undefined}
              >
                <span>{l.native}</span>
                {l.code === lang && <Icon name="check" className="icon icon-sm" />}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
