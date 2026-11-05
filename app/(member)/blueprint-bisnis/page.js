import Link from 'next/link';
import { getItems } from '@/lib/konten.js';

export const dynamic = 'force-dynamic';

// Membuat teks di antara **...** menjadi bold.
function renderBold(text) {
  if (typeof text !== 'string') {
    return text;
  }

  return text.split(/(\*\*.*?\*\*)/gs).map((part, index) => {
    const isBold = part.startsWith('**') && part.endsWith('**');

    if (isBold) {
      return (
        <strong key={index} className="font-bold">
          {part.slice(2, -2)}
        </strong>
      );
    }

    return part;
  });
}

export default async function BlueprintBisnisPage() {
  const items = await getItems('blueprint-bisnis');

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 text-white sm:px-6 lg:px-8">
      {/* Header */}
      <header className="mb-8">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-purple-300 sm:text-sm">
          EVEGROW DIGITAL LEARNING
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Blueprint Bisnis Digital
        </h1>

        <p className="mt-3 text-base leading-relaxed text-white/75 sm:text-lg">
          Pilih blueprint untuk mulai belajar.
        </p>

        {/* Garis dekorasi */}
        <div className="mt-8 h-1.5 w-48 rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-500" />
      </header>

      {/* Grid Blueprint */}
      {items.length === 0 ? (
        <p className="text-sm text-purple-200/60">
          Belum ada tutorial tersedia.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/blueprint-bisnis/${item.id}`}
              className="group block overflow-hidden rounded-2xl border border-white/10 bg-[#17121d] transition-all duration-300 hover:-translate-y-1 hover:border-purple-400/40 hover:shadow-lg hover:shadow-purple-500/10"
            >
              {/* Cover (kotak hanya muncul jika ada datanya) */}
              {item.cover && (
                <div className="aspect-video overflow-hidden bg-white/5">
                  <img
                    src={item.cover.replaceAll('&amp;', '&')}
                    alt={item.judul || 'Cover tutorial'}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}

              {/* Judul */}
              <div className="px-3 pb-3 pt-2 sm:px-4 sm:pb-3 sm:pt-2">
                <h2 className="line-clamp-2 text-sm font-semibold leading-5 text-white sm:text-base sm:leading-6">
                  {renderBold(item.judul)}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
