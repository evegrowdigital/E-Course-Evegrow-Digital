import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getItems } from '@/lib/konten.js';

import PromptItem from './PromptItem';

import {
  daftarVideo,
  daftarLink,
  daftarPanduan,
  daftarPrompt,
} from './tutorial-utils';

export const dynamic = 'force-dynamic';

// ... punyaIsi, TampilkanIsi, TombolAkses: tidak diubah ...

// Decode aman agar id aneh tidak membuat halaman error.
function decodeAman(nilai) {
  try {
    return decodeURIComponent(nilai);
  } catch {
    return nilai;
  }
}

export default async function MateriDetailPage({ params }) {
  const { id } = await params;

  // MATERI: ambil data dari 'materi'
  const data = await getItems('materi');
  const items = Array.isArray(data) ? data : [];

  const idDicari = decodeAman(id);
  const item = items.find(
    (materi, index) => String(materi.id ?? index) === idDicari
  );

  if (!item) {
    notFound();
  }

  const videos = daftarVideo(item);

  const links = daftarLink(item).filter(
    (link) =>
      link && typeof link.url === 'string' && link.url.trim() !== ''
  );

  const panduan = daftarPanduan(item);
  const prompts = daftarPrompt(item);

  const isVideo = videos.length > 0;
  const isPanduan = punyaIsi(panduan);
  const isTools = links.length > 0;
  const isPrompt = prompts.length > 0;

  return (
    <main className="mx-auto w-full max-w-5xl px-4 pb-12 text-white sm:px-6 lg:px-8">
      <div className="mb-5">
        {/* MATERI: kembali ke /materi */}
        <Link
          href="/materi"
          className="inline-flex items-center gap-2 rounded-lg border border-purple-300/20 bg-white/5 px-3 py-2 text-sm font-medium text-purple-200 transition hover:bg-white/10 hover:text-white"
        >
          <span aria-hidden="true">←</span>
          Kembali ke Materi
        </Link>
      </div>

      {/* Header, Video, Panduan, Prompt, Tools, Materi Kosong:
          sama seperti kode Anda sebelumnya */}
    </main>
  );
            }
