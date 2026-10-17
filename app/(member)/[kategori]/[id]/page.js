
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllMateri, getMateri } from '@/lib/materi.js';
import { getKategori } from '@/lib/kategori.js';
import { getYouTubeId } from '@/lib/youtube.js';
import PromptBox from '@/components/PromptBox.js';

// Format materi:
// **teks tebal**
// [Foto: https://link-gambar.jpg]
// [Foto: https://link-gambar.jpg | Keterangan foto]

function Teks({ children }) {
  const teks = typeof children === 'string' ? children : String(children ?? '');

  const bagian = teks.split(
    /(\*\*[^*]+\*\*|\[foto:[^\]]+\])/gi
  );

  return (
    <>
      {bagian.map((b, i) => {
        if (b.startsWith('**') && b.endsWith('**') && b.length > 4) {
          return (
            <strong key={i} className="font-bold text-ink">
              {b.slice(2, -2)}
            </strong>
          );
        }

        if (
          b.toLowerCase().startsWith('[foto:') &&
          b.endsWith(']')
        ) {
          const isi = b.slice(6, -1).trim();
          const [url, ...sisa] = isi.split('|');
          const link = url.trim();
          const caption = sisa.join('|').trim();

          if (!link) return null;

          return (
            <figure key={i} className="my-4">
              <img
                src={link}
                alt={caption || 'Gambar materi'}
                loading="lazy"
                className="h-auto w-full rounded-2xl border border-brand-100 shadow-soft"
              />

              {caption && (
                <figcaption className="mt-2 text-center text-xs text-brand-800/70 sm:text-sm">
                  {caption}
                </figcaption>
              )}
            </figure>
          );
        }

        return <span key={i}>{b}</span>;
      })}
    </>
  );
}

// Mengubah isi materi menjadi teks dengan aman.
// Mendukung string, array, dan objek.
function normalisasiMateri(value) {
  if (typeof value === 'string') {
    return value;
  }

  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (typeof item === 'string') return item;

        if (item && typeof item === 'object') {
          const isi =
            item.teks ??
            item.isi ??
            item.content ??
            item.text ??
            item.paragraf;

          return typeof isi === 'string' ? isi : '';
        }

        return '';
      })
      .filter(Boolean)
      .join('\n');
  }

  if (value && typeof value === 'object') {
    const isi =
      value.teks ??
      value.isi ??
      value.content ??
      value.text ??
      value.paragraf;

    if (typeof isi === 'string') return isi;

    return '';
  }

  return '';
}

export async function generateMetadata({ params }) {
  const { kategori, id } = await params;
  const m = getMateri(kategori, id);

  return {
    title: m
      ? `${m.judul} | Evegrow.Digital`
      : 'Materi | Evegrow.Digital',
  };
}

