'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LogoutButton from './LogoutButton';
import MenuIcon from './MenuIcon';
import Brand from './Brand';

function MiniIcon({ colors, children }) {
  const [c1, c2] = colors;
  return (
    <span className="mini" style={{ background: `linear-gradient(160deg, ${c1}, ${c2})` }}>
      {children}
    </span>
  );
}

function SidebarContent({ name, email, menuItems, onNavigate }) {
  const pathname = usePathname();
  const initial = (name || email || '?').trim().charAt(0).toUpperCase();

  const isActive = (href) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <div className="sb">
      <div className="sb-logo">
        <Brand />
      </div>

      <nav className="sb-nav">
        <Link
          href="/"
          onClick={onNavigate}
          className={`sb-row ${isActive('/') ? 'active' : ''}`}
        >
          <MiniIcon colors={['#c78bff', '#9a3df0']}>
            <svg className="ico-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 11l9-8 9 8" />
              <path d="M5 10v10h5v-6h4v6h5V10" />
            </svg>
          </MiniIcon>
          Beranda
        </Link>

        {menuItems.map((item) => {
          const content = (
            <>
              <MiniIcon colors={item.colors}>
                <MenuIcon name={item.icon} className="ico-sm" />
              </MiniIcon>
              <span className="sb-label">{item.label}</span>
              {!item.href && <span className="badge">Segera hadir</span>}
            </>
          );

          if (!item.href) {
            return (
              <div key={item.label} className="sb-row disabled">
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
                className="sb-row"
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
              className={`sb-row ${isActive(item.href) ? 'active' : ''}`}
            >
              {content}
            </Link>
          );
        })}

        <Link
          href="/profil"
          onClick={onNavigate}
          className={`sb-row ${isActive('/profil') ? 'active' : ''}`}
        >
          <MiniIcon colors={['#dbb8ff', '#b05cf7']}>
            <svg className="ico-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
            </svg>
          </MiniIcon>
          Profil Saya
        </Link>
      </nav>

      <div className="sb-user">
        <Link href="/profil" onClick={onNavigate} className="sb-profile">
          <span className="avatar">{initial}</span>
          <span className="sb-profile-text">
            <span className="sb-name trunc">{name}</span>
            <span className="sb-email trunc">{email}</span>
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
      <aside className="sb-aside">
        <SidebarContent name={name} email={email} menuItems={menuItems} />
      </aside>

      <header className="sb-topbar">
        <Brand />
        <button onClick={() => setOpen(true)} aria-label="Buka menu" className="sb-burger">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>

      {open && (
        <div className="sb-overlay">
          <button aria-label="Tutup menu" onClick={() => setOpen(false)} className="sb-backdrop" />
          <div className="sb-drawer">
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
