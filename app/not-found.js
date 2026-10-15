import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-brand-50 px-4 text-center">
      <h1 className="text-2xl font-bold text-ink">Halaman tidak ditemukan</h1>
      <p className="mt-2 text-sm text-brand-800/70">Materi yang kamu cari tidak ada atau sudah dipindahkan.</p>
      <Link href="/" className="mt-5 rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700">
        Kembali ke Materi
      </Link>
    </div>
  );
}
