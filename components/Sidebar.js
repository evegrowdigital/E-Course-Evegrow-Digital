'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LOGO_SRC = 'https://i.ibb.co.com/v4vnDrZr/file-0000000095ac820695edea0b24952bb0.png';

const MENU = [
  {
    href: '/',
    label: 'Materi',
    icon: (
      <path d="M4 5a2 2 0 012-2h12a2 2 0 012 2v14l-4-3H6a2 2 0 01-2-2V5z" />
    ),
  },
  {
    href: '/profil',
    label: 'Profil Saya',
    icon: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0116 0" />
      </>
    ),
  },
];

function Brand() {
  return (
    <div className="flex items-center gap-3">
      <img
        src={LOGO_SRC}
        alt="Logo Evegrow"
        className="h-11 w-11 rounded-2xl object-cover shadow-soft ring-2 ring-brand-100"
      />
      <div className="leading-tight">
        <p className="text-[11px] font-medium uppercase tracking-wider text-brand-600">
          Ecourse by
        </p>
        <p className="text-base font-bold text-brand-900">Evegrow.Digital</p>
      </div>
    </div>
  );
}

function Menu({ onNavigate }) {
  const pathname = usePathname();

  return (
    <nav className="mt-6 flex flex-col gap-1.5">
      {MENU.map((item) => {
        const aktif =
          item.href === '/'
            ? pathname === '/' || pathname.startsWith('/materi')
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
              aktif
                ? 'bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-soft'
                : 'text-brand-800 hover:bg-brand-100'
            }`}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {item.icon}
            </svg>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function UserBox({ name, email }) {
  return (
    <div className="mt-auto">
      <div className="flex items-center gap-3 rounded-2xl border border-brand-100 bg-brand-100/50 p-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
          {name.charAt(0).toUpperCase()}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-brand-900">{name}</p>
          <p className="truncate text-xs text-brand-800/70">{email}</p>
        </div>
      </div>
      <a
        href="/api/logout"
        className="mt-3 flex items-center justify-center rounded-xl border border-brand-200 bg-white px-4 py-2.5 text-sm font-semibold text-brand-800 transition hover:bg-brand-100"
      >
        Keluar
      </a>
    </div>
  );
}

export default function Sidebar({ name, email }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Header mobile */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-brand-100 bg-white/90 px-4 py-3 backdrop-blur lg:hidden">
        <Brand />
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Buka menu"
          className="rounded-xl p-2 text-brand-700 hover:bg-brand-100"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </header>

      {/* Drawer mobile */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Tutup menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-brand-900/40"
          />
          <aside className="absolute inset-y-0 right-0 flex w-72 max-w-[85%] flex-col rounded-l-3xl bg-white p-5 shadow-2xl">
            <div className="flex items-start justify-between">
              <Brand />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Tutup menu"
                className="rounded-lg p-1.5 text-brand-700 hover:bg-brand-100"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <Menu onNavigate={() => setOpen(false)} />
            <UserBox name={name} email={email} />
          </aside>
        </div>
      )}

      {/* Sidebar desktop */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 flex-col border-r border-brand-100 bg-white p-6 lg:flex">
        <Brand />
        <Menu />
        <UserBox name={name} email={email} />
      </aside>
    </>
  );
    }
