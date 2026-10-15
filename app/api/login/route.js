
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
    const body = await request.json().catch(() => null);
    const email = String(body?.email || '').trim().toLowerCase();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Masukkan email yang valid.' },
        { status: 400 }
      );
    }

    const supabase = supabaseAdmin();

    const { data, error } = await supabase
      .from('members')
      .select('email, aktif')
      .eq('email', email)
      .maybeSingle();

    // Tampilkan penyebab error database untuk sementara.
    if (error) {
      console.error('LOGIN DATABASE ERROR:', error);

      return NextResponse.json(
        {
          error: `DEBUG DATABASE: ${error.message}`,
          code: error.code || 'TIDAK ADA KODE',
        },
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
    const response = NextResponse.json({ ok: true });

    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: SESSION_SECONDS,
    });

    return response;
  } catch (err) {
    console.error('LOGIN UNEXPECTED ERROR:', err);

    return NextResponse.json(
      {
        error: `DEBUG SERVER: ${err instanceof Error ? err.message : 'Kesalahan tidak diketahui'}`,
      },
      { status: 500 }
    );
  }
}
