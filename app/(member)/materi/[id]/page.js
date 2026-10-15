import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllMateri, getMateri } from '@/lib/materi.js';
import { getYouTubeId } from '@/lib/youtube.js';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const m = getMateri(id);
  return { title: m ? `${m.judul} | Evegrow.Digital` : 'Materi | Evegrow.Digital' };
}

export default async function MateriPage({ params }) {
  const { id } = await params;
  const materi = getMateri(id);
  if (!materi) notFound();

  const semua = getAllMateri();
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
    <article>
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm font-medium text-brand-700 hover:text-brand-900"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        Semua materi
      </Link>

      <h1 className="mt-3 text-2xl font-bold leading-tight text-ink sm:text-3xl">{materi.judul}</h1>

      <div className="mt-5 overflow-hidden rounded-2xl border border-brand-100 bg-brand-900 shadow-soft">
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
            <div className="absolute inset-0 flex items-center justify-center p-6 text-center text-sm text-brand-100">
              Video belum tersedia untuk materi ini.
            </div>
          )}
        </div>
      </div>

      {(materi.tools || materi.prompt) && (
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          {materi.tools && (
            <a
              href={materi.tools}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              Akses Tools
            </a>
          )}
          {materi.prompt && (
            <a
              href={materi.prompt}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl border-2 border-brand-500 bg-white px-6 py-3 text-sm font-semibold text-brand-700 transition hover:bg-brand-100"
            >
              Akses Prompt
            </a>
          )}
        </div>
      )}

      {teks && (
        <section className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft sm:p-7">
          <h2 className="text-lg font-bold text-ink sm:text-xl">Materi</h2>
          <div className="mt-3 max-w-prose whitespace-pre-line text-[15px] leading-relaxed text-ink/90 sm:text-base">
            {teks}
          </div>
        </section>
      )}

      <nav className="mt-6 flex items-center justify-between gap-3">
        {sebelumnya ? (
          <Link
            href={`/materi/${sebelumnya.id}`}
            className="rounded-xl border border-brand-200 bg-white px-4 py-2.5 text-sm font-medium text-brand-800 hover:bg-brand-100"
          >
            Materi sebelumnya
          </Link>
        ) : (
          <span />
        )}
        {berikutnya && (
          <Link
            href={`/materi/${berikutnya.id}`}
            className="rounded-xl border border-brand-200 bg-white px-4 py-2.5 text-sm font-medium text-brand-800 hover:bg-brand-100"
          >
            Materi berikutnya
          </Link>
        )}
      </nav>
