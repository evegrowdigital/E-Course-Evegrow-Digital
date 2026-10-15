import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase.js';
import {
  COOKIE_NAME,
  SESSION_SECONDS,
  createSessionToken,
} from '@/lib/session.js';

export const runtime = 'nodejs';

export async function POST(request) {
  try {
    let email = '';

    try {
      const body = await request.json();
      email = String(body.email || '').trim().toLowerCase();
    } catch {
      return NextResponse.json(
        { error: 'Permintaan tidak valid.' },
        { status: 400 }
      );
    }

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Masukkan email yang valid.' },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin()
      .from('members')
      .select('email, aktif')
      .eq('email', email)
      .maybeSingle();

    if (error) {
      console.error('LOGIN DATABASE ERROR:', error);
      return NextResponse.json(
        { error: 'Terjadi gangguan pada database.' },
        { status: 500 }
      );
    }

    if (!data || !data.aktif) {
      return NextResponse.json(
        { error: 'NOT_MEMBER' },
        { status: 401 }
      );
    }

    const token = await createSessionToken(data.email);
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
  } catch (err) {
    console.error('LOGIN UNEXPECTED ERROR:', err);

    return NextResponse.json(
      { error: 'Terjadi gangguan pada server.' },
      { status: 500 }
    );
  }
}
