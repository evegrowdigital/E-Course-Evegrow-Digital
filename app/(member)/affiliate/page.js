import { getMember } from "@/lib/auth.js";
import {
  getAffiliator,
  rupiah,
  NOMOR_WA_ADMIN,
} from "@/lib/affiliator.js";
import SalinLink from "@/components/SalinLink.js";

export const metadata = {
  title: "Dashboard Affiliate | Evegrow.Digital",
};

export const dynamic = "force-dynamic";

export default async function AffiliatePage() {
  const member = await getMember();
  const email = member?.email || "";
  const aff = await getAffiliator(email);

  if (!aff) {
    const pesan = `Halo admin Evegrow, saya mau daftar jadi Affiliator. Email member saya: ${email}`;
    const waLink = `https://wa.me/${NOMOR_WA_ADMIN}?text=${encodeURIComponent(
      pesan
    )}`;

    return (
      <div className="min-h-screen w-full bg-page text-purple-50">
        <h1 className="text-2xl font-bold text-purple-50 sm:text-3xl">
          Dashboard Affiliate
        </h1>

        <div className="relative mt-6 max-w-xl overflow-hidden rounded-2xl border border-purple-400/20 bg-card p-6 shadow-[0_0_30px_rgba(164,45,245,0.08)]">
          <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-purple-600/10 blur-3xl" />

          <div className="relative">
            <div className="mb-4 inline-flex items-center rounded-full border border-purple-400/20 bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-300">
              Affiliate Program
            </div>

            <p className="text-base font-bold text-purple-100">
              Kamu belum terdaftar sebagai Affiliator
            </p>

            <p className="mt-2 text-sm leading-relaxed text-purple-200/65">
              Daftar sekarang dan dapatkan komisi dari setiap penjualan lewat
              link affiliate kamu. Setelah kamu mendaftar, kami akan
              menambahkan email kamu sebagai Affiliator dan link-nya akan
              muncul di halaman ini.
            </p>

            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-5"
            >
              Daftar Jadi Affiliator
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-page text-purple-50">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-purple-50 sm:text-3xl">
          Dashboard Affiliate
        </h1>

        <p className="mt-1 text-sm text-purple-200/60 sm:text-base">
          Pantau penjualan dan komisi dari link affiliate kamu.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:max-w-xl sm:gap-5">
        {/* Total Penjualan */}
        <div className="rounded-2xl border border-purple-400/20 bg-card p-4 shadow-[0_0_24px_rgba(164,45,245,0.06)] sm:p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-purple-300">
            Total Penjualan
          </p>

          <p className="mt-2 break-words text-xl font-bold text-purple-100 sm:text-2xl">
            {rupiah(aff.penjualan)}
          </p>
        </div>

        {/* Total Komisi */}
        <div className="rounded-2xl border border-purple-300/20 bg-gradient-to-br from-[#9b20d5] via-[#8420d8] to-[#5920b8] p-4 text-white shadow-[0_8px_28px_rgba(164,45,245,0.2)] sm:p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-white/75">
            Total Komisi
          </p>

          <p className="mt-2 break-words text-xl font-bold sm:text-2xl">
            {rupiah(aff.komisi)}
          </p>
        </div>
      </div>

      {/* Update Info */}
      {aff.update && (
        <p className="mt-3 text-xs text-purple-300/50 sm:text-sm">
          Data diperbarui: {aff.update}
        </p>
      )}

      {/* Affiliate Link */}
      <div className="mt-6 max-w-2xl rounded-2xl border border-purple-400/20 bg-card p-4 shadow-[0_0_24px_rgba(164,45,245,0.06)] sm:p-5">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-purple-400/20 bg-purple-500/10 text-purple-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          </div>

          <p className="text-sm font-semibold text-purple-100">
            Link Affiliate Kamu
          </p>
        </div>

        {aff.link ? (
          <SalinLink link={aff.link} />
        ) : (
          <p className="text-sm leading-6 text-purple-200/60">
            Link affiliate kamu sedang disiapkan. Silakan cek kembali nanti.
          </p>
        )}
      </div>
    </div>
  );
          }
