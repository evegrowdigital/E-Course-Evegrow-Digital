import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getItems } from '@/lib/konten.js';

export const dynamic = 'force-dynamic';

// Membuat teks di antara **...** menjadi bold.
function renderBold(text) {
  if (typeof text !== 'string') {
    return text;
  }

  return text.split(/(\*\*.*?\*\*)/gs).map((part, index) => {
    const isBold = part.startsWith('**') && part.endsWith('**');

    if (isBold) {
      return (
        <strong key={index} className="font-bold">
          {part.slice(2, -2)}
        </strong>
      );
    }

    return part;
  });
}

// Ubah link YouTube jadi link embed. Link lain dipakai apa adanya.
function getEmbedUrl(url) {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/
  );
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

export default async function BlueprintDetailPage({ params }) {
  const { id } = await params;
  const items = await getItems('blueprint-bisnis');
  const item = items.find((entry) => String(entry.id) === String(id));

  if (!item) {
    notFound();
  }

  const video = typeof item.video === 'string' ? item.video.trim() : '';
  const embedUrl = video ? getEmbedUrl(video) : null;
  const materi = typeof item.materi === 'string' ? item.materi.trim() : '';

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-6 text-white sm:px-6 lg:px-8">
      <Link
        href="/blueprint-bisnis"
        className="mb-6 inline-block text-sm text-purple-300 hover:text-purple-200"
      >
        ← Kembali
      </Link>

      <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {renderBold(item.judul)}
      </h1>

      {/* Kotak video: hanya muncul jika data video terisi */}
      {video && (
        <div className="mt-6 aspect-video overflow-hidden rounded-2xl border border-white/10 bg-[#17121d]">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={item.judul || 'Video tutorial'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          ) : (
            <video src={video} controls className="h-full w-full" />
          )}
        </div>
      )}

      {/* Materi */}
      {materi && (
        <div className="mt-6 whitespace-pre-wrap text-base leading-relaxed text-white/80">
          {renderBold(materi)}
        </div>
      )}
    </main>
  );
        }
