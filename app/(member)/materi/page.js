import Link from 'next/link';
import { getItems } from '@/lib/konten.js';
import { daftarLink } from './[id]/tutorial-utils';

export const dynamic = 'force-dynamic';

// Ambil link pertama yang valid dari data.
function ambilLinkLangsung(item) {
  const links = daftarLink(item) || [];
  const valid = links.find(
    (l) => l && typeof l.url === 'string' && l.url.trim() !== ''
  );
  return valid ? valid.url.trim() : '';
}

export default async function MateriPage() {
  const data = await getItems('materi');
  const items = Array.isArray(data) ? data : [];

  return (
    <main className="mx-auto w-full max-w-[1600px] px-4 pb-12 text-white sm:px-6 lg:px-8">
      {/* header & kondisi kosong: sama seperti sebelumnya */}

      <div className="grid grid-cols-2 items-start gap-3 sm:gap-4 md:grid-cols-3 md:gap-5 xl:grid-cols-4">
        {items.map((item, index) => {
          const itemId = String(item.id ?? index);
          const cover = item.cover || item.thumbnail || item.gambar || '';
          const linkLangsung = ambilLinkLangsung(item);

          const className =
            'group block min-w-0 overflow-hidden rounded-xl border border-purple-300/20 bg-[#17101F] shadow-[0_8px_24px_-14px_rgba(0,0,0,0.8)] transition duration-300 hover:border-purple-400/50';

          const isi = (
            <>
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

              <div className="flex min-h-[56px] items-center px-3 py-2.5 sm:min-h-[64px] sm:px-4">
                <h2 className="line-clamp-2 break-words text-[13px] font-semibold leading-[1.45] text-white sm:text-sm md:text-[15px]">
                  {item.judul || 'Materi Tanpa Judul'}
                </h2>
              </div>
            </>
          );

          // Ada link di data: langsung buka link-nya
          if (linkLangsung) {
            return (
              <a
                key={`${itemId}-${index}`}
                href={linkLangsung}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
              >
                {isi}
              </a>
            );
          }

          // Tidak ada link: tetap ke halaman detail
          return (
            <Link
              key={`${itemId}-${index}`}
              href={`/materi/${encodeURIComponent(itemId)}`}
              className={className}
            >
              {isi}
            </Link>
          );
        })}
      </div>
    </main>
  );
}
