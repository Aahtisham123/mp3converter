'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from './Icon';
import { useI18n } from './I18nProvider';
import LanguageSwitcher from './LanguageSwitcher';
import { splitLocale } from '@/lib/i18n/config';
import { NAV_GROUPS, POPULAR_NAV } from '@/lib/site';

const COLLAPSE_KEY = 'mp3c:sidebar-collapsed';

/** Lower-case text without accents, so "Árabe" matches "arabe". */
const fold = (s) => s.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();

const groupOfPath = (p) => NAV_GROUPS.find((g) => g.hub === p || g.items.some((i) => i.href === p));

function isMobile() {
  return typeof window !== 'undefined' && window.matchMedia('(max-width: 960px)').matches;
}

export default function AppShell({ children }) {
  const pathname = usePathname();
  const { t, path } = useI18n();
  const currentPath = splitLocale(pathname || '/').path;
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Groups start closed, except the one that holds the current page.
  const [groups, setGroups] = useState(() => {
    const active = groupOfPath(currentPath);
    return Object.fromEntries(NAV_GROUPS.map((g) => [g.id, active === g]));
  });
  const [query, setQuery] = useState('');
  const searchRef = useRef(null);

  useEffect(() => {
    const active = groupOfPath(currentPath);
    if (active) setGroups((g) => (g[active.id] ? g : { ...g, [active.id]: true }));
  }, [currentPath]);

  useEffect(() => {
    try {
      if (localStorage.getItem(COLLAPSE_KEY) === '1') setCollapsed(true);
    } catch {}
  }, []);

  // Close the mobile drawer on navigation and on Escape.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  const toggleSidebar = useCallback(() => {
    if (isMobile()) {
      setOpen((v) => !v);
      return;
    }
    setCollapsed((v) => {
      try {
        localStorage.setItem(COLLAPSE_KEY, v ? '0' : '1');
      } catch {}
      return !v;
    });
  }, []);

  const navLabel = (item) => t(`nav.${item.href === '/' ? 'home' : item.href.slice(1)}`);
  const navLink = (item, key = item.href) => (
    <Link
      key={key}
      href={path(item.href)}
      className={`nav-link${currentPath === item.href ? ' is-active' : ''}`}
      aria-current={currentPath === item.href ? 'page' : undefined}
      title={navLabel(item)}
    >
      <Icon name={item.icon} />
      <span className="label">
        {navLabel(item)}
      </span>
    </Link>
  );
  const groupLabel = (group) => t(`nav.${group.label}`);

  // Every tool and hub once, for the search box.
  const searchable = useMemo(() => {
    const seen = new Map();
    for (const g of NAV_GROUPS) {
      if (g.hub) seen.set(g.hub, { href: g.hub, icon: g.icon });
      for (const i of g.items) if (!seen.has(i.href)) seen.set(i.href, i);
    }
    for (const i of POPULAR_NAV) if (!seen.has(i.href)) seen.set(i.href, i);
    return [...seen.values()];
  }, []);
  const q = fold(query.trim());
  const results = q
    ? searchable.filter((i) => fold(`${navLabel(i)} ${i.href.slice(1).replace(/-/g, ' ')}`).includes(q))
    : null;

  const expandFromRail = () => {
    if (collapsed && !isMobile()) {
      toggleSidebar();
      return true;
    }
    return false;
  };
  const toggleGroup = (group) => {
    if (expandFromRail()) {
      setGroups((g) => ({ ...g, [group.id]: true }));
      return;
    }
    setGroups((g) => ({ ...g, [group.id]: !g[group.id] }));
  };

  return (
    <div className={`app${collapsed ? ' is-collapsed' : ''}${open ? ' is-open' : ''}`}>
      <a href="#main" className="skip-link">{t('shell.skip')}</a>

      <aside className="sidebar" id="sidebar" aria-label={t('shell.navLabel')}>
        <Link href={path('/')} className="sidebar__brand" aria-label={t('shell.home')}>
          <img src="/images/logo.svg" alt="" width="34" height="34" />
          <span>MP3 Converter</span>
        </Link>

        <nav className="sidebar__nav">
          {navLink({ href: '/', icon: 'home' })}

          <div className="nav-search" role="search">
            <button
              type="button"
              className="nav-search__icon"
              tabIndex={-1}
              aria-hidden="true"
              onClick={() => {
                expandFromRail();
                setTimeout(() => searchRef.current && searchRef.current.focus(), 50);
              }}
            >
              <Icon name="search" />
            </button>
            <input
              ref={searchRef}
              type="search"
              className="label"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Escape' && setQuery('')}
              placeholder={t('shell.search')}
              aria-label={t('shell.searchLabel')}
            />
          </div>

          {results ? (
            <div className="nav-results" aria-live="polite">
              {results.length ? results.map((i) => navLink(i)) : <p className="nav-empty">{t('shell.noResults')}</p>}
            </div>
          ) : (
            <>
              <div className="nav-section">
                <p className="nav-heading label">{t('nav.groupPopular')}</p>
                {POPULAR_NAV.map((i) => navLink(i, `popular${i.href}`))}
              </div>
              <div className="nav-sep" role="separator" />
              {NAV_GROUPS.map((group) => {
                const label = groupLabel(group);
                const isHub = group.hub && currentPath === group.hub;
                return (
                  <div key={group.id} className="nav-group">
                    <div className="nav-group__head">
                      {group.hub ? (
                        <Link
                          href={path(group.hub)}
                          className={`nav-group__link${isHub ? ' is-active' : ''}`}
                          aria-current={isHub ? 'page' : undefined}
                          title={label}
                        >
                          <Icon name={group.icon} />
                          <span className="label">{label}</span>
                        </Link>
                      ) : (
                        <button type="button" className="nav-group__link" onClick={() => toggleGroup(group)} aria-expanded={groups[group.id]} aria-controls={`group-${group.id}`} title={label}>
                          <Icon name={group.icon} />
                          <span className="label">{label}</span>
                        </button>
                      )}
                      <button
                        type="button"
                        className="nav-group__chev"
                        aria-expanded={groups[group.id]}
                        aria-controls={`group-${group.id}`}
                        aria-label={t('nav.toggleGroup', { name: label })}
                        onClick={() => toggleGroup(group)}
                      >
                        <Icon name="chevronUp" className="icon chev" />
                      </button>
                    </div>
                    <ul className="nav-group__list" id={`group-${group.id}`} hidden={!groups[group.id]}>
                      {group.items.map((item) => <li key={item.href}>{navLink(item)}</li>)}
                    </ul>
                  </div>
                );
              })}
            </>
          )}
        </nav>

        <div className="sidebar__foot">
          <a href="#converter" className="btn-pill" onClick={() => setOpen(false)}>
            <Icon name="upload" />
            <span className="label">{t('shell.convertFile')}</span>
          </a>
          <LanguageSwitcher />
        </div>
      </aside>

      <div className="overlay" onClick={() => setOpen(false)} aria-hidden="true" />

      <div className="main">
        <header className={`topbar${scrolled ? ' is-scrolled' : ''}`}>
          <button
            type="button"
            className="icon-btn"
            onClick={toggleSidebar}
            aria-label={t('shell.toggleNav')}
            aria-controls="sidebar"
          >
            <Icon name="panel" />
          </button>
          <Link href={path('/')} className="topbar__brand">
            <img src="/images/logo.svg" alt="" width="32" height="32" />
            MP3 Converter
          </Link>
        </header>
        <main id="main">{children}</main>
      </div>
    </div>
  );
}
