import { notFound } from 'next/navigation';
import { getAllMateri } from '@/lib/materi.js';
import { getKategori } from '@/lib/kategori.js';
import MateriCard from '@/components/MateriCard.js';

export async function generateMetadata({ params }) {
  const { kategori } = await params;
  const k = getKategori(kategori);
  return { title: k ? `${k.label} | Evegrow.Digital` : 'Materi | Evegrow.Digital' };
}

export default async function KategoriPage({ params }) {
  const { kategori } = await params;
  const k = getKategori(kategori);
  if (!k) notFound();

  const semua = getAllMateri(k.slug);

  return (
    <>
      <h1 className="text-2xl font-bold text-ink sm:text-3xl">{k.label}</h1>
      <p className="mt-1 text-sm text-brand-800/70 sm:text-base">
        {semua.length} materi tersedia
      </p>

      {semua.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-brand-100 bg-white p-6 text-center text-sm text-brand-800/70">
          Materi untuk kategori ini segera hadir.
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {semua.map((materi) => (
            <MateriCard key={materi.id} materi={materi} />
          ))}
        </div>
      )}
    </>
  );
        }
