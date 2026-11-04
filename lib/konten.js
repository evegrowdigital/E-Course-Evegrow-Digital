// Membaca otomatis: data/<nama folder menu>/<kode item>/data.js
// Contoh: data/tutorial mode video/tmv1/data.js
const ctx = require.context('../data', true, /^\.\/[^/]+\/[^/]+\/data\.js$/);

function nomor(id) {
  const n = parseInt(String(id).replace(/\D/g, ''), 10);
  return Number.isNaN(n) ? 0 : n;
}

export function getItems(folder) {
  const items = [];
  ctx.keys().forEach((key) => {
    const parts = key.split('/'); // ['.', 'tutorial mode video', 'tmv1', 'data.js']
    if (parts[1] !== folder) return;
    const id = parts[2];
    if (items.some((i) => i.id === id)) return;
    const mod = ctx(key);
    items.push({ id, ...(mod.default ?? mod) });
  });
  return items.sort((a, b) => nomor(a.id) - nomor(b.id));
}

export function getItem(folder, id) {
  return getItems(folder).find((i) => i.id.toLowerCase() === String(id).toLowerCase());
}
