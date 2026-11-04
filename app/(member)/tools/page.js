import { getItems } from '@/lib/konten.js';
import { getYouTubeId } from '@/lib/youtube';

export const dynamic = 'force-dynamic';

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
  <header className="mb-10">
    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-purple-400">
      Evegrow Digital Learning
    </p>

    <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
      Tools Digital
    </h1>

    <div className="mt-5 h-1.5 w-48 rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-500" />
  </header>

  {/* Daftar Tools */}
  {items.length === 0 ? (
    <p className="text-sm text-purple-200/60">
      Belum ada tools tersedia.
    </p>
  ) : (
    <div className="flex flex-col gap-10">

      {items.map((item, index) => {
        const videos = daftarVideo(item);

        return (
          <article key={item.id || index}>

            {/* Nomor dan Judul */}
            <div className="mb-5 flex items-center gap-4">

              <span className="flex h-[84px] w-[84px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 to-violet-500 text-2xl font-bold text-white shadow-[0_8px_24px_-10px_rgba(168,85,247,0.7)]">
                {index + 1}
              </span>

              <h2 className="min-w-0 break-words text-lg font-bold leading-snug text-white sm:text-xl">
                {item.judul}
              </h2>

            </div>

            {/* Video Tutorial */}
            {videos.length > 0 && (
              <div className="mb-5 flex flex-col gap-5">

                {videos.map((video, i) => (
                  <div key={video.id + i}>

                    {video.judul && (
                      <h3 className="mb-3 text-base font-semibold text-white">
                        {video.judul}
                      </h3>
                    )}

                    <div className="relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-[#100A16] shadow-[0_12px_32px_-18px_rgba(0,0,0,0.7)]">

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
                ))}

              </div>
            )}

            {/* Tombol Akses Tools */}
            {item.tools && (
              <div className="flex w-full justify-start">

                <a
                  href={item.tools}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-[78px] w-fit items-center justify-center gap-3 rounded-2xl border border-purple-300/50 bg-gradient-to-r from-[#C084FC] to-[#9333EA] px-6 text-base font-bold text-white shadow-[0_8px_24px_-10px_rgba(168,85,247,0.7)] transition duration-200 hover:-translate-y-0.5 hover:brightness-110 active:scale-[0.98]"
                >
                  Akses Tools

                  <span aria-hidden="true" className="text-lg">
                    ↗
                  </span>

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
