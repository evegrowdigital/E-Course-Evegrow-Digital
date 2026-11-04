'use client';

import { useState } from 'react';

export default function PromptItem({ judul, isi }) {
  const [status, setStatus] = useState('idle');

  const salinPrompt = async () => {
    try {
      await navigator.clipboard.writeText(String(isi || ''));

      setStatus('success');

      setTimeout(() => {
        setStatus('idle');
      }, 2000);
    } catch (error) {
      setStatus('error');

      setTimeout(() => {
        setStatus('idle');
      }, 2000);
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-purple-300/20 bg-[#17101F]">

      {/* Header Prompt */}
      <div className="flex items-center justify-between gap-3 border-b border-purple-300/15 px-4 py-3">

        <h3 className="break-words text-sm font-bold text-white sm:text-base">
          {judul || 'Prompt'}
        </h3>

        <span className="shrink-0 rounded-full border border-purple-300/20 bg-purple-500/10 px-2.5 py-1 text-[10px] font-semibold text-purple-200">
          PROMPT
        </span>

      </div>

      {/* Isi Prompt */}
      <div className="p-4">

        <div className="max-h-[420px] overflow-y-auto rounded-lg bg-black/20 p-3">

          <pre className="whitespace-pre-wrap break-words font-sans text-sm leading-7 text-purple-100">
            {String(isi || '')}
          </pre>

        </div>

        {/* Tombol Salin */}
        <button
          type="button"
          onClick={salinPrompt}
          disabled={!isi}
          className="mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-purple-300/30 bg-gradient-to-r from-[#B84CFF] to-[#8B2BE2] px-4 py-3 text-sm font-bold text-white transition duration-300 hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
        >

          {status === 'success' ? (
            <>
              <span>✓</span>
              Prompt Berhasil Disalin
            </>
          ) : status === 'error' ? (
            <>
              <span>!</span>
              Gagal Menyalin Prompt
            </>
          ) : (
            <>
              <span>⧉</span>
              Salin Prompt
            </>
          )}

        </button>

      </div>

    </div>
  );
        }
