'use client';

import { useState } from 'react';

export default function CopyPrompt({ prompt = '' }) {
  const [copied, setCopied] = useState(false);

  // Sorot teks di dalam tanda kurung siku, contoh: [nama produk]
  const renderPrompt = (text) => {
    const parts = text.split(/(\[[^\]]+\])/g);

    return parts.map((part, index) => {
      const isPlaceholder = /^\[[^\]]+\]$/.test(part);

      if (isPlaceholder) {
        return (
          <span
            key={index}
            className="font-bold text-[#E9A8FF]"
          >
            {part}
          </span>
        );
      }

      return <span key={index}>{part}</span>;
    });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error('Gagal menyalin prompt:', error);
      setCopied(false);
    }
  };

  return (
    <div>
      {/* Prompt */}
      <div className="whitespace-pre-wrap break-words rounded-xl border border-white/[0.06] bg-black/20 p-4 text-xs leading-6 text-purple-100/80 sm:text-sm">
        {prompt ? renderPrompt(prompt) : 'Isi prompt belum tersedia.'}
      </div>

      {/* Tombol Salin */}
      <button
        type="button"
        onClick={handleCopy}
        disabled={!prompt}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#C026D3] to-[#8B5CF6] px-4 py-3 text-sm font-semibold text-white transition hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
      >
        {copied ? (
          <>
            <span aria-hidden="true">✓</span>
            Prompt Berhasil Disalin
          </>
        ) : (
          <>
            <span aria-hidden="true">▣</span>
            Salin Prompt
          </>
        )}
      </button>
    </div>
  );
}
