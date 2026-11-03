import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { COOKIE_NAME, SESSION_SECONDS, createSessionToken } from '@/lib/session';

export const runtime = 'nodejs';

export async function POST(request) {
  try {
    // Cek variable yang wajib ada
    const wajib = ['SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY', 'SESSION_SECRET'];
    const hilang = wajib.filter((k) => !process.env[k]);
    if (hilang.length > 0) {
      return NextResponse.json(
        { error: `Pengaturan server belum lengkap. Variable belum diisi: ${hilang.join(', ')}` },
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

    const { data, error } = await supabaseAdmin()
      .from('members')
      .select('email, aktif')
      .eq('email', email)
      .maybeSingle();

    if (error) {
      return NextResponse.json(
        { error: `Gagal membaca data member: ${error.message}` },
        { status: 500 }
      );
    }

    if (!data || !data.aktif) {
      return NextResponse.json({ error: 'NOT_MEMBER' }, { status: 401 });
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
  } catch (e) {
    return NextResponse.json(
      { error: `Terjadi kesalahan di server: ${e?.message || 'tidak diketahui'}` },
      { status: 500 }
    );
  }
}
