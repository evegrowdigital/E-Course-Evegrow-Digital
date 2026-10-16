import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN,
});

export async function catatAffiliate(order) {
  const email = String(order?.affiliate_email || '').trim().toLowerCase();
  const refId = order?.refId;

  if (!email) return { dicatat: false, alasan: 'order tanpa affiliate' };
  if (!refId) return { dicatat: false, alasan: 'refId kosong' };

  const penjualan = Number(order?.totals?.totalPrice || 0);
  const komisi = Math.abs(Number(order?.totals?.affiliate || 0));

  // cegah order yang sama dihitung dua kali
  const baru = await redis.set(`order:${refId}`, 1, { nx: true });
  if (!baru) return { dicatat: false, alasan: 'duplikat' };

  try {
    const kunci = `affiliator:${email}`;
    await redis.hincrby(kunci, 'penjualan', penjualan);
    await redis.hincrby(kunci, 'komisi', komisi);
    await redis.hset(kunci, { update: new Date().toISOString() });
  } catch (err) {
    await redis.del(`order:${refId}`); // supaya bisa dicoba ulang
    throw err;
  }

  return { dicatat: true, email, penjualan, komisi };
}
