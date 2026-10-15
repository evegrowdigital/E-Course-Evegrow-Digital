import { KATEGORI } from './kategori.js';

// Membaca data/<kategori>/data.js (gabungan) dan data/<kategori>/M3/data.js (terpisah)
const ctx = require.context('../data', true, /^\.\/[^/]+\/(M\d+\/)?data\.js$/);

function urut(a, b) {
  return parseInt(a.id.slice(1), 10) - parseInt(b.id.slice(1), 10);
}

export function getAllMateri(slug) {
  const daftar = slug ? KATEGORI.filter((k) => k.slug === slug) : KATEGORI;
  const hasil = [];

  daftar.forEach((kat) => {
    const map = new Map();
    const keys = ctx.keys().filter((key) => key.split('/')[1] === kat.folder);

    // 1. File gabungan: ./folder/data.js
    keys
      .filter((key) => key.split('/').length === 3)
      .forEach((key) => {
        const mod = ctx(key);
        const gabungan = mod.default ?? mod;
        Object.entries(gabungan).forEach(([id, isi]) => {
          map.set(id, { id, kategori: kat.slug, folder: kat.folder, ...isi });
        });
      });

    // 2. File terpisah: ./folder/M3/data.js (menimpa file gabungan kalau ID sama)
    keys
      .filter((key) => key.split('/').length === 4)
      .forEach((key) => {
        const id = key.split('/')[2];
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
