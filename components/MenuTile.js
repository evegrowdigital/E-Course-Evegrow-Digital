import Link from 'next/link';
import MenuIcon from './MenuIcon';

function IconTile({ item }) {
  const [c1, c2] = item.colors;

  return (
    <span
      className="relative flex h-14 w-14 items-center justify-center rounded-[1.15rem] transition duration-200 group-hover:-translate-y-0.5 sm:h-20 sm:w-20 sm:rounded-3xl"
      style={{
        background: `linear-gradient(160deg, ${c1}, ${c2})`,
        boxShadow: `
          0 12px 18px -8px ${c2}aa,
          inset 0 2px 3px rgba(255,255,255,.55),
          inset 0 -5px 8px rgba(0,0,0,.14)
        `,
      }}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-1.5 top-1 h-1/2 rounded-t-[0.9rem] rounded-b-[2rem] bg-gradient-to-b from-white/45 to-transparent"
      />

      <MenuIcon
        name={item.icon}
        className="relative h-7 w-7 text-white drop-shadow sm:h-10 sm:w-10"
      />
    </span>
  );
}

export default function MenuTile({ item }) {
  const base =
    'group flex flex-col items-center gap-2 rounded-2xl border border-[#E5D8F5] bg-[#FBF8FF] px-2 py-4 text-center shadow-[0_8px_24px_-12px_rgba(117,66,184,0.22)] transition duration-200 hover:-translate-y-1 hover:border-[#C8A9EF] hover:bg-[#F7F0FF] sm:gap-3 sm:py-6';

  const content = (
    <>
      <IconTile item={item} />

      <span className="flex min-h-[2rem] flex-col items-center justify-start sm:min-h-[2.5rem]">
        <span className="text-[11px] font-semibold leading-tight text-ink sm:text-sm">
          {item.label}
        </span>

        {!item.href && (
          <span className="mt-1 rounded-full bg-[#EEE2FC] px-2 py-0.5 text-[9px] font-medium text-[#8051B5] sm:text-[11px]">
            Segera hadir
          </span>
        )}
      </span>
    </>
  );

  if (!item.href) {
    return (
      <div className={`${base} opacity-95`}>
        {content}
      </div>
    );
  }

  if (item.href.startsWith('http')) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={base}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={item.href} className={base}>
      {content}
    </Link>
  );
}
