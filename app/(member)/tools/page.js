
import { getItems } from '@/lib/konten.js';
import { getYouTubeId } from '@/lib/youtube.js';

export const dynamic = 'force-dynamic';

// Menggabungkan video tunggal dan daftar video
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

export default async function ToolsPage() {
  const items = await getItems('tools');

  return (
    <main className="mx-auto w-full max-w-5xl text-white">

      {/* Header */}
      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B875F5]">
          Evegrow Digital Learning
        </p>

        <h1 className="mt-3 text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
          Tools Digital
        </h1>

        <div className="mt-5 h-1 w-28 rounded-full bg-gradient-to-r from-[#C026D3] to-[#8B5CF6]" />
      </header>

      {/* Daftar Tools */}
      {items.length === 0 ? (
        <p className="text-sm text-purple-200/60">
          Belum ada tools tersedia.
        </p>
      ) : (
        <div className="flex flex-col gap-8">
          {items.map((item, index) => {
            const videos = daftarVideo(item);

            return (
              <article key={item.id}>

                {/* Nomor dan Judul */}
                <h2 className="mb-3 flex items-center gap-4 text-base font-bold text-white sm:text-lg">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#C026D3] to-[#8B5CF6] text-base font-bold text-white shadow-lg">
                    {index + 1}
                  </span>

                  <span className="min-w-0 break-words">
                    {item.judul}
                  </span>
                </h2>

                {/* Deskripsi */}
                {item.deskripsi && (
                  <p className="mb-4 ml-16 text-sm leading-6 text-purple-200/70">
                    {item.deskripsi}
                  </p>
                )}

                {/* Video Tutorial */}
                {videos.length > 0 && (
                  <div className="mt-3 space-y-6">
                    {videos.map((video, i) => (
                      <section key={video.id + i}>

                        {/* Judul Video */}
                        {(video.judul || videos.length > 1) && (
                          <h3 className="mb-3 flex items-center gap-3 text-sm font-semibold text-white sm:text-base">
                            {videos.length > 1 && (
                              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#C026D3] to-[#8B5CF6] text-xs font-bold text-white">
                                {i + 1}
                              </span>
                            )}

                            <span className="min-w-0 break-words">
                              {video.judul || `Video ${i + 1}`}
                            </span>
                          </h3>
                        )}

                        {/* YouTube */}
                        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#100A16] shadow-[0_16px_40px_-18px_rgba(0,0,0,0.7)] sm:rounded-3xl">
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

                {/* Tombol Akses Tools */}
                {item.tools && (
                  <div className="mt-4">
                    <a
                      href={item.tools}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#A855F7]/40 bg-[#A855F7]/10 px-6 py-3 text-sm font-semibold text-[#D8B7F5] transition hover:border-[#C084FC] hover:bg-[#A855F7]/20 hover:text-white"
                    >
                      Akses Tools
                      <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                )}

              </article>
            );
          })}
        </div>
      )}

    </main>
  );
                  }
                          
