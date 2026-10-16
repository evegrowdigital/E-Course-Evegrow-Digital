import { NextResponse } from 'next/server';

export async function POST(req) {
  const body = await req.json();
  console.log('LYNK WEBHOOK:', JSON.stringify(body, null, 2));
  return NextResponse.json({ ok: true });
}
