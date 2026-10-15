'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LogoutButton from './LogoutButton';

const LOGO = 'https://i.ibb.co.com/v4vnDrZr/file-0000000095ac820695edea0b24952bb0.png';

const NAV = [
  {
    href: '/',
    label: 'Materi Kelas',
    icon: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </>
    ),
  },
  {
    href: '/profil',
    label: 'Profil Saya',
    icon: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
      </>
    ),
  },
];

function SidebarContent({ name, email, onNavigate }) {
  const pathname = usePathname();
  const initial = (name || email || '?').trim().charAt(0).toUpperCase();

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="px-5 py-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={LOGO} alt="Evegrow.Digital" className="h-10 w-auto" />
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {NAV.map((item) => {
          const active =
            item.href === '/' ? pathname === '/' || pathname.startsWith('/materi') : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                active ? 'bg-brand-200 text-brand-900' : 'text-brand-800 hover:bg-brand-100'
              }`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {item.icon}
              </svg>
              {item.label}
            </Link>
          );
        })}
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

export default function Sidebar({ name, email }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-brand-100 lg:block">
        <SidebarContent name={name} email={email} />
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
            <SidebarContent name={name} email={email} onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
    }
