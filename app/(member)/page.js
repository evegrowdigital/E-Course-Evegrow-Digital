import { getMember } from '@/lib/auth.js';
import { getAllMateri } from '@/lib/materi.js';
import MateriCard from '@/components/MateriCard.js';

export const metadata = { title: 'Materi | Evegrow.Digital' };

export default async function DashboardPage() {
  const member = await getMember();
  const name = member?.nama || member?.email?.split('@')[0] || '';
  const semua = getAllMateri();

  return (
    <>
      <h1 className="text-2xl font-bold text-ink sm:text-3xl">
        Halo, {name}!
      </h1>
      <p className="mt-1 text-sm text-brand-800/70 sm:text-base">
        Pilih materi yang ingin kamu pelajari.
      </p>

      {semua.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-brand-100 bg-white p-6 text-center text-sm text-brand-800/70">
          Belum ada materi tersedia.
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
