import Link from 'next/link';
import { notFound } from 'next/navigation';

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

// Cek apakah teks terlihat seperti URL (http(s):// atau domain.com).
function miripUrl(teks) {
  return (
    /^https?:\/\//i.test(teks) ||
    /^(www\.)?[a-z0-9-]+(\.[a-z0-9-]+)+(\/\S*)?$/i.test(teks)
  );
}

function ambilUrl(x) {
  return String(
    x.url || x.link || x.href || x.tautan || x.akses || ''
  ).trim();
}

// Ubah berbagai bentuk data tools menjadi [{ judul, url }].
function normalisasiTools(sumber) {
  if (!sumber) return [];

  if (typeof sumber === 'string') {
    // Boleh satu link, atau beberapa link dipisah baris/koma/spasi.
    // Teks biasa yang bukan URL (mis. "link tools") diabaikan.
    return sumber
      .split(/[\n,\s]+/)
      .map((s) => s.trim())
      .filter((s) => s && miripUrl(s))
      .map((url) => ({
        judul: '',
        url: /^https?:\/\//i.test(url) ? url : `https://${url}`,
      }));
  }

  if (Array.isArray(sumber)) {
    return sumber.flatMap((x) => normalisasiTools(x));
  }

  if (typeof sumber === 'object') {
    const mentah = ambilUrl(sumber);

    if (mentah && miripUrl(mentah)) {
      return [
        {
          ...sumber,
          judul:
            sumber.judul ||
            sumber.nama ||
            sumber.title ||
            sumber.label ||
            '',
          url: /^https?:\/\//i.test(mentah) ? mentah : `https://${mentah}`,
        },
      ];
    }

    // Objek pembungkus (mis. { tools: [...] })
    return Object.values(sumber)
      .filter((v) => v && typeof v === 'object')
      .flatMap((v) => normalisasiTools(v));
  }

  return [];
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

export default async function TutorialModeVideoDetailPage({ params }) {
  const { id } = await params;

  const items = await getItems('tutorial-mode-video');

  const item = items.find(
    (materi, index) =>
      String(materi.id ?? index) === decodeURIComponent(id)
  );

  if (!item) {
    notFound();
  }

  const videos = daftarVideo(item);

  // Gabungkan link dari daftarLink + field tools di data, buang duplikat
  const kandidatLink = [
    ...normalisasiTools(daftarLink(item)),
    ...normalisasiTools(item.tools),
    ...normalisasiTools(item.tool),
    ...normalisasiTools(item.linkTools),
    ...normalisasiTools(item.link_tools),
  ];

  const sudahAda = new Set();
  const links = kandidatLink.filter((link) => {
    if (!link.url) return false;
    if (sudahAda.has(link.url)) return false;
    sudahAda.add(link.url);
    return true;
  });

  const panduan = daftarPanduan(item);
  const prompts = daftarPrompt(item);

  const isVideo = videos.length > 0;
  const isPanduan = punyaIsi(panduan);
  const isTools = links.length > 0;
  const isPrompt = prompts.length > 0;

  return (
    <main className="mx-auto w-full max-w-5xl px-4 pb-12 text-white sm:px-6 lg:px-8">

      {/* Tombol Kembali */}
      <div className="mb-5">
        <Link
          href="/tutorial-mode-video"
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
            <div
              key={`${video.id}-${index}`}
              className="space-y-3"
            >

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

      {/* Panduan Materi: hanya muncul jika ada isi */}
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

      {/* Tools: muncul jika ada link tools di data */}
      {isTools && (
        <section className="mt-8 space-y-4">

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

      {/* Materi Kosong */}
      {!isVideo &&
        !isPanduan &&
        !isTools &&
        !isPrompt && (
          <div className="rounded-xl border border-purple-300/20 bg-[#17101F] p-5">

            <p className="text-sm leading-7 text-purple-100">
              Materi ini belum memiliki konten yang dapat ditampilkan.
            </p>

          </div>
        )}

    </main>
  );
    }
