import { getMember } from '@/lib/auth';
import { getTotalMember } from '@/lib/members';
import menu from '@/data/menu';
import MenuTile from '@/components/MenuTile';
import MenuIcon from '@/components/MenuIcon';

export default async function BerandaPage() {
  const member = await getMember();
  const total = await getTotalMember();
  const name = member?.nama || member?.email?.split('@')[0] || 'Member';

  return (
    <>
      <h1 className="break-words text-2xl font-bold text-ink sm:text-3xl">Halo, {name}!</h1>

      <div className="mt-4 rounded-3xl border border-brand-100 bg-gradient-to-br from-white to-brand-100 p-5 shadow-soft sm:p-6">
        <p className="text-[15px] leading-relaxed text-ink/80 sm:text-base">
          Terima kasih sudah mempercayakan proses belajar bersama Evegrow.digital. Semoga ini
          menjadi peluang bagi teman-teman untuk upgrade skill dan membuka peluang penghasilan
          dari rumah. Aamiin 🤲
        </p>
      </div>

      {/* Kotak total member */}
      <div className="mt-4 flex items-center gap-4 rounded-3xl border border-brand-200 bg-gradient-to-br from-brand-200 to-brand-100 p-5 shadow-soft">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-brand-700 shadow-soft">
          <MenuIcon name="users" className="h-6 w-6" />
        </span>
        <div>
          <p className="text-sm font-medium text-brand-800">Total Member</p>
          <p className="text-2xl font-bold leading-tight text-brand-900 sm:text-3xl">
            {total.toLocaleString('id-ID')}
          </p>
        </div>
      </div>

      <p className="mt-6 text-sm text-brand-800/70 sm:text-base">
        Pilih menu yang ingin kamu buka.
      </p>

      <div className="mt-3 grid grid-cols-3 gap-3 sm:gap-5">
        {menu.map((item) => (
          <MenuTile key={item.label} item={item} />
        ))}
      </div>
    </>
  );
}
