import { getItems } from '@/lib/konten.js';
import { getYouTubeId } from '@/lib/youtube.js';

export const dynamic = 'force-dynamic';

// Mengambil semua video dalam satu file data.
// Satu file tetap menjadi satu kartu.
function daftarVideo(item) {
  const hasil = [];

  const tambah = (judul, url) => {
    const id = getYouTubeId(url);

    if (id) {
      hasil.push({
        judul: judul || '',
        id,
      });
    }
  };

  if (item.video) {
    tambah('', item.video);
  }

  if (Array.isArray(item.videos)) {
    item.videos.forEach((v) => {
      if (typeof v === 'string') {
        tambah('', v);
      } else if (v) {
        tambah(v.judul, v.url || v.video);
      }
    });
  }

  return hasil;
}

// Mengambil link dari berbagai jenis data.
function daftarLink(item) {
  const hasil = [];

  const tambah = (judul, url) => {
    if (url && typeof url === 'string') {
      hasil.push({
        judul: judul || 'Akses Materi',
        url,
      });
    }
  };

  if (item.url || item.link || item.href) {
    tambah(
      item.tombol || item.judul,
      item.url || item.link || item.href
    );
  }

  if (Array.isArray(item.tools)) {
    item.tools.forEach((tool) => {
      if (typeof tool === 'string') {
        tambah('Akses Tools', tool);
      } else if (tool) {
        tambah(
          tool.judul || tool.nama || 'Akses Tools',
          tool.url || tool.link || tool.href
        );
      }
    });
  }

  if (Array.isArray(item.links)) {
    item.links.forEach((link) => {
      if (typeof link === 'string') {
        tambah('Akses Materi', link);
      } else if (link) {
        tambah(
          link.judul || link.nama || 'Akses Materi',
          link.url || link.link || link.href
        );
      }
    });
  }

  return hasil;
}

// Mengambil isi panduan dari file data.
function daftarPanduan(item) {
  return (
    item.panduan ||
    item.isi ||
    item.materi ||
    item.konten ||
    item.deskripsiPanduan ||
    ''
  );
}

