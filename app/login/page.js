'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Footer from '@/components/Footer.js';

const LOGO = 'https://i.ibb.co.com/v4vnDrZr/file-0000000095ac820695edea0b24952bb0.png';

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
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(
          data.error === 'NOT_MEMBER'
            ? 'Email belum terdaftar sebagai member. Gunakan akun Gmail yang digunakan untuk pembelian di lynk.id.'
            : data.error || 'Gagal masuk. Coba lagi.'
        );
        setLoading(false);
        return;
      }

      router.push('/');
      router.refresh();
    } catch {
      setError('Koneksi bermasalah. Periksa internet kamu lalu coba lagi.');
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-brand-100 to-brand-50 px-4">
      <main className="flex flex-1 items-center justify-center py-10">
        <div className="w-full max-w-md rounded-3xl border border-brand-100 bg-white p-6 shadow-soft sm:p-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LOGO} alt="Evegrow.Digital" className="mx-auto h-14 w-auto" />
          <h1 className="mt-6 text-center text-xl font-bold text-ink sm:text-2xl">
            Masuk ke Member Area
          </h1>
          <p className="mt-1 text-center text-sm text-brand-800/70">
            Login menggunakan akun Gmail yang digunakan untuk pembelian di lynk.id.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
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
                className="w-full rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:bg-white"
              />
            </div>

            {error && (
              <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:opacity-60"
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
