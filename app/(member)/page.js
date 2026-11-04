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
      <div className="relative -mt-4 aspect-video w-full overflow-hidden rounded-3xl border border-[#542264] sm:-mt-6">
        <Image
          src="/beranda.jpg"
          alt="E-course Mulai Penghasilan dengan Canva dan AI"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover"
        />

        {/* Overlay Total Member */}
        <div className="absolute left-[3.5%] top-[67%] flex h-[19%] w-[29%] items-center gap-2 rounded-xl bg-gradient-to-br from-[#C026D3] via-[#A21CAF] to-[#86198F] px-2 shadow-[0_6px_16px_-4px_rgba(162,28,175,0.7)] sm:gap-3 sm:rounded-2xl sm:px-4">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-white/90 text-[#A21CAF] sm:h-9 sm:w-9 sm:rounded-xl">
            <MenuIcon name="users" className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
          </span>

          <div className="min-w-0">
            <p className="truncate text-[9px] font-semibold leading-tight text-white sm:text-sm">
              Total Member
            </p>
            <p className="text-base font-extrabold leading-none text-white sm:text-2xl">
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
