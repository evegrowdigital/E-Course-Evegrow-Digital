import Link from 'next/link';
import { getItems } from '@/lib/konten.js';
import { daftarVideo } from './[id]/tutorial-utils';

export const dynamic = 'force-dynamic';

// Ambil cover: cover manual dulu, lalu thumbnail video pertama.
function ambilCover(item) {
  const manual = item.cover || item.thumbnail || item.gambar;
  if (typeof manual === 'string' && manual.trim()) return manual.trim();

  const videoPertama = daftarVideo(item)?.[0];
  if (videoPertama?.id) {
    return `https://i.ytimg.com/vi/${videoPertama.id}/hqdefault.jpg`;
  }

  return '';
}

export default async function TutorialModeVideoPage() {
  const data = await getItems('tutorial-mode-video');
  const items = Array.isArray(data) ? data : [];

  return (
    <main className="mx-auto w-full max-w-[1600px] px-4 pb-12 text-white sm:px-6 lg:px-8">
      {/* Header */}
      <header className="mb-6 sm:mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-purple-300">
          Evegrow Digital Learning
        </p>

        <h1 className="mt-3 text-2xl font-bold leading-tight text-white sm:text-3xl">
          Tutorial Mode Video
        </h1>

        <p className="mt-2 text-sm text-purple-100">
          Pilih materi untuk mulai belajar.
        </p>

        <div className="mt-5 h-1 w-28 rounded-full bg-gradient-to-r from-[#C026D3] to-[#8B5CF6]" />
      </header>

      {/* Daftar Materi */}
      {items.length === 0 ? (
        <div className="rounded-xl border border-purple-400/20 bg-white/5 p-6 text-center">
          <p className="text-sm text-purple-100">
            Belum ada materi Tutorial Mode Video tersedia.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 items-start gap-3 sm:gap-4 md:grid-cols-3 md:gap-5 xl:grid-cols-4">
          {items.map((item, index) => {
            // Logika id sama persis dengan halaman detail
            const itemId = String(item.id ?? index);
            const cover = ambilCover(item);
            const href = `/tutorial-mode-video/${encodeURIComponent(itemId)}`;

            return (
              <Link
                key={`${itemId}-${index}`}
                href={href}
                className="group block min-w-0 overflow-hidden rounded-xl border border-purple-300/20 bg-[#17101F] shadow-[0_8px_24px_-14px_rgba(0,0,0,0.8)] transition duration-300 hover:border-purple-400/50 hover:shadow-[0_12px_30px_-12px_rgba(168,85,247,0.25)]"
              >
                {/* Cover 16:9 */}
                <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-[#7024A8] via-[#9837D9] to-[#B75AFF]">
                  {cover ? (
                    <img
                      src={cover}
                      alt={item.judul || 'Cover materi'}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <span className="text-4xl font-bold text-white/30 sm:text-5xl">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                  )}
                </div>

                {/* Judul */}
                <div className="flex min-h-[56px] items-center px-3 py-2.5 sm:min-h-[64px] sm:px-4">
                  <h2 className="line-clamp-2 break-words text-[13px] font-semibold leading-[1.45] text-white sm:text-sm md:text-[15px]">
                    {item.judul || 'Materi Tanpa Judul'}
                  </h2>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}
