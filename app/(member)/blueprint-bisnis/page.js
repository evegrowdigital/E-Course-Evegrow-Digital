
import { getItems } from '@/lib/konten.js';

export const dynamic = 'force-dynamic';

export default async function BlueprintBisnisPage() {
  const items = await getItems('blueprint-bisnis');

  return (
    <main className="text-white">
      <h1 className="mb-5 text-2xl font-bold">Blueprint Bisnis</h1>

      {items.length === 0 ? (
        <p className="text-sm text-purple-200/60">Belum ada blueprint tersedia.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <div key={item.id} className="rounded-2xl border border-purple-400/20 bg-white/5 p-4">
              <h2 className="font-semibold">{item.judul}</h2>
              {item.deskripsi && (
                <p className="mt-1 text-sm text-purple-200/70">{item.deskripsi}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
