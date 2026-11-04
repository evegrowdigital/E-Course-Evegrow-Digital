import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';

import { getItems } from '@/lib/konten.js';

import PromptItem from './PromptItem';

import {
  daftarVideo,
  daftarLink,
  daftarPanduan,
  daftarPrompt,
} from './tutorial-utils';

export const dynamic = 'force-dynamic';

// Cek apakah panduan benar-benar punya isi (bukan kosong/spasi saja).
function punyaIsi(isi) {
  if (!isi) return false;
  if (typeof isi === 'string') return isi.trim().length > 0;
  if (Array.isArray(isi)) return isi.some(punyaIsi);
  if (typeof isi === 'object') return Object.values(isi).some(punyaIsi);
  return false;
}

// Decode aman agar id aneh tidak membuat halaman error.
function decodeAman(nilai) {
  try {
    return decodeURIComponent(nilai);
  } catch {
    return nilai;
  }
}

// Menampilkan isi panduan (teks, array, dan objek materi).
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
            <h4 className="mb-2 font-semibold text-white">{key}</h4>
            <TampilkanIsi isi={value} />
          </div>
        ))}
      </div>
    );
  }

  return null;
}

// Tombol akses tools.
function TombolAkses({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex min-h-[72px] w-full items-center justify-center gap-3 rounded-2xl border border-purple-300/40 bg-gradient-to-r from-[#B84CFF] to-[#8B2BE2] px-5 py-4 text-center text-base font-bold text-white shadow-[0_8px_25px_-10px_rgba(168,85,247,0.8)] transition duration-300 hover:brightness-110 active:scale-[0.98] sm:min-h-[88px] sm:text-xl"
    >
      <span>{children}</span>
      <span aria-hidden="true" className="text-xl">
        ↗
      </span>
    </a>
  );
}

export default async function MateriDetailPage({ params }) {
  const { id } = await params;

  const data = await getItems('materi');
  const items = Array.isArray(data) ? data : [];

  const idDicari = decodeAman(id);
  const item = items.find(
    (materi, index) => String(materi.id ?? index) === idDicari
  );

  if (!item) {
    notFound();
  }

  // Hanya link yang punya URL valid
  const links = daftarLink(item).filter(
    (link) =>
      link && typeof link.url === 'string' && link.url.trim() !== ''
  );

  // Ada link di data: langsung arahkan, tidak menampilkan halaman detail
  if (links.length > 0) {
    redirect(links[0].url.trim());
  }

  const videos = daftarVideo(item);
  const panduan = daftarPanduan(item);
  const prompts = daftarPrompt(item);

  const isVideo = videos.length > 0;
  const isPanduan = punyaIsi(panduan);
  const isPrompt = prompts.length > 0;

  return (
    <main className="mx-auto w-full max-w-5xl px-4 pb-12 text-white sm:px-6 lg:px-8">
      {/* Tombol Kembali */}
      <div className="mb-5">
        <Link
          href="/materi"
          className="inline-flex items-center gap-2 rounded-lg border border-purple-300/20 bg-white/5 px-3 py-2 text-sm font-medium text-purple-200 transition hover:bg-white/10 hover:text-white"
        >
          <span aria-hidden="true">←</span>
          Kembali ke Materi
        </Link>
      </div>

      {/* Judul Materi */}
      <header className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-purple-300">
          Evegrow Digital Learning
        </p>

        <h1 className="mt-3 break-words text-2xl font-bold leading-tight text-white sm:text-3xl">
          {item.judul || 'Materi Tanpa Judul'}
        </h1>

        {item.deskripsi && (
          <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-7 text-purple-100 sm:text-base">
            {item.deskripsi}
          </p>
        )}

        <div className="mt-5 h-1 w-24 rounded-full bg-gradient-to-r from-[#C026D3] to-[#8B5CF6]" />
      </header>

      {/* Video */}
      {isVideo && (
        <section className="space-y-6">
          {videos.map((video, index) => (
            <div key={`${video.id}-${index}`} className="space-y-3">
              {video.judul && (
                <h2 className="break-words text-lg font-bold text-white sm:text-xl">
                  {video.judul}
                </h2>
              )}

              <div className="overflow-hidden rounded-2xl border border-purple-300/20 bg-black shadow-[0_10px_30px_-15px_rgba(0,0,0,0.8)]">
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
            </div>
          ))}
        </section>
      )}

      {/* Panduan Materi */}
      {isPanduan && (
        <section className="mt-8">
          <h2 className="mb-4 text-xl font-bold text-white sm:text-2xl">
            Panduan Materi
          </h2>

          <div className="rounded-xl border border-purple-300/20 bg-[#17101F] p-4 sm:p-5">
            <TampilkanIsi isi={panduan} />
          </div>
        </section>
      )}

      {/* Prompt */}
      {isPrompt && (
        <section className="mt-8 space-y-4">
          {prompts.map((prompt, index) => (
            <PromptItem
              key={`${prompt.judul}-${index}`}
              judul={prompt.judul}
              isi={prompt.isi}
            />
          ))}
        </section>
      )}

      {/* Materi Kosong */}
      {!isVideo && !isPanduan && !isPrompt && (
        <div className="rounded-xl border border-purple-300/20 bg-[#17101F] p-5">
          <p className="text-sm leading-7 text-purple-100">
            Materi ini belum memiliki konten yang dapat ditampilkan.
          </p>
        </div>
      )}
    </main>
  );
        }
