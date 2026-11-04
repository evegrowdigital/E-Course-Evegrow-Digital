
import Link from 'next/link';
import { getItems } from '@/lib/konten.js';

export const dynamic = 'force-dynamic';

export default async function BonusPage() {
  const items = await getItems('bonus');

  return (
    <main className="mx-auto w-full max-w-4xl text-white">
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

      {/* Daftar Bonus - Satu Kolom */}
      {items.length === 0 ? (
        <div className="rounded-2xl border border-purple-400/20 bg-white/[0.04] p-6 text-center">
          <p className="text-sm text-purple-200/60">
            Belum ada bonus tersedia.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {items.map((item) => (
            <article
              key={item.id}
              className="overflow-hidden rounded-2xl border border-purple-400/20 bg-[#17101F] shadow-lg transition hover:border-purple-400/40"
            >
              {/* Cover */}
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

              {/* Konten */}
              <div className="p-5 sm:p-6">
                <h2 className="text-lg font-bold leading-snug text-white">
                  {item.judul}
                </h2>

                {item.deskripsi && (
                  <p className="mt-2 text-sm leading-6 text-purple-200/70">
                    {item.deskripsi}
                  </p>
                )}

                {/* Tombol Detail */}
                <Link
                  href={`/bonus/${item.id}`}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110 sm:w-auto"
                >
                  Lihat Bonus
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
