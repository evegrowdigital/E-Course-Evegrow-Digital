// Otomatis membaca semua folder data/materi/M1, M2, M3, ... (file data.js di dalamnya).
const ctx = require.context('../data/materi', true, /^\.\/M\d+\/data\.js$/);

export function getAllMateri() {
  const map = new Map();
  ctx.keys().forEach((key) => {
    const id = key.split('/')[1];
    if (map.has(id)) return;
    const mod = ctx(key);
    map.set(id, { id, ...(mod.default ?? mod) });
  });

  return Array.from(map.values()).sort(
    (a, b) => parseInt(a.id.slice(1), 10) - parseInt(b.id.slice(1), 10)
  );
}

export function getMateri(id) {
  return getAllMateri().find((m) => m.id.toLowerCase() === String(id).toLowerCase());
}