// Menampilkan isi panduan.
// Mendukung teks, array, dan objek materi.
function TampilkanIsi({ isi }) {
  if (!isi) return null;

  if (typeof isi === 'string') {
    return (
      <div className="whitespace-pre-wrap break-words text-sm leading-7 text-purple-100">
        {isi}
      </div>
    );
  }

  if (Array.isArray(isi)) {
    return (
      <div className="space-y-4">
        {isi.map((bagian, index) => (
          <div key={index}>
            {typeof bagian === 'string' ? (
              <p className="whitespace-pre-wrap text-sm leading-7 text-purple-100">
                {bagian}
              </p>
            ) : (
              <div>
                {bagian.judul && (
                  <h4 className="mb-2 font-semibold text-white">
                    {bagian.judul}
                  </h4>
                )}

                <TampilkanIsi
                  isi={
                    bagian.isi ||
                    bagian.teks ||
                    bagian.materi ||
                    bagian.deskripsi ||
                    ''
                  }
                />
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  if (typeof isi === 'object') {
    return (
      <div className="space-y-3">
        {Object.entries(isi).map(([key, value]) => (
          <div key={key}>
            <h4 className="mb-2 font-semibold text-white">
              {key}
            </h4>

            <TampilkanIsi isi={value} />
          </div>
        ))}
      </div>
    );
  }

  return null;
}

// Tombol akses seperti referensi desain.
function TombolAkses({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex min-h-14 w-full items-center justify-center gap-2 rounded-xl border border-purple-300/40 bg-gradient-to-r from-[#B84CFF] to-[#8B2BE2] px-4 py-3 text-center text-sm font-bold text-white shadow-[0_8px_25px_-10px_rgba(168,85,247,0.8)] transition duration-300 hover:brightness-110 active:scale-[0.98] sm:min-h-16 sm:text-base"
    >
      {children}

      <span aria-hidden="true" className="text-lg">
        ↗
      </span>
    </a>
  );
}

export default async function TutorialModeVideoPage() {
  const items = await getItems('tutorial-mode-video');

  return (
    <main className="mx-auto w-full max-w-[1600px] px-4 pb-12 text-white sm:px-6 lg:px-8">

      {/* Header */}
      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-purple-300">
          Evegrow Digital Learning
        </p>

        <h1 className="mt-3 text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
          Tutorial Mode Video
        </h1>

        <p className="mt-2 text-sm text-purple-100 sm:text-base">
          Pilih materi untuk mulai belajar.
        </p>

        <div className="mt-5 h-1 w-28 rounded-full bg-gradient-to-r from-[#C026D3] to-[#8B5CF6]" />
      </header>

      {/* Daftar Materi */}
      {items.length === 0 ? (
        <div className="rounded-2xl border border-purple-400/20 bg-white/5 p-6 text-center">
          <p className="text-sm text-purple-100">
            Belum ada materi Tutorial Mode Video tersedia.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 md:gap-5 lg:gap-6 xl:grid-cols-4">

          {items.map((item, index) => {
            const videos = daftarVideo(item);
            const links = daftarLink(item);
            const panduan = daftarPanduan(item);

            const tipe = String(item.tipe || '').toLowerCase();

            const isVideo =
              tipe.includes('video') || videos.length > 0;

            const isPanduan =
              tipe.includes('panduan') ||
              tipe.includes('materi') ||
              Boolean(panduan);

            const isTools =
              tipe.includes('tools') ||
              tipe.includes('tool') ||
              links.length > 0;

            const cover =
              item.cover ||
              item.thumbnail ||
              item.gambar ||
              '';

            return (
              <details
                key={item.id || index}
                className="group min-w-0 overflow-hidden rounded-2xl border border-purple-300/20 bg-[#17101F] shadow-[0_10px_30px_-15px_rgba(0,0,0,0.8)] transition duration-300 open:col-span-2 md:open:col-span-3 xl:open:col-span-4"
              >

                {/* Kartu Materi */}
                <summary className="list-none cursor-pointer">

                  {/* Cover */}
                  <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-[#7024A8] via-[#9837D9] to-[#B75AFF]">

                    {cover ? (
                      <img
                        src={cover}
                        alt={item.judul || 'Cover materi'}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <span className="text-5xl font-black text-white/30">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                    )}

                    {/* Badge tipe materi */}
                    <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-md sm:text-xs">
                      {item.tipe || 'Materi'}
                    </span>

                    {/* Ikon buka */}
                    <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-black/40 text-lg text-white backdrop-blur-md transition group-hover:bg-purple-500">
                      ↗
                    </span>
                  </div>

                  {/* Judul */}
                  <div className="flex min-h-[100px] flex-col justify-between p-3 sm:min-h-[120px] sm:p-4">

                    <h2 className="break-words text-sm font-bold leading-6 text-white sm:text-base sm:leading-7">
                      {item.judul || 'Materi Tanpa Judul'}
                    </h2>

                    <div className="mt-3 flex items-center justify-between gap-2">
                      <span className="text-xs font-medium text-purple-200">
                        {isVideo
                          ? `${videos.length} Video`
                          : isPanduan
                            ? 'Panduan'
                            : isTools
                              ? 'Tools'
                              : 'Materi'}
                      </span>

                      <span className="text-xs font-semibold text-purple-300 transition group-open:rotate-180">
                        ▼
                      </span>
                    </div>
                  </div>
                </summary>

                {/* Isi Materi */}
                <div className="border-t border-purple-300/20 p-3 sm:p-5">

                  {/* Deskripsi */}
                  {item.deskripsi && (
                    <p className="mb-5 whitespace-pre-wrap break-words text-sm leading-7 text-purple-100">
                      {item.deskripsi}
                    </p>
                  )}

                  {/* Video */}
                  {isVideo && videos.length > 0 && (
                    <div className="space-y-5">

                      {videos.map((video, i) => (
                        <section key={video.id + i}>

                          {video.judul && (
                            <h3 className="mb-3 break-words text-sm font-semibold text-white sm:text-base">
                              {video.judul}
                            </h3>
                          )}

                          <div className="overflow-hidden rounded-xl border border-purple-300/20 bg-black">
                            <div className="relative aspect-video">
                              <iframe
                                className="absolute inset-0 h-full w-full"
                                src={`https://www.youtube-nocookie.com/embed/${video.id}?rel=0&modestbranding=1&playsinline=1`}
                                title={video.judul || item.judul}
                                loading="lazy"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                                allowFullScreen
                                referrerPolicy="strict-origin-when-cross-origin"
                              />
                            </div>
                          </div>
                        </section>
                      ))}

                    </div>
                  )}

                  {/* Panduan */}
                  {isPanduan && panduan && (
                    <section className="mt-5 rounded-xl border border-purple-300/20 bg-white/5 p-4">

                      <h3 className="mb-4 text-base font-bold text-white">
                        Panduan Materi
                      </h3>

                      <TampilkanIsi isi={panduan} />

                    </section>
                  )}

                  {/* Tools */}
                  {isTools && links.length > 0 && (
                    <section className="mt-5 space-y-3">

                      <h3 className="text-base font-bold text-white">
                        Akses Tools
                      </h3>

                      {links.map((link, i) => (
                        <TombolAkses
                          key={i}
                          href={link.url}
                        >
                          {link.judul || 'Akses Tools'}
                        </TombolAkses>
                      ))}

                    </section>
                  )}

                  {/* Jika data belum memiliki konten */}
                  {!isVideo && !isPanduan && !isTools && (
                    <p className="text-sm leading-6 text-purple-100">
                      Materi ini belum memiliki konten yang dapat ditampilkan.
                    </p>
                  )}

                </div>
              </details>
            );
          })}

        </div>
      )}

    </main>
  );
              }
