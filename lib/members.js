import data from '@/data/members.json';

// Mendukung 2 format di data/members.json:
// 1) ["a@gmail.com", "b@gmail.com"]
// 2) [{ "email": "a@gmail.com", "nama": "Budi" }, ...]
function baca() {
  const list = Array.isArray(data) ? data : Array.isArray(data?.members) ? data.members : [];
  return list
    .map((m) => (typeof m === 'string' ? { email: m, nama: null } : { email: m?.email, nama: m?.nama || null }))
    .filter((m) => m.email)
    .map((m) => ({ email: String(m.email).trim().toLowerCase(), nama: m.nama }));
}

const MEMBERS = baca();

export function findMember(email) {
  const e = String(email || '').trim().toLowerCase();
  return MEMBERS.find((m) => m.email === e) || null;
}

export function getTotalMember() {
  return new Set(MEMBERS.map((m) => m.email)).size;
}
