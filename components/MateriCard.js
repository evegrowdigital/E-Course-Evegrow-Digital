import Link from 'next/link';
import CoverImage from './CoverImage';

export default function MateriCard({ materi }) {
  return (
    <Link
      href={`/materi/${materi.id}`}
      className="group block overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-soft transition hover:border-brand-300"
    >
      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-brand-200 to-brand-400">
        <CoverImage src={`/${materi.id}.jpg`} alt={materi.judul} />
      </div>
      <div className="p-3 sm:p-4">
        <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold leading-snug text-ink group-hover:text-brand-700 sm:text-base">
          {materi.judul}
        </h3>
      </div>
    </Link>
  );
}
