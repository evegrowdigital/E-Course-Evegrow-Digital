// Penerima sementara: hanya mencatat kiriman webhook Lynk.id ke Logs Vercel.
export async function POST(req) {
  const body = await req.text();
  const headers = Object.fromEntries(req.headers);

  console.log('LYNK WEBHOOK HEADERS', JSON.stringify(headers));
  console.log('LYNK WEBHOOK BODY', body);

  return Response.json({ ok: true });
}

export function GET() {
  return Response.json({ ok: true, pesan: 'Endpoint webhook Lynk aktif' });
}
