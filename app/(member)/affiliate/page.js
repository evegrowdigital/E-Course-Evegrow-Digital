
import { getMember } from '@/lib/auth.js';
import { getAffiliator, rupiah, NOMOR_WA_ADMIN } from '@/lib/affiliator.js';
import SalinLink from '@/components/SalinLink.js';

export const metadata = { title: 'Dashboard Affiliate | Evegrow.Digital' };
export const dynamic = 'force-dynamic';

export default async function AffiliatePage() {
  const member = await getMember();
  const email = member?.email || '';
  const aff = await getAffiliator(email);

  if (!aff) {
    const pesan = `Halo admin Evegrow, saya mau daftar jadi Affiliator. Email member saya: ${email}`;
    const waLink = `https://wa.me/${NOMOR_WA_ADMIN}?text=${encodeURIComponent(pesan)}`;

    return (
      <>
        <h1 className="text-2xl font-bold text-ink sm:text-3xl">
          Dashboard Affiliate
        </h1>

        <div className="mt-6 max-w-xl rounded-2xl border border-[#E9D5FA] bg-white p-6 shadow-soft">
          <p className="text-base font-bold text-[#6B21A8]">
            Kamu belum terdaftar sebagai Affiliator
          </p>

          <p className="mt-2 text-sm leading-relaxed text-[#7E22CE]/80">
            Daftar sekarang dan dapatkan komisi dari setiap penjualan lewat link
            affiliate kamu. Setelah kamu mendaftar, kami akan menambahkan email
            kamu sebagai Affiliator dan link-nya akan muncul di halaman ini.
          </p>

          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#9A4FD6] to-[#CF94F2] px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:from-[#8438C2] hover:to-[#B875E8]"
          >
            Daftar Jadi Affiliator
          </a>
        </div>
      </>
    );
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-ink sm:text-3xl">
        Dashboard Affiliate
      </h1>

      <p className="mt-1 text-sm text-[#7E22CE]/70 sm:text-base">
        Pantau penjualan dan komisi dari link affiliate kamu.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:max-w-xl sm:gap-5">
        <div className="rounded-2xl border border-[#E9D5FA] bg-white p-4 shadow-soft sm:p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-[#9A4FD6]">
            Total Penjualan
          </p>

          <p className="mt-2 text-xl font-bold text-[#6B21A8] sm:text-2xl">
            {rupiah(aff.penjualan)}
          </p>
        </div>

        <div className="rounded-2xl border border-[#CF94F2]/30 bg-gradient-to-br from-[#9A4FD6] to-[#CF94F2] p-4 text-white shadow-soft sm:p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-white/80">
            Total Komisi
          </p>

          <p className="mt-2 text-xl font-bold sm:text-2xl">
            {rupiah(aff.komisi)}
          </p>
        </div>
      </div>

      {aff.update && (
        <p className="mt-3 text-xs text-[#7E22CE]/60 sm:text-sm">
          Data diperbarui: {aff.update}
        </p>
      )}

      <div className="mt-6 max-w-2xl rounded-2xl border border-[#E9D5FA] bg-white p-4 shadow-soft sm:p-5">
        <p className="mb-3 text-sm font-semibold text-[#6B21A8]">
          Link Affiliate Kamu
        </p>

        {aff.link ? (
          <SalinLink link={aff.link} />
        ) : (
          <p className="text-sm text-[#7E22CE]/70">
            Link affiliate kamu sedang disiapkan. Silakan cek kembali nanti.
          </p>
        )}
      </div>
    </>
  );
          }
