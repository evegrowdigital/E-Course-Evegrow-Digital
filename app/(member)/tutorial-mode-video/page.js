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

export default async function TutorialModeVideoPage() {
  const items = await getItems('tutorial-mode-video');

  return (
    <main className="mx-auto w-full max-w-5xl text-white">

      {/* Header */}
      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B875F5]">
          Evegrow Digital Learning
        </p>

        <h1 className="mt-3 text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
          Tutorial Mode Video
        </h1>

        <div className="mt-5 h-1 w-28 rounded-full bg-gradient-to-r from-[#C026D3] to-[#8B5CF6]" />
      </header>

      {/* Daftar Materi */}
      {items.length === 0 ? (
        <p className="text-sm text-purple-200/60">
          Belum ada materi Tutorial Mode Video tersedia.
        </p>
      ) : (
        <div className="flex flex-col gap-8">
          {items.map((item, index) => {
            const videos = daftarVideo(item);

            return (
              <article key={item.id}>

                {/* Nomor dan Judul Materi */}
                <h2 className="mb-3 flex items-center gap-4 text-base font-bold text-white sm:text-lg">

                  {/* Numbering hanya untuk satu materi */}
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#C026D3] to-[#8B5CF6] text-base font-bold text-white">
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

                        {/* Judul Video Tanpa Numbering */}
                        {(video.judul || videos.length > 1) && (
                          <h3 className="mb-3 text-sm font-semibold text-white sm:text-base">
                            {video.judul || `Video ${i + 1}`}
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

              </article>
            );
          })}
        </div>
      )}

    </main>
  );
}
