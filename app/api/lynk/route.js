import crypto from 'crypto';

export const runtime = 'nodejs';

// Ubah ke true setelah cara verifikasi terbukti cocok.
const WAJIB_TANDA_TANGAN = false;

function sha256(teks) {
  return crypto.createHash('sha256').update(teks).digest('hex');
}

function hmac256(kunci, teks) {
  return crypto.createHmac('sha256', kunci).update(teks).digest('hex');
}

function sama(a, b) {
  const x = Buffer.from(String(a || ''));
  const y = Buffer.from(String(b || ''));
  return x.length === y.length && crypto.timingSafeEqual(x, y);
}

// Hasil: 0 = tidak cocok, 1-4 = nomor metode yang cocok
function cekTandaTangan(mentah, data, tandaTangan, kunci) {
  if (!kunci || !tandaTangan) return 0;

  const isi = data?.data?.message_data || {};
  const grandTotal = isi?.totals?.grandTotal ?? '';
  const refId = isi?.refId ?? '';
  const messageId = data?.data?.message_id ?? '';

  const kandidat = [
    sha256(`${grandTotal}${refId}${messageId}${kunci}`),
    hmac256(kunci, mentah),
    hmac256(kunci, JSON.stringify(data)),
    sha256(`${mentah}${kunci}`),
  ];

  const cocok = kandidat.findIndex((k) => sama(k, tandaTangan));
  return cocok === -1 ? 0 : cocok + 1;
}

export async function POST(req) {
  const mentah = await req.text();
  const tandaTangan = req.headers.get('x-lynk-signature');
  const kunci = process.env.LYNK_MERCHANT_KEY;

  let data = null;
  try {
    data = JSON.parse(mentah);
  } catch {
    data = null;
  }

  const metode = cekTandaTangan(mentah, data, tandaTangan, kunci);

  console.log(
    'LYNK SIGNATURE',
    JSON.stringify({
      adaKunci: Boolean(kunci),
      adaTandaTangan: Boolean(tandaTangan),
      metodeCocok: metode,
    })
  );

  if (WAJIB_TANDA_TANGAN && !metode) {
    return Response.json({ ok: false }, { status: 401 });
  }

  const order = data?.data?.message_data;
  if (data?.event && order) {
    console.log(
      'LYNK ORDER',
      JSON.stringify({
        event: data.event,
        refId: order.refId,
        totals: order.totals,
        items: (order.items || []).map((i) => ({
          title: i.title,
          price: i.price,
          qty: i.qty,
          pafId: i.pafId,
          public_affiliate_content: i.public_affiliate_content,
        })),
      })
    );
  }

  return Response.json({ ok: true });
}

export function GET() {
  return Response.json({ ok: true, pesan: 'Endpoint webhook Lynk aktif' });
        }
