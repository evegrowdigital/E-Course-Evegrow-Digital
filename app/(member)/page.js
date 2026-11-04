import Image from 'next/image';
import { getTotalMember } from '@/lib/members';
import { getItems } from '@/lib/konten';
import menu from '@/data/menu';
import MenuTile from '@/components/MenuTile';
import MenuIcon from '@/components/MenuIcon';

export default async function BerandaPage() {
  const total = await getTotalMember();

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
      {/* Gambar Beranda + Overlay Total Member */}
      <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-[#542264] shadow-[0_12px_32px_-12px_rgba(208,0,245,0.22)]">
        <Image
          src="/beranda.jpg"
          alt="E-course Mulai Penghasilan dengan Canva dan AI"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover"
        />

        {/* Overlay Total Member (kiri bawah) */}
        <div className="absolute bottom-[6%] left-[3%] flex items-center gap-2 rounded-2xl border border-[#702486] bg-[#1B1024]/80 p-2 shadow-[0_8px_20px_-8px_rgba(208,0,245,0.45)] backdrop-blur-md sm:gap-3 sm:p-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-[#75418A] bg-[#211329] text-[#E45AFF] sm:h-10 sm:w-10">
            <MenuIcon name="users" className="h-4 w-4 sm:h-5 sm:w-5" />
          </span>

          <div>
            <p className="text-[10px] font-semibold leading-tight text-[#E7A0FF] sm:text-xs">
              Total Member
            </p>
            <p className="text-base font-bold leading-tight text-white sm:text-xl">
              {total.toLocaleString('id-ID')}
            </p>
          </div>
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
