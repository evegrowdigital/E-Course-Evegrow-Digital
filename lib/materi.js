import { KATEGORI } from './kategori.js';

const ctx = require.context('../data', true, /^\.\/[^/]+\/M\d+\/data\.js$/);

function urut(a, b) {
  return parseInt(a.id.slice(1), 10) - parseInt(b.id.slice(1), 10);
}

export function getAllMateri(slug) {
  const daftar = slug ? KATEGORI.filter((k) => k.slug === slug) : KATEGORI;
  const hasil = [];

  daftar.forEach((kat) => {
    const map = new Map();
    ctx.keys().forEach((key) => {
      const [, folder, id] = key.split('/');
      if (folder !== kat.folder || map.has(id)) return;
      const mod = ctx(key);
      map.set(id, {
        id,
        kategori: kat.slug,
        folder: kat.folder,
        ...(mod.default ?? mod),
      });
    });
    hasil.push(...Array.from(map.values()).sort(urut));
  });

  return hasil;
}

export function getMateri(slug, id) {
  return getAllMateri(slug).find(
    (m) => m.id.toLowerCase() === String(id).toLowerCase()
  );
}

export function hitungMateri() {
  const hasil = {};
  KATEGORI.forEach((k) => {
    hasil[k.slug] = getAllMateri(k.slug).length;
  });
  return hasil;
}
