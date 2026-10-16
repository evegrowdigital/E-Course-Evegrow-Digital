'use client';

import { useState } from 'react';

export default function SalinLink({ link }) {
  const [tersalin, setTersalin] = useState(false);

  async function salin() {
    try {
      await navigator.clipboard.writeText(link);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = link;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setTersalin(true);
    setTimeout(() => setTersalin(false), 2000);
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="min-w-0 flex-1 truncate rounded-xl border border-brand-100 bg-brand-100/50 px-4 py-3 text-sm text-brand-900">
        {link}
      </div>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={salin}
          className={`flex-1 rounded-xl px-5 py-3 text-sm font-semibold text-white transition sm:flex-none ${
            tersalin
              ? 'bg-green-600'
              : 'bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600'
          }`}
        >
          {tersalin ? 'Tersalin' : 'Salin Link'}
        </button>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 rounded-xl border border-brand-200 bg-white px-5 py-3 text-center text-sm font-semibold text-brand-800 transition hover:bg-brand-100 sm:flex-none"
        >
          Buka
        </a>
      </div>
    </div>
  );
}
