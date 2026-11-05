import { getItems } from '@/lib/konten.js';

export const dynamic = 'force-dynamic';

// Mengubah teks **teks** menjadi teks bold.
function renderBold(text) {
  if (typeof text !== 'string') {
    return text;
  }

  return text.split(/(\*\*.*?\*\*)/gs).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong
          key={index}
          className="font-bold text-white"
        >
          {part.slice(2, -2)}
        </strong>
      );
    }

    return part;
  });
}

// Menampilkan teks dengan dukungan bold dan baris baru.
function TeksMateri({ text }) {
  if (!text) return null;

  if (Array.isArray(text)) {
    return (
      <div className="space-y-4">
        {text.map((item, index) => {
          if (typeof item === 'string') {
            return (
              <p
                key={index}
                className="whitespace-pre-line leading-7 text-white/80"
              >
                {renderBold(item)}
              </p>
            );
          }

          return (
            <div key={index} className="space-y-2">
              {item.judul && (
                <h3 className="font-semibold text-white">
                  {renderBold(item.judul)}
                </h3>
              )}

              {item.isi && (
                <p className="whitespace-pre-line leading-7 text-white/80">
                  {renderBold(item.isi)}
                </p>
              )}

              {item.materi && (
                <p className="whitespace-pre-line leading-7 text-white/80">
                  {renderBold(item.materi)}
                </p>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="whitespace-pre-line leading-7 text-white/80">
      {renderBold(text)}
    </div>
  );
}

export default async function BlueprintBisnisPage() {
  const items = await getItems('blueprint-bisnis');

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 text-white sm:px-6 lg:px-8">
      {/* Header */}
      <header className="mb-8">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-purple-300 sm:text-sm">
          EVEGROW DIGITAL LEARNING
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Blueprint Bisnis Digital
        </h1>

        <p className="mt-3 text-base leading-relaxed text-white/75 sm:text-lg">
          Pilih blueprint untuk mulai belajar.
        </p>

        {/* Garis dekorasi */}
        <div className="mt-8 h-1.5 w-48 rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-500" />
      </header>

      {/* Daftar Blueprint */}
      {items.length === 0 ? (
        <p className="text-sm text-purple-200/60">
          Belum ada tutorial tersedia.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {items.map((item) => (
            <details
              key={item.id}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-[#17121d] transition-all duration-300 open:col-span-2 sm:open:col-span-3 lg:open:col-span-4"
            >
              {/* Kartu yang bisa diklik */}
              <summary className="list-none cursor-pointer">
                {/* Cover */}
                <div className="aspect-video overflow-hidden bg-white/5">
                  {item.cover ? (
                    <img
                      src={item.cover.replaceAll('&amp;', '&')}
                      alt={item.judul || 'Cover blueprint'}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <span className="text-3xl">📚</span>
                    </div>
                  )}
                </div>

                {/* Judul */}
                <div className="flex items-start justify-between gap-2 px-3 pb-3 pt-2 sm:px-4 sm:pb-3 sm:pt-2">
                  <h2 className="line-clamp-2 text-sm font-semibold leading-5 text-white sm:text-base sm:leading-6">
                    {item.judul || 'Blueprint tanpa judul'}
                  </h2>

                  {/* Icon buka/tutup */}
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    className="mt-0.5 h-4 w-4 shrink-0 text-purple-300 transition-transform duration-300 group-open:rotate-180"
                    aria-hidden="true"
                  >
                    <path
                      d="M5 7.5L10 12.5L15 7.5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </summary>

              {/* Isi materi langsung di halaman ini */}
              <div className="border-t border-white/10 px-4 py-5 sm:px-6">
                {item.deskripsi && (
                  <p className="mb-5 leading-7 text-white/60">
                    {renderBold(item.deskripsi)}
                  </p>
                )}

                {item.materi && (
                  <TeksMateri text={item.materi} />
                )}

                {!item.materi && item.konten && (
                  <TeksMateri text={item.konten} />
                )}

                {!item.materi && !item.konten && item.isi && (
                  <TeksMateri text={item.isi} />
                )}

                {!item.materi && !item.konten && !item.isi && (
                  <p className="text-sm text-white/50">
                    Isi materi belum tersedia.
                  </p>
                )}

                {/* Panduan jika tersedia */}
                {Array.isArray(item.panduan) &&
                  item.panduan.length > 0 && (
                    <div className="mt-6 space-y-3">
                      {item.panduan.map((panduan, index) => (
                        <div
                          key={index}
                          className="rounded-xl border border-white/10 bg-white/[0.03] p-3"
                        >
                          {panduan.judul && (
                            <h3 className="mb-2 font-semibold text-white">
                              {renderBold(panduan.judul)}
                            </h3>
                          )}

                          {panduan.isi && (
                            <p className="whitespace-pre-line leading-7 text-white/70">
                              {renderBold(panduan.isi)}
                            </p>
                          )}

                          {panduan.url && (
                            <a
                              href={panduan.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-purple-300 hover:text-purple-200"
                            >
                              Buka panduan
                              <span aria-hidden="true">↗</span>
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
              </div>
            </details>
          ))}
        </div>
      )}
    </main>
  );
                        }
