import { cache } from 'react';
import { cookies } from 'next/headers';
import { COOKIE_NAME, verifySessionToken } from './session';
import { supabaseAdmin } from './supabase';

export const getMember = cache(async () => {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;

  const session = await verifySessionToken(token);
  if (!session?.email) return null;

  const { data } = await supabaseAdmin()
    .from('members')
    .select('email, nama, true, created_at')
    .eq('email', session.email)
    .maybeSingle();

  if (!data || !data.true) return null;
  return data;
});
