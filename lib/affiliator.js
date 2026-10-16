import data from '@/data/affiliator.js';

export const NOMOR_WA_ADMIN = '6285750232420';

export function getAffiliator(email) {
  if (!email) return null;
  const kunci = String(email).trim().toLowerCase();

  for (const [e, isi] of Object.entries(data)) {
    if (e.trim().toLowerCase() === kunci) return isi;
  }
  return null;
}

export function rupiah(angka) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(Number(angka) || 0);
}
