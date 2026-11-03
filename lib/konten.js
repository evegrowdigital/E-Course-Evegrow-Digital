// Membaca otomatis semua file data/<nama folder menu>/<kode><nomor>.js
// Contoh: data/materi/M1.js, data/tutorial mode video/tmv1.js
const ctx = require.context('../data', true, /^\.\/[^/]+\/[A-Za-z]+\d+\.js$/);

function nomor(id) {
  return parseInt(id.replace(/\D/g, ''), 10);
}

export function getItems(folder) {
  const items = [];
  ctx.keys().forEach((key) => {
    const parts = key.split('/'); // ['.', 'nama folder', 'tmv1.js']
    if (parts.length !== 3 || parts[1] !== folder) return;
    const id = parts[2].replace(/\.js$/, '');
    if (items.some((i) => i.id === id)) return;
    const mod = ctx(key);
    items.push({ id, ...(mod.default ?? mod) });
  });
  return items.sort((a, b) => nomor(a.id) - nomor(b.id));
}

export function getItem(folder, id) {
  return getItems(folder).find((i) => i.id.toLowerCase() === String(id).toLowerCase());
}
