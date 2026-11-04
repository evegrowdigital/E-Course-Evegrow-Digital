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

export default async function AIContentStudioPage() {
  const items = await getItems('ai-content-studio');

  return (
    <main className="mx-auto w-full max-w-5xl text-white">

      {/* Daftar AI Content Studio */}
      {items.length === 0 ? (
        <p className="text-sm text-purple-200/60">
          Belum ada AI Content Studio tersedia.
        </p>
      ) : (
        <div className="flex flex-col gap-8">
          {items.map((item) => {
            const videos = daftarVideo(item);

            return (
              <article key={item.id}>

                {/* Deskripsi */}
                {item.deskripsi && (
                  <p className="mb-4 text-sm leading-6 text-purple-200/70">
                    {item.deskripsi}
                  </p>
                )}

                {/* Video Tutorial */}
                {videos.length > 0 && (
                  <div className="space-y-6">
                    {videos.map((video, i) => (
                      <section key={video.id + i}>

                        {/* YouTube */}
                        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#100A16] shadow-[0_16px_40px_-18px_rgba(0,0,0,0.7)] sm:rounded-3xl">
                          <div className="relative aspect-video">
                            <iframe
                              className="absolute inset-0 h-full w-full"
                              src={`https://www.youtube-nocookie.com/embed/${video.id}?rel=0&modestbranding=1&playsinline=1`}
                              title={video.judul || 'AI Content Studio Tutorial'}
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
                  <div className="mt-4 w-full">
                    <a
                      href={item.tools}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#C084FC] bg-gradient-to-r from-[#A855F7] to-[#9333EA] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-10px_rgba(168,85,247,0.6)] transition hover:brightness-110 sm:w-auto"
                    >
                      Akses AI Content Studio
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
