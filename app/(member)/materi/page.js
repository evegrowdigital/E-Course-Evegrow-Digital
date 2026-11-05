import path from 'path';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

// Membaca data.js dari folder M1, M2, M3, dan seterusnya.
// Hanya membaca satu tingkat folder agar file lain tidak ikut terambil.
const files = require.context(
  '@/data/materi',
  true,
  /^\.\/[Mm]\d+\/data\.js$/
);

// Ambil daftar file dan pastikan setiap path hanya diproses sekali.
const daftarFile = [...new Set(files.keys())].sort((a, b) =>
  a.localeCompare(b, undefined, {
    numeric: true,
    sensitivity: 'base',
  })
);

// Gabungkan seluruh data materi.
const daftarMateri = daftarFile.flatMap((file) => {
  const moduleData = files(file);
  const data = moduleData.default;

  if (!Array.isArray(data)) {
    console.warn(`Data materi harus berupa array: ${file}`);
    return [];
  }

  return data.map((item, index) => ({
    ...item,
    id: `${file}-${index}`,
    folder: path.basename(path.dirname(file)),
  }));
});

export default function MateriPage() {
  const items = daftarMateri;

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="mb-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-purple-300">
          EVEGROW DIGITAL
        </p>

        <h1 className="text-2xl font-bold text-white sm:text-3xl">
          Materi
        </h1>

        <p className="mt-2 text-sm text-white/60">
          Kumpulan materi untuk membantu kamu belajar dan mengembangkan bisnis
          digital.
        </p>
      </header>

      {/* Daftar Materi */}
      {items.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.url || '#'}
              target={item.url ? '_blank' : undefined}
              rel={item.url ? 'noopener noreferrer' : undefined}
              className={`group block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] transition duration-300 ${
                item.url
                  ? 'cursor-pointer hover:-translate-y-1 hover:border-purple-400/40 hover:bg-white/[0.07]'
                  : 'cursor-default'
              }`}
            >
              {/* Cover */}
              <div className="relative aspect-video overflow-hidden bg-white/5">
                {item.cover ? (
                  <img
                    src={item.cover.replaceAll('&amp;', '&')}
                    alt={item.judul || 'Cover materi'}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="text-3xl">📚</span>
                  </div>
                )}
              </div>

              {/* Informasi Materi */}
              <div className="p-3 sm:p-4">
                <h2 className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold leading-5 text-white sm:text-base">
                  {item.judul || 'Materi tanpa judul'}
                </h2>

                {item.deskripsi && (
                  <p className="mt-2 line-clamp-2 text-xs leading-5 text-white/50">
                    {item.deskripsi}
                  </p>
                )}

                <div className="mt-3 flex items-center justify-between gap-2">
                  <span className="text-[11px] font-medium text-purple-300 sm:text-xs">
                    {item.folder}
                  </span>

                  <span className="flex items-center gap-1 text-xs font-semibold text-white/70 transition group-hover:text-purple-300">
                    Akses
                    <svg
                      viewBox="0 0 20 20"
                      fill="none"
                      className="h-4 w-4"
                      aria-hidden="true"
                    >
                      <path
                        d="M4.166 10h11.667M10 4.167 15.833 10 10 15.833"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-12 text-center">
          <div className="mb-3 text-3xl">📚</div>

          <h2 className="text-base font-semibold text-white">
            Belum ada materi
          </h2>

          <p className="mt-2 text-sm text-white/50">
            Pastikan file data.js tersedia di folder data/materi/M1,
            data/materi/M2, dan seterusnya.
          </p>
        </div>
      )}
    </main>
  );
        }
