
import { createClient } from '@supabase/supabase-js';

export function supabaseAdmin() {
  const url = process.env.SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!url || !key) {
    throw new Error(
      'SUPABASE_URL atau SUPABASE_SERVICE_ROLE_KEY belum diatur.'
    );
  }

  try {
    const parsedUrl = new URL(url);

    if (
      parsedUrl.protocol !== 'https:' ||
      !parsedUrl.hostname.endsWith('.supabase.co')
    ) {
      throw new Error(
        'SUPABASE_URL harus berupa URL project Supabase yang benar.'
      );
    }

    return createClient(url, key, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  } catch (error) {
    throw new Error(
      `Konfigurasi URL Supabase bermasalah: ${
        error instanceof Error ? error.message : 'URL tidak valid'
      }`
    );
  }
}
