import { NextResponse } from 'next/server';
import { COOKIE_NAME } from '@/lib/session';

export const runtime = 'nodejs';

function clear(res) {
  res.cookies.set({ name: COOKIE_NAME, value: '', path: '/', maxAge: 0 });
  return res;
}

export async function POST() {
  return clear(NextResponse.json({ ok: true }));
}

export async function GET(request) {
  return clear(NextResponse.redirect(new URL('/login', request.url)));
}
