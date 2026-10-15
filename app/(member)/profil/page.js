import { getMember } from '@/lib/auth';
import { getAllMateri } from '@/lib/materi';

export const metadata = { title: 'Profil Saya | Evegrow.Digital' };

export default async function ProfilPage() {
  const member = await getMember();
  const email = member?.email || '';
  const name = member?.nama || email.split('@')[0];
  const initial = name.charAt(0).toUpperCase();
  const bergabung = member?.created_at
    ? new Date(member.created_at).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '-';
  const totalMateri = getAllMateri().length;

  const rows = [
    ['Nama', name],
    ['Email', email],
    ['Bergabung sejak', bergabung],
    ['Materi tersedia', `${totalMateri} materi`],
  ];

  return (
    <>
      <h1 className="text-2xl font-bold text-ink sm:text-3xl">Profil Saya</h1>

      <div className="mt-6 max-w-xl overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-soft">
        <div className="flex items-center gap-4 bg-gradient-to-br from-brand-200 to-brand-300 p-6">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl font-bold text-brand-700">
            {initial}
          </span>
          <div className="min-w-0">
            <p className="truncate text-lg font-bold text-brand-900">{name}</p>
            <p className="truncate text-sm text-brand-900/80">Member Evegrow.Digital</p>
          </div>
        </div>
        <dl className="divide-y divide-brand-100">
          {rows.map(([label, value]) => (
            <div key={label} className="flex flex-col gap-0.5 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
              <dt className="text-sm text-brand-800/70">{label}</dt>
              <dd className="break-all text-sm font-semibold text-ink">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </>
  );
}
