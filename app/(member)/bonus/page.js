
'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function BonusContent({ items }) {
  const searchParams = useSearchParams();
  const bonusId = searchParams.get('lihat');

  const itemAktif = items.find(
    (item) => String(item.id) === String(bonusId)
  );

  // Tampilan daftar bonus
  if (itemAktif) {
    const bonus = Array.isArray(itemAktif.panduan)
      ? itemAktif.panduan.filter(
          (p) => p && String(p.url || '').trim() !== ''
        )
      : [];

    return (
      <main className="mx-auto w-full max-w-5xl text-white">
        <Link
          href="/bonus"
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-[#D8B7F5] transition hover:border-purple-400/40 hover:bg-purple-500/10"
        >
          <span aria-hidden="true">‹</span>
          Bonus
        </Link>

        <header className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B875F5]">
            Evegrow Digital Learning
          </p>

          <h1 className="mt-3 break-words text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
            {itemAktif.judul}
          </h1>

          <div className="mt-5 h-1 w-28 rounded-full bg-gradient-to-r from-[#C026D3] to-[#8B5CF6]" />
        </header>

        <div className="flex flex-col gap-3">
          {bonus.map((p, i) => (
            <a
              key={i}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-5 transition hover:border-purple-400/40 hover:bg-purple-500/[0.08] sm:px-5"
            >
              <div className="flex min-w-0 items-center gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#C026D3] to-[#8B5CF6] text-xl font-bold text-white shadow-lg">
                  {i + 1}
                </span>

                <span className="min-w-0 break-words text-base font-semibold leading-7 text-[#D8B7F5] transition group-hover:text-white sm:text-lg">
                  {p.judul || `Bonus ${i + 1}`}
                </span>
              </div>

              <span
                className="shrink-0 text-lg text-purple-300 transition group-hover:translate-x-1 group-hover:text-white"
                aria-hidden="true"
              >
                ↗
              </span>
            </a>
          ))}
        </div>
      </main>
    );
  }

  // Tampilan utama Bonus Eksklusif
  return (
    <main className="mx-auto w-full max-w-5xl text-white">
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

      {items.length === 0 ? (
        <p className="text-sm text-purple-200/60">
          Belum ada bonus tersedia.
        </p>
      ) : (
        <div className="flex flex-col gap-5">
          {items.map((item) => (
            <article
              key={item.id}
              className="overflow-hidden rounded-2xl border border-purple-400/20 bg-[#17101F] shadow-lg"
            >
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

              <div className="p-5 sm:p-6">
                <h2 className="text-lg font-bold leading-snug text-white sm:text-xl">
                  {item.judul}
                </h2>

                {item.deskripsi && (
                  <p className="mt-2 text-sm leading-6 text-purple-200/70">
                    {item.deskripsi}
                  </p>
                )}

                <Link
                  href={`/bonus?lihat=${item.id}`}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 px-5 py-4 text-sm font-semibold text-white transition hover:brightness-110"
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

export default function BonusPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto w-full max-w-5xl text-white">
          <p className="text-sm text-purple-200/60">
            Memuat bonus...
          </p>
        </main>
      }
    >
      <BonusLoader />
    </Suspense>
  );
}

import { getItems } from '@/lib/konten.js';

function BonusLoader() {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    getItems('bonus').then(setItems);
  }, []);

  return <BonusContent items={items} />;
                }
