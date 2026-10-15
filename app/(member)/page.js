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

      <div className="mt-3 rounded-2xl border border-brand-100 bg-gradient-to-br from-white to-brand-100/60 p-4 shadow-soft sm:p-5">
        <p className="text-sm leading-relaxed text-brand-900/90 sm:text-base">
          Terima kasih sudah mempercayakan proses belajar bersama Evegrow.digital.
          Semoga ini menjadi peluang bagi teman-teman untuk upgrade skill dan
          membuka peluang penghasilan dari rumah. Aamiin 🤲
        </p>
      </div>

      <p className="mt-6 text-sm font-medium text-brand-800/70 sm:text-base">
        Pilih materi yang ingin kamu pelajari.
      </p>

      {semua.length === 0 ? (
        <p className="mt-4 rounded-2xl border border-brand-100 bg-white p-6 text-center text-sm text-brand-800/70">
          Belum ada materi tersedia.
        </p>
      ) : (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {semua.map((materi) => (
            <MateriCard key={materi.id} materi={materi} />
          ))}
        </div>
      )}
    </>
  );
}
