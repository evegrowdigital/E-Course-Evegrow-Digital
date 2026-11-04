import { getItems } from '@/lib/konten.js';

export const dynamic = 'force-dynamic';

export default async function KumpulanTemplatePage() {
  const items = await getItems('kumpulan-template');

  return (
    <main className="mx-auto w-full max-w-5xl text-white">
      {/* Header */}
      <header className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B875F5]">
          Evegrow Digital Learning
        </p>

        <h1 className="mt-2 text-2xl font-bold leading-tight text-white sm:text-3xl">
          Kumpulan Template
        </h1>

        <div className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-[#C026D3] to-[#8B5CF6]" />
      </header>

      {/* Daftar Template */}
      {items.length === 0 ? (
        <p className="text-sm text-purple-200/60">
          Belum ada template tersedia.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {items.map((item, index) => (
            <a
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-[#19151F] px-4 py-5 transition-colors duration-200 hover:border-purple-400/30 hover:bg-[#201827] active:scale-[0.99] sm:px-5"
            >
              {/* Nomor */}
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#C026D3] to-[#8B5CF6] text-sm font-bold text-white">
                {index + 1}
              </span>

              {/* Judul */}
              <div className="min-w-0 flex-1">
                <h2 className="break-words text-sm font-semibold leading-6 text-[#D8B7F5] transition-colors group-hover:text-white sm:text-base">
                  {item.judul || `Template ${index + 1}`}
                </h2>

                {item.deskripsi && (
                  <p className="mt-1 break-words text-xs leading-5 text-purple-200/50">
                    {item.deskripsi}
                  </p>
                )}
              </div>

              {/* Ikon Panah */}
              <span
                aria-hidden="true"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-purple-300/20 text-lg text-purple-300 transition-all duration-200 group-hover:border-purple-400/50 group-hover:bg-purple-500/10 group-hover:text-white"
              >
                ↓
              </span>
            </a>
          ))}
        </div>
      )}
    </main>
  );
}
