import path from 'path';

export const dynamic = 'force-dynamic';

// Membaca data.js dari folder M1, M2, M3, dan seterusnya.
const files = require.context(
  '@/data/materi',
  true,
  /^\.\/[Mm]\d+\/data\.js$/
);

// Urutkan file berdasarkan nomor folder.
const daftarFile = [...new Set(files.keys())].sort((a, b) =>
  a.localeCompare(b, undefined, {
    numeric: true,
    sensitivity: 'base',
  })
);

// Gabungkan seluruh data materi.
const semuaMateri = daftarFile.flatMap((file) => {
  const data = files(file).default;

  if (!Array.isArray(data)) {
    return [];
  }

  return data.map((item, index) => ({
    ...item,
    id: `${file}-${index}`,
    folder: path.basename(path.dirname(file)),
  }));
});

// Hilangkan data yang memiliki URL sama.
const daftarMateri = [
  ...new Map(
    semuaMateri.map((item) => [
      item.url || item.id,
      item,
    ])
  ).values(),
];

export default function MateriPage() {
  const items = daftarMateri;

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="mb-8">
        {/* Tombol kembali ke beranda */}
        <a
          href="/"
          className="mb-6 inline-flex items-center gap-2 rounded-xl border border-purple-400/20 bg-purple-500/10 px-4 py-2.5 text-sm font-semibold text-purple-200 transition hover:border-purple-400/40 hover:bg-purple-500/20"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          Kembali ke Beranda
        </a>

        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-purple-300 sm:text-sm">
          EVEGROW DIGITAL LEARNING
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Materi
        </h1>

        <p className="mt-3 text-base leading-relaxed text-white/75 sm:text-lg">
          Pilih materi untuk mulai belajar.
        </p>

        {/* Garis dekorasi */}
        <div className="mt-8 h-1.5 w-48 rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-500" />
      </header>

      {/* Grid Materi */}
      {items.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {items.map((item) => {
            const url = item.url?.trim();

            return (
              <a
                key={item.id}
                href={url || undefined}
                target={url ? '_blank' : undefined}
                rel={url ? 'noopener noreferrer' : undefined}
                className={`group block overflow-hidden rounded-2xl border border-white/10 bg-[#17121d] transition-all duration-300 ${
                  url
                    ? 'cursor-pointer hover:-translate-y-1 hover:border-purple-400/40 hover:shadow-lg hover:shadow-purple-500/10'
                    : 'cursor-default'
                }`}
              >
                {/* Cover */}
                <div className="aspect-video overflow-hidden bg-white/5">
                  {item.cover ? (
                    <img
                      src={item.cover.replaceAll('&amp;', '&')}
                      alt={item.judul || 'Cover materi'}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <span className="text-3xl">📚</span>
                    </div>
                  )}
                </div>

                {/* Judul Materi */}
                <div className="px-3 pb-3 pt-2 sm:px-4 sm:pb-3 sm:pt-2">
                  <h2 className="line-clamp-2 text-sm font-semibold leading-5 text-white sm:text-base sm:leading-6">
                    {item.judul || 'Materi tanpa judul'}
                  </h2>
                </div>
              </a>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-12 text-center">
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
