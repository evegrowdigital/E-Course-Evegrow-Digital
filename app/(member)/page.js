import Link from 'next/link';
import { getMember } from '@/lib/auth.js';
import { hitungMateri } from '@/lib/materi.js';
import { KATEGORI } from '@/lib/kategori.js';

export const metadata = { title: 'Beranda | Evegrow.Digital' };

export default async function DashboardPage() {
  const member = await getMember();
  const name = member?.nama || member?.email?.split('@')[0] || '';
  const counts = hitungMateri();

  return (
    <>
      <h1 className="text-2xl font-bold text-ink sm:text-3xl">Halo, {name}!</h1>

      <div className="mt-3 rounded-2xl border border-brand-100 bg-gradient-to-br from-white to-brand-100/60 p-4 shadow-soft sm:p-5">
        <p className="text-sm leading-relaxed text-brand-900/90 sm:text-base">
          Terima kasih sudah mempercayakan proses belajar bersama Evegrow.digital.
          Semoga ini menjadi peluang bagi teman-teman untuk upgrade skill dan
          membuka peluang penghasilan dari rumah. Aamiin 🤲
        </p>
      </div>

      <p className="mt-6 text-sm font-medium text-brand-800/70 sm:text-base">
        Pilih kategori materi yang ingin kamu pelajari.
      </p>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {KATEGORI.map((k) => (
          <Link
            key={k.slug}
            href={`/${k.slug}`}
            className="group flex items-center justify-between rounded-2xl border border-brand-100 bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-brand-300"
          >
            <div>
              <p className="text-base font-bold text-brand-900 group-hover:text-brand-700">
                {k.label}
              </p>
              <p className="mt-0.5 text-sm text-brand-800/70">
                {counts[k.slug] ?? 0} materi
              </p>
            </div>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-brand-500 text-white transition group-hover:translate-x-0.5">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </span>
          </Link>
        ))}
      </div>
    </>
  );
              }
