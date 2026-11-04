// Membaca otomatis: data/<nama folder menu>/<folder item>/data.js
// - Isi data.js boleh satu item { ... } atau daftar [ {...}, {...} ]
// - Nama folder tidak peduli spasi / tanda hubung / huruf besar-kecil
const ctx = require.context('../data', true, /^\.\/[^/]+\/[^/]+\/data\.js$/);

function norm(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function nomor(id) {
  const n = parseInt(String(id).replace(/\D/g, ''), 10);
  return Number.isNaN(n) ? 0 : n;
}

export function getItems(folder) {
  const target = norm(folder);
  const items = [];
  const sudah = new Set();

  ctx.keys().forEach((key) => {
    const parts = key.split('/'); // ['.', 'tutorial mode video', 'tmv1', 'data.js']
    if (norm(parts[1]) !== target) return;

    const dasar = parts[2];
    if (sudah.has(dasar)) return;
    sudah.add(dasar);

    const mod = ctx(key);
    const data = mod.default ?? mod;

    if (Array.isArray(data)) {
      data.forEach((d, i) => {
        if (!d || typeof d !== 'object') return;
        items.push({ ...d, id: d.id || `${dasar}-${i + 1}`, _urut: [nomor(dasar), i] });
      });
    } else if (data && typeof data === 'object') {
      items.push({ ...data, id: data.id || dasar, _urut: [nomor(dasar), 0] });
    }
  });

  return items.sort((a, b) => a._urut[0] - b._urut[0] || a._urut[1] - b._urut[1]);
}

export function getItem(folder, id) {
  return getItems(folder).find((i) => String(i.id).toLowerCase() === String(id).toLowerCase());
}
