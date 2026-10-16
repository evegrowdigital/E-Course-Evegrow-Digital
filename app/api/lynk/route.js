import crypto from 'crypto';

export const runtime = 'nodejs';

// Cara verifikasi Lynk.id (sudah terbukti cocok):
// sha256( grandTotal + refId + message_id + MerchantKey )
function tandaTanganValid(data, tandaTangan, kunci) {
  if (!kunci || !tandaTangan || !data) return false;

  const order = data?.data?.message_data || {};
  const dasar = `${order?.totals?.grandTotal ?? ''}${order?.refId ?? ''}${
    data?.data?.message_id ?? ''
  }${kunci}`;

  const hasil = crypto.createHash('sha256').update(dasar).digest('hex');
  const a = Buffer.from(hasil);
  const b = Buffer.from(String(tandaTangan));
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export async function POST(req) {
  const mentah = await req.text();

  let data = null;
  try {
    data = JSON.parse(mentah);
  } catch {
    data = null;
  }

  // Kiriman uji dari tombol Test URL tidak memuat tanda tangan dan tidak diproses
  if (data?.event === 'test_event') {
    return Response.json({ ok: true });
  }

  const valid = tandaTanganValid(
    data,
    req.headers.get('x-lynk-signature'),
    process.env.LYNK_MERCHANT_KEY
  );

  if (!valid) {
    console.log('LYNK DITOLAK: tanda tangan tidak valid');
    return Response.json({ ok: false }, { status: 401 });
  }

  const order = data?.data?.message_data;
  if (order) {
    // Data pembeli sengaja tidak dicatat
    const { customer, shippingAddress, shippingInfo, ...aman } = order;

    console.log(
      'LYNK ORDER LENGKAP',
      JSON.stringify({
        event: data.event,
        kunciData: Object.keys(data.data || {}),
        kunciOrder: Object.keys(order),
        order: aman,
      })
    );
  }

  return Response.json({ ok: true });
}

export function GET() {
  return Response.json({ ok: true, pesan: 'Endpoint webhook Lynk aktif' });
}
