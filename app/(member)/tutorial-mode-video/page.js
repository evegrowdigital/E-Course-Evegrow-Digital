import Link from 'next/link';
import { getItems } from '@/lib/konten.js';

export const dynamic = 'force-dynamic';

export default async function TutorialModeVideoPage() {
  const items = await getItems('tutorial-mode-video');

  return (
    <main className="text-white">
      <h1 className="mb-5 text-2xl font-bold">Tutorial Mode Video</h1>

      {items.length === 0 ? (
        <p className="text-sm text-purple-200/60">Belum ada tutorial tersedia.</p>
      ) : (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/tutorial-mode-video/${item.id}`}
              className="group block overflow-hidden rounded-2xl border border-purple-200 bg-gradient-to-b from-white to-purple-50 shadow-[0_10px_24px_-14px_rgba(168,85,247,0.55)] transition hover:-translate-y-1 hover:border-purple-400 hover:shadow-[0_16px_30px_-14px_rgba(168,85,247,0.7)]"
            >
              <div className="aspect-video overflow-hidden bg-gradient-to-br from-purple-200 to-pink-200">
                {item.cover && (
                  <img
                    src={item.cover}
                    alt={item.judul || 'Cover tutorial'}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                )}
              </div>

              <div className="p-3">
                <h2 className="line-clamp-2 text-sm font-semibold text-[#3b1d63] group-hover:text-purple-700 sm:text-base">
                  {item.judul}
                </h2>
                {item.deskripsi && (
                  <p className="mt-1 line-clamp-2 text-xs text-purple-900/70">
                    {item.deskripsi}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
