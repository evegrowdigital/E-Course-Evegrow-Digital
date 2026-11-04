import { getItems } from '@/lib/konten.js';
import CopyPrompt from './CopyPrompt';

export const dynamic = 'force-dynamic';

export default async function KumpulanPromptPage() {
  const items = await getItems('kumpulan-prompt');

  return (
    <main className="mx-auto w-full max-w-5xl text-white">
      {/* Header */}
      <header className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B875F5]">
          Evegrow Digital Learning
        </p>

        <h1 className="mt-2 text-2xl font-bold leading-tight text-white sm:text-3xl">
          Kumpulan Prompt
        </h1>

        <div className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-[#C026D3] to-[#8B5CF6]" />
      </header>

      {/* Daftar Prompt */}
      {items.length === 0 ? (
        <p className="text-sm text-purple-200/60">
          Belum ada prompt tersedia.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {items.map((item, index) => (
            <details
              key={item.id ?? `${item.judul}-${index}`}
              className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-[#19151F] transition-colors duration-200 open:border-purple-400/30 open:bg-[#201827]"
            >
              <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-4 sm:px-5 [&::-webkit-details-marker]:hidden">
                {/* Nomor */}
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#C026D3] to-[#8B5CF6] text-sm font-bold text-white">
                  {index + 1}
                </span>

                {/* Judul */}
                <div className="min-w-0 flex-1">
                  <h2 className="break-words text-sm font-semibold leading-6 text-[#D8B7F5] sm:text-base">
                    {item.judul || `Prompt ${index + 1}`}
                  </h2>

                  {item.deskripsi && (
                    <p className="mt-1 break-words text-xs leading-5 text-purple-200/50">
                      {item.deskripsi}
                    </p>
                  )}
                </div>

                {/* Chevron */}
                <span
                  aria-hidden="true"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-purple-300/20 text-sm text-purple-300 transition-transform duration-200 group-open:rotate-180"
                >
                  ↓
                </span>
              </summary>

              {/* Isi Prompt */}
              <div className="border-t border-white/[0.06] px-4 py-4 sm:px-5">
                <CopyPrompt prompt={item.prompt || ''} />
              </div>
            </details>
          ))}
        </div>
      )}
    </main>
  );
}
