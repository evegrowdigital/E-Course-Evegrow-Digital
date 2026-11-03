'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Footer from '@/components/Footer.js';

const LOGO = '/logo.png';

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
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(
          data.error === 'NOT_MEMBER'
            ? 'Email belum terdaftar sebagai member. Gunakan email yang digunakan untuk pembelian di lynk.id.'
            : data.error || `Gagal masuk (kode ${res.status}). Coba lagi.`
        );
        return;
      }

      router.push('/');
      router.refresh();
    } catch {
      setError(
        'Koneksi bermasalah. Periksa internet kamu lalu coba lagi.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#0B0710] text-white">
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-28 h-80 w-80 rounded-full bg-[#8B18C9]/20 blur-[100px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-[#5421B8]/20 blur-[110px]"
      />

      <main className="relative flex flex-1 items-center justify-center px-4 py-10 sm:px-6">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <div className="rounded-[30px] border border-[#54266B]/70 bg-[#140D1B]/95 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.45)] sm:p-9">
            {/* Logo */}
            <div className="mx-auto flex h-[100px] w-[100px] items-center justify-center rounded-[26px] border border-[#713A91]/60 bg-gradient-to-br from-[#2A1638] to-[#160D20] p-2 shadow-[0_0_35px_rgba(174,55,255,0.16)]">
              <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-[20px] bg-[#E8D8FF]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={LOGO}
                  alt="Evegrow.Digital"
                  className="h-full w-full rounded-[20px] object-contain"
                />
              </div>
            </div>

            {/* Heading */}
            <div className="mt-7 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#C77BFF]">
                EVEGROW DIGITAL
              </p>

              <h1 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Masuk ke Member Area
              </h1>

              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#B8A8C5]">
                Login menggunakan akun Gmail yang digunakan untuk pembelian
                di lynk.id.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-[#E8DDF2]"
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
                  className="w-full rounded-2xl border border-[#493353] bg-[#0F0915] px-4 py-4 text-base text-white outline-none transition placeholder:text-[#766582] focus:border-[#B54DFF] focus:bg-[#160D20] focus:ring-4 focus:ring-[#B54DFF]/15"
                />
              </div>

              {error && (
                <p
                  role="alert"
                  className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm leading-5 text-red-300"
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-[#9B28D9] via-[#B32EEB] to-[#7626C7] px-4 py-4 text-sm font-bold text-white shadow-[0_8px_30px_rgba(159,39,219,0.25)] transition duration-200 hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="relative z-10">
                  {loading ? 'Memeriksa...' : 'Masuk'}
                </span>
              </button>
            </form>

            {/* Bottom note */}
            <p className="mt-6 text-center text-xs leading-5 text-[#806E91]">
              Akses khusus member Evegrow.Digital
            </p>
          </div>
        </div>
      </main>

      <div className="relative">
        <Footer />
      </div>
    </div>
  );
                    }
