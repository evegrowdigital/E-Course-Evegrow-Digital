
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Footer from '@/components/Footer.js';

const LOGO =
  'https://i.ibb.co.com/BHQvvZNP/Welcome-1024-x-1024-piksel-20261018-204041-0000.png';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(
          data.error === 'NOT_MEMBER'
            ? 'Email belum terdaftar sebagai member. Gunakan email yang digunakan untuk pembelian di lynk.id.'
            : data.error || 'Gagal masuk. Coba lagi.'
        );
        return;
      }

      router.push('/');
      router.refresh();
    } catch {
      setError('Koneksi bermasalah. Periksa internet kamu lalu coba lagi.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#F0E7FF] via-[#F8F4FF] to-[#F5F0FF] px-4">
      <main className="flex flex-1 items-center justify-center py-10">
        <div className="w-full max-w-md rounded-[30px] border border-[#E9DDFF] bg-white/95 p-6 shadow-[0_18px_55px_rgba(105,55,166,0.12)] sm:p-8">

          {/* Logo dengan outline dan shadow lembut */}
          <div className="mx-auto flex h-[104px] w-[104px] items-center justify-center overflow-hidden rounded-[23px] border border-[#DCC3FF] bg-white p-1.5 shadow-[0_4px_18px_rgba(124,58,237,0.18)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={LOGO}
              alt="Evegrow.Digital"
              className="h-full w-full rounded-[17px] object-contain"
            />
          </div>

          <h1 className="mt-7 text-center text-xl font-bold tracking-tight text-[#302044] sm:text-2xl">
            Masuk ke Member Area
          </h1>

          <p className="mx-auto mt-2 max-w-sm text-center text-sm leading-6 text-[#806B99]">
            Login menggunakan akun Gmail yang digunakan untuk pembelian di lynk.id.
          </p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-[#39294B]"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@gmail.com"
                className="w-full rounded-2xl border border-[#E0D1F4] bg-[#FAF7FF] px-4 py-3.5 text-base text-[#302044] outline-none transition placeholder:text-[#B5A7C5] focus:border-[#9B63E8] focus:bg-white focus:ring-4 focus:ring-[#A879ED]/15"
              />
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm leading-5 text-red-700"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-gradient-to-r from-[#7040AD] to-[#60349B] px-4 py-4 text-sm font-semibold text-white shadow-[0_7px_18px_rgba(103,58,165,0.22)] transition duration-200 hover:from-[#63369D] hover:to-[#542B8D] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Memeriksa...' : 'Masuk'}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
