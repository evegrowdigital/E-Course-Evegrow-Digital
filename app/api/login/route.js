import { NextResponse } from "next/server";
import { isMember } from "@/lib/members";

export async function POST(req) {
  const { email } = await req.json();
  if (!isMember(email)) {
    return NextResponse.json({ error: "Email belum terdaftar" }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set("member_email", email.trim().toLowerCase(), {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}
