'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from './Icon';
import { NAV_GROUPS, PRIMARY_NAV } from '@/lib/site';

const COLLAPSE_KEY = 'mp3c:sidebar-collapsed';

function isMobile() {
  return typeof window !== 'undefined' && window.matchMedia('(max-width: 960px)').matches;
}

export default function AppShell({ children }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [groups, setGroups] = useState(() => Object.fromEntries(NAV_GROUPS.map((g) => [g.id, true])));

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

  const navLink = (item) => (
    <Link
      key={item.href}
      href={item.href}
      className={`nav-link${pathname === item.href ? ' is-active' : ''}`}
      aria-current={pathname === item.href ? 'page' : undefined}
      title={item.label}
    >
      <Icon name={item.icon} />
      <span className="label">
        {item.label}
        {item.soon && <span className="soon-badge">Soon</span>}
      </span>
    </Link>
  );

  return (
    <div className={`app${collapsed ? ' is-collapsed' : ''}${open ? ' is-open' : ''}`}>
      <a href="#main" className="skip-link">Skip to content</a>

      <aside className="sidebar" id="sidebar" aria-label="Site navigation">
        <Link href="/" className="sidebar__brand" aria-label="MP3 Converter home">
          <img src="/images/logo.svg" alt="" width="34" height="34" />
          <span>MP3 Converter</span>
        </Link>

        <nav className="sidebar__nav">
          {PRIMARY_NAV.map(navLink)}
          <div className="nav-sep" role="separator" />
          {NAV_GROUPS.map((group) => (
            <div key={group.id} className="nav-group">
              <button
                type="button"
                className="nav-group__toggle"
                aria-expanded={groups[group.id]}
                aria-controls={`group-${group.id}`}
                title={group.label}
                onClick={() => {
                  // In the icon rail, a group click expands the sidebar so its links become visible.
                  if (collapsed && !isMobile()) {
                    toggleSidebar();
                    setGroups((g) => ({ ...g, [group.id]: true }));
                    return;
                  }
                  setGroups((g) => ({ ...g, [group.id]: !g[group.id] }));
                }}
              >
                <Icon name={group.icon} />
                <span className="label">{group.label}</span>
                <Icon name="chevronUp" className="icon chev" />
              </button>
              <ul className="nav-group__list" id={`group-${group.id}`} hidden={!groups[group.id]}>
                {group.items.map((item) => <li key={item.href}>{navLink(item)}</li>)}
              </ul>
              <div className="nav-sep" role="separator" />
            </div>
          ))}
        </nav>

        <div className="sidebar__foot">
          <a href="#converter" className="btn-pill" onClick={() => setOpen(false)}>
            <Icon name="upload" />
            <span className="label">Convert a file</span>
          </a>
          <button type="button" className="icon-btn" aria-label="Language: English" title="English">
            <Icon name="globe" />
          </button>
        </div>
      </aside>

      <div className="overlay" onClick={() => setOpen(false)} aria-hidden="true" />

      <div className="main">
        <header className={`topbar${scrolled ? ' is-scrolled' : ''}`}>
          <button
            type="button"
            className="icon-btn"
            onClick={toggleSidebar}
            aria-label="Toggle navigation"
            aria-controls="sidebar"
          >
            <Icon name="panel" />
          </button>
          <Link href="/" className="topbar__brand">
            <img src="/images/logo.svg" alt="" width="32" height="32" />
            MP3 Converter
          </Link>
        </header>
        <main id="main">{children}</main>
      </div>
    </div>
  );
}
