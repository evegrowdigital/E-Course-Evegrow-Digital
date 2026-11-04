
import Link from 'next/link';
import { getItems } from '@/lib/konten.js';

export const dynamic = 'force-dynamic';

export default async function BonusPage() {
  const items = await getItems('bonus');

  return (
    <main className="mx-auto w-full max-w-5xl text-white">

      {/* Header */}
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-purple-400">
          Evegrow Digital
        </p>

        <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
          Bonus Eksklusif
        </h1>

        <p className="mt-2 text-sm text-purple-200/60">
          Akses semua bonus dan materi tambahan yang tersedia.
        </p>
      </div>

      {/* Daftar Bonus */}
      {items.length === 0 ? (
        <p className="text-sm text-purple-200/60">
          Belum ada bonus tersedia.
        </p>
      ) : (
        <div className="flex flex-col gap-5">
          {items.map((item) => {
            const bonus = Array.isArray(item.panduan)
              ? item.panduan.filter(
                  (p) => p && String(p.url || '').trim() !== ''
                )
              : [];

            return (
              <article
                key={item.id}
                className="overflow-hidden rounded-2xl border border-purple-400/20 bg-[#17101F] shadow-lg"
              >

                {/* Cover Bonus */}
                {item.cover && (
                  <div className="overflow-hidden bg-black/20">
                    <img
                      src={item.cover}
                      alt={item.judul || 'Bonus'}
                      className="block h-auto w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Judul Bonus */}
                <div className="p-5 sm:p-6">
                  <h2 className="text-lg font-bold leading-snug text-white sm:text-xl">
                    {item.judul}
                  </h2>

                  {item.deskripsi && (
                    <p className="mt-2 text-sm leading-6 text-purple-200/70">
                      {item.deskripsi}
                    </p>
                  )}

                  {/* Daftar Bonus */}
                  {bonus.length > 0 && (
                    <div className="mt-5 flex flex-col gap-3">
                      {bonus.map((p, i) => (
                        <a
                          key={i}
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-4 transition hover:border-purple-400/40 hover:bg-purple-500/[0.08]"
                        >
                          <div className="flex min-w-0 items-center gap-3">
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#C026D3] to-[#8B5CF6] text-xs font-bold text-white">
                              {i + 1}
                            </span>

                            <span className="min-w-0 break-words text-sm font-semibold text-[#D8B7F5] group-hover:text-white sm:text-base">
                              {p.judul || `Bonus ${i + 1}`}
                            </span>
                          </div>

                          <span
                            className="shrink-0 text-lg text-purple-300"
                            aria-hidden="true"
                          >
                            ↗
                          </span>
                        </a>
                      ))}
                    </div>
                  )}

                  {/* Tombol Lihat Bonus */}
                  <Link
                    href={`/bonus/${item.id}`}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 px-5 py-4 text-sm font-semibold text-white transition hover:brightness-110"
                  >
                    Lihat Bonus
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}

    </main>
  );
                      }
