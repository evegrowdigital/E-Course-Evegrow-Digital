import Link from 'next/link';
import CoverImage from './CoverImage';

export default function MateriCard({ materi }) {
  const cover = materi.cover || `/${materi.folder}-${materi.id}.jpg`;

  return (
    <Link
      href={`/${materi.kategori}/${materi.id}`}
      className="group block overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-soft transition hover:-translate-y-0.5 hover:border-brand-300"
    >
      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-brand-200 to-brand-400">
        <CoverImage src={cover} alt={materi.judul} />
      </div>
      <div className="px-3 py-2 sm:px-3.5 sm:py-2.5">
        <h3 className="line-clamp-2 min-h-[2rem] text-xs font-semibold leading-snug text-ink group-hover:text-brand-700 sm:text-sm">
          {materi.judul}
        </h3>
      </div>
    </Link>
  );
}
