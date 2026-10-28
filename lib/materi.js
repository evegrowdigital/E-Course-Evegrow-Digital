import { KATEGORI } from './kategori.js';

// Membaca data/<kategori>/data.js (gabungan) dan data/<kategori>/M30/data.js (terpisah)
const ctx = require.context('../data', true, /^\.\/[^/]+\/(M\d+\/)?data\.js$/);

function urut(a, b) {
  return parseInt(a.id.slice(1), 10) - parseInt(b.id.slice(1), 10);
}

// Ambil isi satu materi dari file terpisah, apa pun bentuk export-nya:
// - export default [ { ... } ]   (array, diambil elemen pertama)
// - export default { ... }
// - export const data = { ... }  (satu named export objek dibuka otomatis)
function ambilIsi(mod) {
  let isi = mod.default ?? mod;

  if (Array.isArray(isi)) return isi[0] ?? {};

  // eslint-disable-next-line no-unused-vars
  const { default: _d, __esModule, ...named } = mod;
  if (!mod.default) {
    const keys = Object.keys(named);
    if (keys.length === 1) {
      const nilai = named[keys[0]];
      if (Array.isArray(nilai)) return nilai[0] ?? {};
      if (nilai && typeof nilai === 'object') return nilai;
    }
    return named;
  }

  return isi;
}

export function getAllMateri(slug) {
  const daftar = slug ? KATEGORI.filter((k) => k.slug === slug) : KATEGORI;
  const hasil = [];

  daftar.forEach((kat) => {
    const map = new Map();
    const keys = ctx.keys().filter((key) => key.split('/')[1] === kat.folder);

    // 1. File gabungan: ./folder/data.js (daftar [...] atau objek { M1: {...} })
    keys
      .filter((key) => key.split('/').length === 3)
      .forEach((key) => {
        const mod = ctx(key);
        const gabungan = mod.default ?? mod;
        const entri = Array.isArray(gabungan)
          ? gabungan.map((isi, i) => [`M${i + 1}`, isi])
          : Object.entries(gabungan);

        entri.forEach(([id, isi]) => {
          map.set(id, { id, kategori: kat.slug, folder: kat.folder, ...isi });
        });
      });

    // 2. File terpisah: ./folder/M10/data.js
    //    Digabung dengan data gabungan (kalau ID sama), field di file terpisah diutamakan
    keys
      .filter((key) => key.split('/').length === 4)
      .forEach((key) => {
        const id = key.split('/')[2];
        const isi = ambilIsi(ctx(key));
        map.set(id, {
          ...(map.get(id) ?? {}),
          id,
          kategori: kat.slug,
          folder: kat.folder,
          ...isi,
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
