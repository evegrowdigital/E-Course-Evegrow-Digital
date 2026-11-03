import Link from 'next/link';
import CoverImage from './CoverImage';

export default function MateriCard({ materi, slug }) {
  return (
    <Link
      href={`/${slug}/${materi.id}`}
      className="
        group block overflow-hidden rounded-2xl
        border border-white/10
        bg-[#17101D]
        shadow-[0_8px_24px_-12px_rgba(0,0,0,0.5)]
        transition duration-200
        hover:-translate-y-1
        hover:border-[#A855F7]/50
        hover:shadow-[0_12px_30px_-12px_rgba(168,85,247,0.25)]
      "
    >
      {/* Cover */}
      <div className="relative aspect-[5/3] overflow-hidden bg-gradient-to-br from-[#4C1D65] to-[#A855F7]">
        <CoverImage
          src={`/${materi.id}.jpg`}
          alt={materi.judul}
        />

        {/* Overlay halus */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/5" />
      </div>

      {/* Judul */}
      <div className="min-h-[58px] px-3 py-2.5 sm:min-h-[68px] sm:px-4 sm:py-3">
        <h3 className="line-clamp-2 text-[13px] font-semibold leading-snug text-white/90 transition group-hover:text-[#DDA8FF] sm:text-base">
          {materi.judul}
        </h3>
      </div>
    </Link>
  );
}
