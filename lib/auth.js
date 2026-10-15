import { cache } from 'react';
import { cookies } from 'next/headers';
import { COOKIE_NAME, verifySessionToken } from './session';
import { isMember } from './members';

export const getMember = cache(async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) return null;

  const session = await verifySessionToken(token);
  if (!session?.email) return null;

  const email = session.email.toLowerCase().trim();
  if (!isMember(email)) return null;

  return { email, nama: email.split('@')[0], aktif: true, created_at: null };
});
