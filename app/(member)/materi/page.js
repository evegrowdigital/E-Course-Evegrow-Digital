import { getAllMateri } from '@/lib/materi';
import MateriCard from '@/components/MateriCard';

export const metadata = { title: 'Materi | Evegrow.Digital' };

export default function MateriListPage() {
  const daftar = getAllMateri();

  return (
    <>
      <h1 className="text-2xl font-bold text-ink sm:text-3xl">Materi</h1>
      <p className="mt-1 text-sm text-brand-800/70 sm:text-base">
        Pilih materi untuk mulai belajar.
      </p>

      {daftar.length === 0 ? (
        <p className="mt-8 rounded-2xl bg-white p-6 text-center text-sm text-brand-800/70">
          Belum ada materi. Tambahkan folder M1 di dalam data/materi.
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 md:gap-5 xl:grid-cols-4">
          {daftar.map((m) => (
            <MateriCard key={m.id} materi={m} />
          ))}
        </div>
      )}
    </>
  );
        }
