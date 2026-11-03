import { NextResponse } from 'next/server';
import { findMember } from '@/lib/members';
import { COOKIE_NAME, SESSION_SECONDS, createSessionToken } from '@/lib/session';

export const runtime = 'nodejs';

export async function POST(request) {
  try {
    if (!process.env.SESSION_SECRET) {
      return NextResponse.json(
        { error: 'Pengaturan server belum lengkap: SESSION_SECRET belum diisi di Vercel.' },
        { status: 500 }
      );
    }

    let email = '';
    try {
      const body = await request.json();
      email = String(body.email || '').trim().toLowerCase();
    } catch {
      return NextResponse.json({ error: 'Permintaan tidak valid.' }, { status: 400 });
    }

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Masukkan email yang valid.' }, { status: 400 });
    }

    const member = findMember(email);
    if (!member) {
      return NextResponse.json({ error: 'NOT_MEMBER' }, { status: 401 });
    }

    const token = await createSessionToken(member.email);
    const res = NextResponse.json({ ok: true });
    res.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: SESSION_SECONDS,
    });
    return res;
  } catch (e) {
    return NextResponse.json(
      { error: `Terjadi kesalahan di server: ${e?.message || 'tidak diketahui'}` },
      { status: 500 }
    );
  }
}
