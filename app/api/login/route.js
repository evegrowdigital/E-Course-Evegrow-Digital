import { NextResponse } from 'next/server';
import { isMember } from '@/lib/members';
import {
  COOKIE_NAME,
  SESSION_SECONDS,
  createSessionToken,
} from '@/lib/session';

export async function POST(req) {
  const { email } = await req.json();

  if (!email || !isMember(email)) {
    return NextResponse.json(
      { error: 'Email belum terdaftar' },
      { status: 401 }
    );
  }

  const token = await createSessionToken(email);
  const res = NextResponse.json({ ok: true });

  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_SECONDS,
  });

  return res;
}
