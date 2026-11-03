
import { getMember } from '@/lib/auth';
import { getTotalMember } from '@/lib/members';
import { getItems } from '@/lib/konten';
import menu from '@/data/menu';
import MenuTile from '@/components/MenuTile';
import MenuIcon from '@/components/MenuIcon';

export default async function BerandaPage() {
  const member = await getMember();
  const total = await getTotalMember();
  const name = member?.nama || member?.email?.split('@')[0] || 'Member';

  // Menu dengan folder aktif otomatis jika sudah ada isinya
  const daftarMenu = menu.map((item) => ({
    ...item,
    href: item.folder
      ? getItems(item.folder).length > 0
        ? `/${item.slug}`
        : ''
      : item.href,
  }));

  return (
    <>
      {/* Judul Beranda */}
      <h1 className="break-words text-2xl font-bold text-[#F5EAFB] sm:text-3xl">
        Halo, {name}!
      </h1>

      {/* Kartu Sambutan */}
      <div className="relative mt-4 overflow-hidden rounded-3xl border border-[#542264] bg-gradient-to-br from-[#2A1236] via-[#211329] to-[#160D1D] p-5 shadow-[0_12px_32px_-12px_rgba(208,0,245,0.22)] sm:p-6">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[#D000F5]/10 blur-3xl"
        />

        <p className="relative text-[15px] leading-relaxed text-[#D7C9E2] sm:text-base">
          Terima kasih sudah mempercayakan proses belajar bersama Evegrow.digital. Semoga ini
          menjadi peluang bagi teman-teman untuk upgrade skill dan membuka peluang penghasilan
          dari rumah. Aamiin 🤲
        </p>
      </div>

      {/* Kartu Total Member */}
      <div className="relative mt-4 flex items-center gap-4 overflow-hidden rounded-3xl border border-[#702486] bg-gradient-to-br from-[#3A1749] via-[#291332] to-[#1B1024] p-5 shadow-[0_12px_30px_-10px_rgba(208,0,245,0.28)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#D000F5]/15 blur-3xl"
        />

        <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#75418A] bg-[#211329] text-[#E45AFF] shadow-[0_5px_16px_-5px_rgba(208,0,245,0.3)]">
          <MenuIcon name="users" className="h-6 w-6" />
        </span>

        <div className="relative">
          <p className="text-sm font-semibold text-[#E7A0FF]">
            Total Member
          </p>

          <p className="text-2xl font-bold leading-tight text-white sm:text-3xl">
            {total.toLocaleString('id-ID')}
          </p>
        </div>
      </div>

      {/* Petunjuk Menu */}
      <p className="mt-6 text-sm font-medium text-[#C5A8D5] sm:text-base">
        Pilih menu yang ingin kamu buka.
      </p>

      {/* Daftar Menu */}
      <div className="mt-3 grid grid-cols-3 gap-3 sm:gap-5">
        {daftarMenu.map((item) => (
          <MenuTile key={item.label} item={item} />
        ))}
      </div>
    </>
  );
        }
