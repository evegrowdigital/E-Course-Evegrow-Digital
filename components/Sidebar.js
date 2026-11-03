'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LogoutButton from './LogoutButton';
import MenuIcon from './MenuIcon';

const LOGO = '/logo.png';

function MiniIcon({ colors, children }) {
  const [c1, c2] = colors;
  return (
    <span
      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-white"
      style={{
        background: `linear-gradient(160deg, ${c1}, ${c2})`,
        boxShadow: 'inset 0 1px 1px rgba(255,255,255,.5), inset 0 -2px 3px rgba(0,0,0,.12)',
      }}
    >
      {children}
    </span>
  );
}

function SidebarContent({ name, email, menuItems, onNavigate }) {
  const pathname = usePathname();
  const initial = (name || email || '?').trim().charAt(0).toUpperCase();

  const rowBase = 'flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition';
  const activeClass = 'bg-brand-200 text-brand-900';
  const idleClass = 'text-brand-800 hover:bg-brand-100';

  const isActive = (href) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="px-5 py-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={LOGO} alt="Evegrow.Digital" className="h-10 w-auto" />
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-3">
        {/* Beranda */}
        <Link
          href="/"
          onClick={onNavigate}
          className={`${rowBase} ${isActive('/') ? activeClass : idleClass}`}
        >
          <MiniIcon colors={['#b08ef3', '#7b4bc9']}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
              <path d="M3 11l9-8 9 8" />
              <path d="M5 10v10h5v-6h4v6h5V10" />
            </svg>
          </MiniIcon>
          Beranda
        </Link>

        {/* Menu dari data/menu.js */}
        {menuItems.map((item) => {
          const content = (
            <>
              <MiniIcon colors={item.colors}>
                <MenuIcon name={item.icon} className="h-4 w-4" />
              </MiniIcon>
              <span className="min-w-0 flex-1 leading-tight">{item.label}</span>
              {!item.href && (
                <span className="shrink-0 rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-medium text-brand-700">
                  Segera hadir
                </span>
              )}
            </>
          );

          if (!item.href) {
            return (
              <div key={item.label} className={`${rowBase} cursor-default text-brand-800/60`}>
                {content}
              </div>
            );
          }

          if (item.href.startsWith('http')) {
            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onNavigate}
                className={`${rowBase} ${idleClass}`}
              >
                {content}
              </a>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={onNavigate}
              className={`${rowBase} ${isActive(item.href) ? activeClass : idleClass}`}
            >
              {content}
            </Link>
          );
        })}

        {/* Profil */}
        <Link
          href="/profil"
          onClick={onNavigate}
          className={`${rowBase} ${isActive('/profil') ? activeClass : idleClass}`}
        >
          <MiniIcon colors={['#cbb0fb', '#9568e2']}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
            </svg>
          </MiniIcon>
          Profil Saya
        </Link>
      </nav>

      <div className="border-t border-brand-100 p-3">
        <Link
          href="/profil"
          onClick={onNavigate}
          className="mb-1 flex items-center gap-3 rounded-xl p-2 transition hover:bg-brand-50"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-300 text-base font-bold text-brand-900">
            {initial}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold text-ink">{name}</span>
            <span className="block truncate text-xs text-brand-800/70">{email}</span>
          </span>
        </Link>
        <LogoutButton />
      </div>
    </div>
  );
}

export default function Sidebar({ name, email, menuItems = [] }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-brand-100 lg:block">
        <SidebarContent name={name} email={email} menuItems={menuItems} />
      </aside>

      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-brand-100 bg-white/90 px-4 py-3 backdrop-blur lg:hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={LOGO} alt="Evegrow.Digital" className="h-8 w-auto" />
        <button
          onClick={() => setOpen(true)}
          aria-label="Buka menu"
          className="rounded-lg p-2 text-brand-800 hover:bg-brand-100"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Tutup menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-ink/40"
          />
          <div className="absolute inset-y-0 left-0 w-72 max-w-[85%] shadow-soft">
            <SidebarContent
              name={name}
              email={email}
              menuItems={menuItems}
              onNavigate={() => setOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
          }
