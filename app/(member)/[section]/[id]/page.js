
import Link from 'next/link';
import { notFound } from 'next/navigation';
import menu from '@/data/menu';
import { getItem, getItems } from '@/lib/konten';
import { getYouTubeId } from '@/lib/youtube';

function cariSection(slug) {
  return menu.find((m) => m.slug === slug && m.folder);
}

export function generateMetadata({ params }) {
  const s = cariSection(params.section);
  const item = s ? getItem(s.folder, params.id) : null;

  return {
    title: item ? `${item.judul} | Evegrow.Digital` : 'Evegrow.Digital',
  };
}

export default function DetailPage({ params }) {
  const section = cariSection(params.section);
  if (!section) notFound();

  const materi = getItem(section.folder, params.id);
  if (!materi) notFound();

  const semua = getItems(section.folder);
  const index = semua.findIndex((m) => m.id === materi.id);
  const sebelumnya = semua[index - 1];
  const berikutnya = semua[index + 1];

  const videoId = getYouTubeId(materi.video);

  const teks = (materi.materi || '')
    .split('\n')
    .map((l) => l.trim())
    .join('\n')
    .trim();

  return (
    <article className="mx-auto w-full max-w-5xl">
      {/* Kembali */}
      <Link
        href={`/${section.slug}`}
        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-[#D8B7F5] transition hover:border-[#A855F7]/40 hover:bg-[#A855F7]/10 hover:text-white"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
        {section.label}
      </Link>

      {/* Judul */}
      <header className="mt-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B875F5]">
          Evegrow Digital Learning
        </p>

        <h1 className="mt-2 break-words text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
          {materi.judul}
        </h1>

        <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#C026D3] to-[#8B5CF6]" />
      </header>

      {/* Video */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-[#100A16] shadow-[0_16px_40px_-18px_rgba(0,0,0,0.7)] sm:rounded-3xl">
        <div className="relative aspect-video">
          {videoId ? (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`}
              title={materi.judul}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center p-6 text-center text-sm text-white/60">
              Video belum tersedia.
            </div>
          )}
        </div>
      </div>

      {/* Tombol tools dan prompt */}
      {(materi.tools || materi.prompt) && (
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          {materi.tools && (
            <a
              href={materi.tools}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#A855F7] to-[#7C3AED] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_22px_-10px_rgba(168,85,247,0.65)] transition hover:-translate-y-0.5 hover:brightness-110"
            >
              Akses Tools
              <span aria-hidden="true">↗</span>
            </a>
          )}

          {materi.prompt && (
            <a
              href={materi.prompt}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#A855F7]/40 bg-[#A855F7]/10 px-6 py-3 text-sm font-semibold text-[#D8B7F5] transition hover:border-[#C084FC] hover:bg-[#A855F7]/20 hover:text-white"
            >
              Akses Prompt
              <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      )}

      {/* Isi materi */}
      {teks && (
        <section className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-[#17101F] shadow-[0_12px_32px_-18px_rgba(0,0,0,0.65)] sm:rounded-3xl">
          <div className="border-b border-white/10 bg-gradient-to-r from-[#24132F] to-[#19101F] px-5 py-4 sm:px-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#B875F5]">
              Learning Material
            </p>

            <h2 className="mt-1 text-lg font-bold text-white sm:text-xl">
              Materi Pembelajaran
            </h2>
          </div>

          <div className="px-5 py-5 sm:px-7 sm:py-7">
            <div className="max-w-3xl whitespace-pre-line text-[15px] leading-7 text-[#E7DDED] sm:text-base sm:leading-8">
              {teks}
            </div>
          </div>
        </section>
      )}

      {/* Navigasi materi */}
      <nav className="mt-7 flex items-stretch justify-between gap-3 border-t border-white/10 pt-5">
        {sebelumnya ? (
          <Link
            href={`/${section.slug}/${sebelumnya.id}`}
            className="flex max-w-[48%] items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-medium text-[#D8B7F5] transition hover:border-[#A855F7]/40 hover:bg-[#A855F7]/10 hover:text-white"
          >
            <span aria-hidden="true">←</span>
            <span className="min-w-0">
              <span className="block text-[10px] uppercase tracking-wider text-white/40">
                Sebelumnya
              </span>
              <span className="block truncate">{sebelumnya.judul}</span>
            </span>
          </Link>
        ) : (
          <span />
        )}

        {berikutnya && (
          <Link
            href={`/${section.slug}/${berikutnya.id}`}
            className="ml-auto flex max-w-[48%] items-center justify-end gap-2 rounded-xl border border-[#A855F7]/30 bg-[#A855F7]/10 px-4 py-3 text-right text-sm font-medium text-[#D8B7F5] transition hover:border-[#A855F7]/60 hover:bg-[#A855F7]/20 hover:text-white"
          >
            <span className="min-w-0">
              <span className="block text-[10px] uppercase tracking-wider text-white/40">
                Berikutnya
              </span>
              <span className="block truncate">{berikutnya.judul}</span>
            </span>
            <span aria-hidden="true">→</span>
          </Link>
        )}
      </nav>
    </article>
  );
                }
          
