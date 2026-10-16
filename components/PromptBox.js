'use client';

import { useState } from 'react';

// Tulisan di dalam kurung siku, misalnya [ISI BISNIS KAMU], diberi warna khusus
function IsiPrompt({ teks }) {
  const bagian = String(teks).split(/(\[[^\]\n]+\])/g);

  return (
    <>
      {bagian.map((b, i) =>
        b.startsWith('[') && b.endsWith(']') ? (
          <span
            key={i}
            className="rounded bg-amber-100 px-1 font-semibold text-amber-800"
          >
            {b}
          </span>
        ) : (
          b
        )
      )}
    </>
  );
}

export default function PromptBox({ judul, isi }) {
  const [tersalin, setTersalin] = useState(false);

  async function salin() {
    try {
      await navigator.clipboard.writeText(isi);
    } catch {
      // Cadangan untuk browser yang menolak clipboard API
      const ta = document.createElement('textarea');
      ta.value = isi;
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
    <div className="overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-soft">
      <div className="flex items-center justify-between gap-3 border-b border-brand-100 bg-brand-100/50 px-4 py-3">
        <p className="min-w-0 truncate text-sm font-semibold text-brand-900">{judul}</p>
        <button
          type="button"
          onClick={salin}
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold transition sm:text-sm ${
            tersalin
              ? 'bg-green-600 text-white'
              : 'bg-gradient-to-r from-brand-600 to-brand-500 text-white hover:from-brand-700 hover:to-brand-600'
          }`}
        >
          {tersalin ? (
            <>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 13l4 4L19 7" />
              </svg>
              Tersalin
            </>
          ) : (
            <>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="9" y="9" width="12" height="12" rx="2" />
                <path d="M5 15V5a2 2 0 012-2h10" />
              </svg>
              Salin Prompt
            </>
          )}
        </button>
      </div>
      <div className="max-h-64 overflow-y-auto whitespace-pre-wrap break-words px-4 py-3 text-[13px] leading-relaxed text-ink/90 sm:text-sm">
        <IsiPrompt teks={isi} />
      </div>
    </div>
  );
            }
