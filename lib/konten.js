// Membaca otomatis: data/<folder menu>/<kode item>/data.js
// Contoh: data/tutorial mode video/tmv1/data.js
// (Format file langsung seperti data/materi/M1.js juga tetap terbaca)
const ctx = require.context(
  '../data',
  true,
  /^\.\/[^/]+\/(?:[^/]+\/data|[A-Za-z]+\d+)\.js$/
);

function nomor(id) {
  const n = parseInt(String(id).replace(/\D/g, ''), 10);
  return Number.isNaN(n) ? 0 : n;
}

export function getItems(folder) {
  const items = [];
  ctx.keys().forEach((key) => {
    const parts = key.split('/'); // ['.', 'tutorial mode video', 'tmv1', 'data.js']
    if (parts[1] !== folder) return;

    let id;
    if (parts.length === 4 && parts[3] === 'data.js') id = parts[2];
    else if (parts.length === 3) id = parts[2].replace(/\.js$/, '');
    else return;

    if (items.some((i) => i.id === id)) return;
    const mod = ctx(key);
    items.push({ id, ...(mod.default ?? mod) });
  });

  return items.sort((a, b) => nomor(a.id) - nomor(b.id) || a.id.localeCompare(b.id));
}

export function getItem(folder, id) {
  return getItems(folder).find((i) => i.id.toLowerCase() === String(id).toLowerCase());
}
