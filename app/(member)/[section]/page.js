import { notFound } from 'next/navigation';
import { findSection } from '@/lib/menu';
import { getItems } from '@/lib/konten';
import MateriCard from '@/components/MateriCard';

const cariSection = findSection;

export function generateMetadata({ params }) {
  const s = cariSection(params.section);
  return { title: s ? `${s.label} | Evegrow.Digital` : 'Evegrow.Digital' };
}

export default function SectionPage({ params }) {
  const section = cariSection(params.section);
  if (!section) notFound();

  const daftar = getItems(section.folder);

  return (
    <>
      <h1 className="text-2xl font-bold text-ink sm:text-3xl">{section.label}</h1>
      <p className="mt-1 text-sm text-brand-800/70 sm:text-base">Pilih untuk mulai belajar.</p>

      {daftar.length === 0 ? (
        <p className="mt-8 rounded-2xl bg-white p-6 text-center text-sm text-brand-800/70">
          Belum ada isi. Tambahkan folder item (contoh: {section.prefix}1) berisi data.js di
          folder data/{section.folder}.
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 md:gap-5 xl:grid-cols-4">
          {daftar.map((m) => (
            <MateriCard key={m.id} materi={m} slug={section.slug} />
          ))}
        </div>
      )}
    </>
  );
}
