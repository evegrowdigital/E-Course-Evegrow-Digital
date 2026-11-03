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
      <h1 className="break-words text-2xl font-bold text-[#352348] sm:text-3xl">
        Halo, {name}!
      </h1>

      {/* Kartu sambutan */}
      <div className="mt-4 rounded-3xl border border-[#E3D0F5] bg-gradient-to-br from-[#FBF6FF] via-[#F3E8FF] to-[#E9D8FA] p-5 shadow-[0_12px_30px_-12px_rgba(117,66,184,0.25)] sm:p-6">
        <p className="text-[15px] leading-relaxed text-[#554363] sm:text-base">
          Terima kasih sudah mempercayakan proses belajar bersama Evegrow.digital. Semoga ini
          menjadi peluang bagi teman-teman untuk upgrade skill dan membuka peluang penghasilan
          dari rumah. Aamiin 🤲
        </p>
      </div>

      {/* Kartu Total Member */}
      <div className="mt-4 flex items-center gap-4 rounded-3xl border border-[#CDB4ED] bg-gradient-to-br from-[#E4D2FA] via-[#D7BDF3] to-[#C7A5EB] p-5 shadow-[0_12px_28px_-10px_rgba(117,66,184,0.32)]">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/70 bg-[#FCF8FF] text-[#8750C5] shadow-[0_5px_14px_-5px_rgba(88,47,133,0.25)]">
          <MenuIcon name="users" className="h-6 w-6" />
        </span>

        <div>
          <p className="text-sm font-semibold text-[#70419F]">
            Total Member
          </p>

          <p className="text-2xl font-bold leading-tight text-[#542A80] sm:text-3xl">
            {total.toLocaleString('id-ID')}
          </p>
        </div>
      </div>

      {/* Petunjuk menu */}
      <p className="mt-6 text-sm font-medium text-[#8A65AC] sm:text-base">
        Pilih menu yang ingin kamu buka.
      </p>

      {/* Daftar menu */}
      <div className="mt-3 grid grid-cols-3 gap-3 sm:gap-5">
        {daftarMenu.map((item) => (
          <MenuTile key={item.label} item={item} />
        ))}
      </div>
    </>
  );
        }
