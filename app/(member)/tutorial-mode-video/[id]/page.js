import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getItems } from '@/lib/konten.js';
import { getYouTubeId } from '@/lib/youtube.js';

export const dynamic = 'force-dynamic';

// Mengambil seluruh video dari satu file data.
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

// Mengambil seluruh link tools dan materi.
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

// Mengambil panduan.
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

// Menampilkan isi panduan dalam berbagai format.
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
              <p className="whitespace-pre-wrap break-words text-sm leading-7 text-purple-100">
                {bagian}
              </p>
            ) : (
              <div>
                {bagian.judul && (
                  <h3 className="mb-2 font-semibold text-white">
                    {bagian.judul}
                  </h3>
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
      <div className="space-y-4">
        {Object.entries(isi).map(([key, value]) => (
          <div key={key}>
            <h3 className="mb-2 font-semibold text-white">
              {key}
            </h3>

            <TampilkanIsi isi={value} />
          </div>
        ))}
      </div>
    );
  }

  return null;
}

// Tombol akses besar seperti foto referensi.
function TombolAkses({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex min-h-[76px] w-full items-center justify-center gap-3 rounded-2xl border border-purple-300/50 bg-gradient-to-r from-[#B84CFF] to-[#8B2BE2] px-5 py-5 text-center text-lg font-bold text-white shadow-[0_10px_30px_-10px_rgba(168,85,247,0.7)] transition duration-300 hover:brightness-110 active:scale-[0.98] sm:min-h-[90px] sm:text-2xl"
    >
      <span className="break-words">
        {children}
      </span>

      <span aria-hidden="true" className="shrink-0 text-xl sm:text-2xl">
        ↗
      </span>
    </a>
  );
}

export default async function TutorialDetailPage({ params }) {
  const { id } = await params;

  const items = await getItems('tutorial-mode-video');

  const item = items.find(
    (materi) => String(materi.id) === String(id)
  );

  // Jika ID tidak ditemukan.
  if (!item) {
    notFound();
  }

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
    <main className="mx-auto w-full max-w-5xl px-4 pb-12 text-white sm:px-6 lg:px-8">

      {/* Kembali */}
      <Link
        href="/tutorial-mode-video"
        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-purple-200 transition hover:text-white"
      >
        <span aria-hidden="true">←</span>
        Kembali ke Tutorial
      </Link>

      {/* Header */}
      <header className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-purple-300">
          Evegrow Digital Learning
        </p>

        <h1 className="mt-3 break-words text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
          {item.judul || 'Materi Tanpa Judul'}
        </h1>

        {item.deskripsi && (
          <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-7 text-purple-100 sm:text-base">
            {item.deskripsi}
          </p>
        )}

        <div className="mt-5 h-1 w-28 rounded-full bg-gradient-to-r from-[#C026D3] to-[#8B5CF6]" />
      </header>

      {/* Cover */}
      {cover && (
        <div className="mb-8 overflow-hidden rounded-2xl border border-purple-300/20">
          <div className="relative aspect-video">
            <img
              src={cover}
              alt={item.judul || 'Cover materi'}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Video */}
      {isVideo && videos.length > 0 && (
        <section className="mb-8 space-y-6">

          {videos.map((video, index) => (
            <article key={`${video.id}-${index}`}>

              {video.judul && (
                <h2 className="mb-3 break-words text-base font-bold text-white sm:text-lg">
                  {video.judul}
                </h2>
              )}

              <div className="overflow-hidden rounded-2xl border border-purple-300/20 bg-black shadow-[0_12px_35px_-15px_rgba(0,0,0,0.8)]">
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

            </article>
          ))}

        </section>
      )}

      {/* Panduan */}
      {isPanduan && panduan && (
        <section className="mb-8 rounded-2xl border border-purple-300/20 bg-[#17101F] p-4 sm:p-6">

          <h2 className="mb-5 text-lg font-bold text-white sm:text-xl">
            Panduan Materi
          </h2>

          <TampilkanIsi isi={panduan} />

        </section>
      )}

      {/* Tools */}
      {isTools && links.length > 0 && (
        <section className="mb-8 space-y-4">

          <h2 className="text-lg font-bold text-white sm:text-xl">
            Akses Tools
          </h2>

          {links.map((link, index) => (
            <TombolAkses
              key={`${link.url}-${index}`}
              href={link.url}
            >
              {link.judul || 'Akses Tools'}
            </TombolAkses>
          ))}

        </section>
      )}

      {/* Tidak ada konten */}
      {!isVideo && !isPanduan && !isTools && (
        <div className="rounded-2xl border border-purple-300/20 bg-white/5 p-5">
          <p className="text-sm leading-7 text-purple-100">
            Materi ini belum memiliki konten yang dapat ditampilkan.
          </p>
        </div>
      )}

    </main>
  );
}
