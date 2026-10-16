import { Redis } from '@upstash/redis';
import data from '@/data/affiliator.js';

export const NOMOR_WA_ADMIN = '6285750232420';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN,
});

export async function getAffiliator(email) {
  if (!email) return null;
  const kunci = String(email).trim().toLowerCase();

  let isi = null;
  for (const [e, v] of Object.entries(data)) {
    if (e.trim().toLowerCase() === kunci) {
      isi = v;
      break;
    }
  }
  if (!isi) return null;

  let angka = {};
  try {
    angka = (await redis.hgetall(`affiliator:${kunci}`)) || {};
  } catch (err) {
    console.error('Gagal membaca database:', err);
  }

  return {
    ...isi,
    penjualan: Number(angka.penjualan || 0),
    komisi: Number(angka.komisi || 0),
    update: angka.update ? formatTanggal(angka.update) : '-',
  };
}

export function formatTanggal(iso) {
  const d = new Date(iso);
  if (isNaN(d)) return '-';
  return d.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Pontianak',
  });
}

export function rupiah(angka) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(Number(angka) || 0);
}