export default async function MateriPage({ params }) {
  const { kategori, id } = await params;
  const k = getKategori(kategori);
  const materi = k ? getMateri(kategori, id) : null;

  if (!materi) notFound();

  const semua = getAllMateri(k.slug);
  const index = semua.findIndex((m) => m.id === materi.id);
  const sebelumnya = semua[index - 1];
  const berikutnya = semua[index + 1];

  // Video tunggal dan beberapa video.
  const daftarVideo = [
    materi.video,
    ...(Array.isArray(materi.videos) ? materi.videos : []),
  ]
    .map((v) => (typeof v === 'string' ? { judul: '', url: v } : v))
    .filter((v) => v && typeof v.url === 'string' && v.url.trim())
    .map((v) => ({
      judul: v.judul || '',
      videoId: getYouTubeId(v.url),
    }))
    .filter((v) => v.videoId);

  // Panduan.
  const panduan = (
    Array.isArray(materi.panduan)
      ? materi.panduan
      : materi.panduan
        ? [materi.panduan]
        : []
  )
    .map((p) => (typeof p === 'string' ? { judul: '', url: p } : p))
    .filter((p) => p && typeof p.url === 'string' && p.url.trim());

  // Prompt.
  const daftarPrompt = (
    Array.isArray(materi.prompts)
      ? materi.prompts
      : materi.prompts
        ? [materi.prompts]
        : []
  )
    .map((p) => (typeof p === 'string' ? { judul: '', isi: p } : p))
    .filter((p) => p && p.isi != null && String(p.isi).trim())
    .map((p, i, arr) => ({
      judul: p.judul || (arr.length > 1 ? `Prompt ${i + 1}` : 'Prompt'),
      isi: String(p.isi).trim(),
    }));

  // Perbaikan utama: jangan panggil split sebelum memastikan teks berupa string.
  const teks = normalisasiMateri(materi.materi)
    .split('\n')
    .map((l) => l.trim())
    .join('\n')
    .trim();

  // Gambar tambahan di bawah teks materi.
  const gambar = (
    Array.isArray(materi.gambar)
      ? materi.gambar
      : materi.gambar
        ? [materi.gambar]
        : []
  )
    .map((g) => (typeof g === 'string' ? { src: g, caption: '' } : g))
    .filter((g) => g && typeof g.src === 'string' && g.src.trim());

  const adaTombol = Boolean(
    materi.tools || materi.prompt || panduan.length > 0
  );

  return (
    <article>
      <Link
        href={`/${k.slug}`}
        className="inline-flex items-center gap-1 text-sm font-medium text-brand-700 hover:text-brand-900"
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
        Semua materi {k.label}
      </Link>

      <h1 className="mt-3 text-2xl font-bold leading-tight text-ink sm:text-3xl">
        {materi.judul}
      </h1>

      {daftarVideo.length > 0 && (
        <div className="mt-5 flex flex-col gap-5">
          {daftarVideo.map((v, i) => (
            <div key={`${v.videoId}-${i}`}>
              {daftarVideo.length > 1 && (
                <p className="mb-2 text-sm font-semibold text-brand-800">
                  {v.judul || `Video ${i + 1}`}
                </p>
              )}

              <div className="overflow-hidden rounded-2xl border border-brand-100 bg-brand-900 shadow-soft">
                <div className="relative aspect-video">
                  <iframe
                    className="absolute inset-0 h-full w-full"
                    src={`https://www.youtube-nocookie.com/embed/${v.videoId}?rel=0&modestbranding=1&playsinline=1`}
                    title={v.judul || `${materi.judul} - video ${i + 1}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {adaTombol && (
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
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

          {panduan.map((p, i) => (
            <a
              key={`${p.url}-${i}`}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-200 bg-brand-100 px-6 py-3 text-sm font-semibold text-brand-800 transition hover:border-brand-400 hover:bg-brand-200"
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
                <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5z" />
                <path d="M14 3v5h5M9 13h6M9 17h6" />
              </svg>

              {p.judul ||
                (panduan.length > 1
                  ? `Akses Panduan ${i + 1}`
                  : 'Akses Panduan')}
            </a>
          ))}
        </div>
      )}

      {daftarPrompt.length > 0 && (
        <div className="mt-5 flex flex-col gap-3">
          {daftarPrompt.map((p, i) => (
            <PromptBox
              key={`${p.judul}-${i}`}
              judul={p.judul}
              isi={p.isi}
            />
          ))}
        </div>
      )}

      {(teks || gambar.length > 0) && (
        <details className="group mt-3 overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-soft">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-sm font-semibold text-brand-800 transition hover:bg-brand-100 sm:text-base [&::-webkit-details-marker]:hidden">
            <span className="flex items-center gap-2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M4 5a2 2 0 012-2h12a2 2 0 012 2v14l-4-3H6a2 2 0 01-2-2V5z" />
              </svg>

              <span className="group-open:hidden">Lihat Materi</span>
              <span className="hidden group-open:inline">Tutup Materi</span>
            </span>

            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="shrink-0 transition-transform duration-200 group-open:rotate-180"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </summary>

          <div className="border-t border-brand-100 px-5 py-5 sm:px-7">
            {teks && (
              <div className="max-w-prose whitespace-pre-line text-[15px] leading-relaxed text-ink/90 sm:text-base">
                <Teks>{teks}</Teks>
              </div>
            )}

            {gambar.length > 0 && (
              <div className={`${teks ? 'mt-5' : ''} flex flex-col gap-5`}>
                {gambar.map((g, i) => (
                  <figure key={`${g.src}-${i}`}>
                    <img
                      src={g.src}
                      alt={g.caption || `${materi.judul} - gambar ${i + 1}`}
                      loading="lazy"
                      className="h-auto w-full rounded-2xl border border-brand-100 shadow-soft"
                    />

                    {g.caption && (
                      <figcaption className="mt-2 text-center text-xs text-brand-800/70 sm:text-sm">
                        {g.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            )}
          </div>
        </details>
      )}

      <nav className="mt-8 grid grid-cols-2 gap-3">
        {sebelumnya ? (
          <Link
            href={`/${k.slug}/${sebelumnya.id}`}
            className="group flex items-center gap-2 rounded-2xl border border-brand-200 bg-white px-4 py-3.5 text-sm font-semibold text-brand-800 shadow-soft transition hover:-translate-y-0.5 hover:border-brand-400 hover:bg-brand-100"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="shrink-0 transition group-hover:-translate-x-0.5"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>

            <span>Sebelumnya</span>
          </Link>
        ) : (
          <span />
        )}

        {berikutnya ? (
          <Link
            href={`/${k.slug}/${berikutnya.id}`}
            className="group flex items-center justify-end gap-2 rounded-2xl bg-gradient-to-r from-brand-600 to-brand-500 px-4 py-3.5 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:from-brand-700 hover:to-brand-600"
          >
            <span>Berikutnya</span>

            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="shrink-0 transition group-hover:translate-x-0.5"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
