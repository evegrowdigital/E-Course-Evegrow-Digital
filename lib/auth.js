
import { cache } from 'react';
import { cookies } from 'next/headers';
import { COOKIE_NAME, verifySessionToken } from './session';
import { supabaseAdmin } from './supabase';

export const getMember = cache(async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) return null;

  const session = await verifySessionToken(token);
  if (!session?.email) return null;

  const { data, error } = await supabaseAdmin()
    .from('members')
    .select('email, nama, aktif, created_at')
    .eq('email', session.email.toLowerCase().trim())
    .maybeSingle();

  if (error || !data || !data.aktif) return null;

  return data;
});
