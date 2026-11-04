import Image from 'next/image';
import { getTotalMember } from '@/lib/members';
import { getItems } from '@/lib/konten';
import menu from '@/data/menu';
import MenuTile from '@/components/MenuTile';
import MenuIcon from '@/components/MenuIcon';

export default async function BerandaPage() {
  const total = await getTotalMember();

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
      {/* Gambar Beranda + Overlay Total Member */}
      <div className="relative -mt-4 aspect-video w-full overflow-hidden rounded-3xl border border-[#542264] sm:-mt-6">
        <Image
          src="/beranda.jpg"
          alt="E-course Mulai Penghasilan dengan Canva dan AI"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover"
        />

        {/* Overlay Total Member (area biru) */}
        <div className="absolute left-[2.5%] top-[57%] flex h-[29%] w-[39%] items-center gap-2 rounded-xl bg-gradient-to-br from-[#F5B8FF] via-[#E45AFF] to-[#D000F5] px-2 shadow-[0_6px_18px_-4px_rgba(208,0,245,0.7)] sm:gap-3 sm:rounded-2xl sm:px-4">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/90 text-[#B800D9] sm:h-10 sm:w-10 sm:rounded-xl">
            <MenuIcon name="users" className="h-4 w-4 sm:h-6 sm:w-6" />
          </span>

          <div className="min-w-0">
            <p className="truncate text-[10px] font-semibold leading-tight text-white/95 sm:text-sm">
              Total Member
            </p>
            <p className="text-lg font-extrabold leading-none text-white sm:text-3xl">
              {total.toLocaleString('id-ID')}
            </p>
          </div>
        </div>
      </div>

      {/* Petunjuk Menu */}
      <p className="mt-3 text-sm font-medium text-[#C5A8D5] sm:text-base">
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
