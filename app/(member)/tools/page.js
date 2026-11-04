
import Link from 'next/link';
import { getItems } from '@/lib/konten.js';

export const dynamic = 'force-dynamic';

export default async function ToolsPage() {
  const items = await getItems('tools');

  return (
    <main className="mx-auto w-full max-w-5xl text-white">

      {/* Header */}
      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B875F5]">
          Evegrow Digital Learning
        </p>

        <h1 className="mt-3 text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
          Tools Digital
        </h1>

        <div className="mt-5 h-1 w-28 rounded-full bg-gradient-to-r from-[#C026D3] to-[#8B5CF6]" />
      </header>

      {/* Daftar Tools */}
      {items.length === 0 ? (
        <p className="text-sm text-purple-200/60">
          Belum ada tools tersedia.
        </p>
      ) : (
        <div className="flex flex-col gap-5">
          {items.map((item, i) => (
            <article key={item.id}>

              {/* Judul Tools */}
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#C026D3] to-[#8B5CF6] text-base font-bold text-white shadow-lg">
                  {i + 1}
                </span>

                <h2 className="min-w-0 break-words text-base font-bold leading-6 text-white sm:text-lg">
                  {item.judul}
                </h2>
              </div>

              {/* Deskripsi */}
              {item.deskripsi && (
                <p className="mb-3 ml-[60px] text-sm leading-6 text-purple-200/70">
                  {item.deskripsi}
                </p>
              )}

              {/* Tombol Akses Tools */}
              {item.tools && (
                <a
                  href={item.tools}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-[60px] inline-flex items-center gap-2 rounded-xl border border-purple-400/30 bg-purple-500/10 px-4 py-3 text-sm font-semibold text-[#D8B7F5] transition hover:border-purple-400/50 hover:bg-purple-500/20 hover:text-white"
                >
                  Akses Tools
                  <span aria-hidden="true">↗</span>
                </a>
              )}

            </article>
          ))}
        </div>
      )}

    </main>
  );
                    }
