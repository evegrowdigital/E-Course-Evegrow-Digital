import { cache } from 'react';
import { cookies } from 'next/headers';
import { COOKIE_NAME, verifySessionToken } from './session';
import { findMember } from './members';

// Email dicek ulang ke data/members.json setiap halaman dibuka,
// jadi email yang dihapus dari daftar otomatis kehilangan akses setelah deploy.
export const getMember = cache(async () => {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;

  const session = await verifySessionToken(token);
  if (!session?.email) return null;

  return findMember(session.email);
});
