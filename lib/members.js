import { cache } from 'react';
import { supabaseAdmin } from './supabase';

// Jumlah member aktif di tabel members
export const getTotalMember = cache(async () => {
  const { count } = await supabaseAdmin()
    .from('members')
    .select('*', { count: 'exact', head: true })
    .eq('aktif', true);
  return count ?? 0;
});
