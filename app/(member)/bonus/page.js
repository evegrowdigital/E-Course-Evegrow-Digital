
import { getItems } from '@/lib/konten.js';

export const dynamic = 'force-dynamic';

export default async function BonusPage() {
  // Tetap gunakan sumber data bonus yang lama
  const items = await getItems('bonus');

  return (
    <main className="mx-auto w-full max-w-5xl text-white">

      {/* Header */}
      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B875F5]">
          Evegrow Digital Learning
        </p>

        <h1 className="mt-3 break-words text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
          Bonus Eksklusif
        </h1>

        <div className="mt-5 h-1 w-28 rounded-full bg-gradient-to-r from-[#C026D3] to-[#8B5CF6]" />
      </header>

      {/* Daftar Bonus */}
      {items.length === 0 ? (
        <p className="text-sm text-purple-200/60">
          Belum ada bonus tersedia.
        </p>
      ) : (
        <div className="flex flex-col gap-7">
          {items.map((item, index) => {
            const bonus = Array.isArray(item.panduan)
              ? item.panduan.filter(
                  (p) => p && String(p.url || '').trim() !== ''
                )
              : [];

            return (
              <section key={item.id}>

                {/* Judul Bonus */}
                <h2 className="mb-5 flex items-start gap-4 text-lg font-bold leading-snug text-white sm:text-xl">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#C026D3] to-[#8B5CF6] text-lg font-bold text-white shadow-lg">
                    {index + 1}
                  </span>

                  <span className="pt-2">
                    {item.judul}
                  </span>
                </h2>

                {/* Daftar Akses Bonus */}
                {bonus.length > 0 && (
                  <div className="flex flex-col gap-3">
                    {bonus.map((p, i) => (
                      <a
                        key={i}
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-4 transition hover:border-purple-400/40 hover:bg-purple-500/[0.08] sm:px-5"
                      >
                        <div className="flex min-w-0 items-start gap-3">

                          {/* Nomor */}
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#C026D3] to-[#8B5CF6] text-xs font-bold text-white">
                            {i + 1}
                          </span>

                          {/* Judul Bonus */}
                          <div className="min-w-0">
                            <p className="break-words text-sm font-semibold leading-6 text-[#D8B7F5] transition group-hover:text-white sm:text-base">
                              {p.judul || `Bonus ${i + 1}`}
                            </p>

                            <p className="mt-1 text-xs text-purple-200/50">
                              Klik untuk Akses Bonus
                            </p>
                          </div>
                        </div>

                        {/* Ikon Akses */}
                        <span
                          className="shrink-0 text-lg text-purple-300 transition group-hover:translate-x-1 group-hover:text-white"
                          aria-hidden="true"
                        >
                          ↗
                        </span>
                      </a>
                    ))}
                  </div>
                )}

              </section>
            );
          })}
        </div>
      )}

    </main>
  );
    }
                          
