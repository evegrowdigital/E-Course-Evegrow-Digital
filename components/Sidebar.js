'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { KATEGORI, SOSMED } from '@/lib/kategori.js';

const LOGO_SRC = 'https://i.ibb.co.com/BHQvvZNP/Welcome-1024-x-1024-piksel-20261018-204041-0000.png';

const IKON = {
  'produk-digital': (
    <>
      <path d="M21 8l-9-5-9 5 9 5 9-5z" />
      <path d="M3 8v8l9 5 9-5V8" />
      <path d="M12 13v8" />
    </>
  ),
  'animasi-ai': (
    <>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="M10 9.5v5l4.5-2.5L10 9.5z" />
    </>
  ),
  'affiliate-ai': (
    <>
      <path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1" />
      <path d="M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1" />
    </>
  ),
  dashboard: (
    <>
      <path d="M4 20V10" />
      <path d="M10 20V4" />
      <path d="M16 20v-7" />
      <path d="M22 20H2" />
    </>
  ),
  profil: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0116 0" />
    </>
  ),
};

const MENU = [
  ...KATEGORI.map((k) => ({
    href: `/${k.slug}`,
    label: k.label,
    ikon: IKON[k.slug],
    slug: k.slug,
  })),
  { href: '/affiliate', label: 'Dashboard Affiliate', ikon: IKON.dashboard },
  { href: '/profil', label: 'Profil Saya', ikon: IKON.profil },
];

const SOSMED_IKON = {
  TikTok: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  ),
  Instagram: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  Threads: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <text x="12" y="18" textAnchor="middle" fontSize="18" fontWeight="700" fontFamily="sans-serif">
        @
      </text>
    </svg>
  ),
};

function Brand() {
  return (
    <Link href="/" className="flex items-center gap-3">
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
    </Link>
  );
}

function Menu({ counts, onNavigate }) {
  const pathname = usePathname();

  return (
    <nav className="mt-6 flex flex-col gap-1.5">
      {MENU.map((item) => {
        const aktif = pathname === item.href || pathname.startsWith(`${item.href}/`);
        const jumlah = item.slug ? counts?.[item.slug] ?? 0 : null;

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
              className="shrink-0"
            >
              {item.ikon}
            </svg>
            <span className="flex-1">{item.label}</span>
            {jumlah !== null && (
              <span
                className={`flex h-6 min-w-[1.5rem] items-center justify-center rounded-full px-1.5 text-xs font-bold ${
                  aktif ? 'bg-white/25 text-white' : 'bg-brand-100 text-brand-700'
                }`}
              >
                {jumlah}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}

function Sosmed() {
  return (
    <div className="mt-6">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-brand-600">
        Ikuti Kami
      </p>
      <div className="flex gap-3">
        {SOSMED.map((s) => (
          <a
            key={s.nama}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.nama}
            title={s.nama}
            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-100 text-brand-700 shadow-soft ring-2 ring-brand-100 transition hover:-translate-y-0.5 hover:bg-brand-600 hover:text-white"
          >
            {SOSMED_IKON[s.nama]}
          </a>
        ))}
      </div>
    </div>
  );
}

function UserBox({ name, email }) {
  return (
    <div className="mt-auto pt-6">
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

export default function Sidebar({ name, email, counts }) {
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
          <aside className="absolute inset-y-0 right-0 flex w-72 max-w-[85%] flex-col overflow-y-auto rounded-l-3xl bg-white p-5 shadow-2xl">
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
            <Menu counts={counts} onNavigate={() => setOpen(false)} />
            <Sosmed />
            <UserBox name={name} email={email} />
          </aside>
        </div>
      )}

      {/* Sidebar desktop */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 flex-col overflow-y-auto border-r border-brand-100 bg-white p-6 lg:flex">
        <Brand />
        <Menu counts={counts} />
        <Sosmed />
        <UserBox name={name} email={email} />
      </aside>
    </>
  );
}
