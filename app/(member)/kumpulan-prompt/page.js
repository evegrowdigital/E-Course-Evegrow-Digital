import { getItems } from '@/lib/konten.js';

export const dynamic = 'force-dynamic';

export default async function KumpulanPromptPage() {
  const items = await getItems('kumpulan-prompt');

  return (
    <main className="mx-auto w-full max-w-5xl text-white">

      {/* Header */}
      <header className="mb-8">

        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B875F5]">
          Evegrow Digital Learning
        </p>

        <h1 className="mt-3 text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
          Kumpulan Prompt
        </h1>

        {/* Garis Gradasi */}
        <div className="mt-5 h-1 w-28 rounded-full bg-gradient-to-r from-[#C026D3] to-[#8B5CF6]" />

      </header>

      {/* Daftar Prompt */}
      {items.length === 0 ? (

        <p className="text-sm text-purple-200/60">
          Belum ada prompt tersedia.
        </p>

      ) : (

        <div className="flex flex-col gap-5">

          {items.map((item, index) => (

            <article
              key={item.id}
              className="flex items-center gap-4 rounded-3xl border border-white/[0.10] bg-[#19151F] px-5 py-6 transition duration-300 hover:border-purple-400/30 hover:bg-[#201827] sm:gap-6 sm:px-7 sm:py-7"
            >

              {/* Nomor */}
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#C026D3] to-[#8B5CF6] text-base font-bold text-white shadow-[0_4px_15px_rgba(168,85,247,0.15)] sm:h-14 sm:w-14 sm:text-lg"
              >
                {index + 1}
              </span>

              {/* Judul dan Deskripsi */}
              <div className="min-w-0 flex-1">

                <h2 className="break-words text-base font-semibold leading-relaxed text-[#D8B7F5] sm:text-lg">
                  {item.judul || `Prompt ${index + 1}`}
                </h2>

                {item.deskripsi && (
                  <p className="mt-2 break-words text-sm leading-6 text-purple-200/60">
                    {item.deskripsi}
                  </p>
                )}

              </div>

              {/* Ikon Panah */}
              <span
                className="shrink-0 text-lg text-purple-300/80"
                aria-hidden="true"
              >
                ↗
              </span>

            </article>

          ))}

        </div>

      )}

    </main>
  );
        }
