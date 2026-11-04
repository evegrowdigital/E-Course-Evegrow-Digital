import menu from '@/data/menu';
import { getItems } from './konten';

function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Menurunkan slug & folder otomatis dari label / href di data/menu.js
function normalisasi(item) {
  const href = item.href || '';
  const internal = href.startsWith('/');
  return {
    ...item,
    href,
    slug: internal ? href.slice(1).split('/')[0] : slugify(item.label),
    folder: item.folder || String(item.label).toLowerCase(),
  };
}

// Daftar menu untuk beranda / sidebar.
// href kosong otomatis aktif jika folder datanya sudah ada isinya.
export function getMenuItems() {
  return menu.map((raw) => {
    const m = normalisasi(raw);
    let href = m.href;
    if (!href) href = getItems(m.folder).length > 0 ? `/${m.slug}` : '';
    return { label: m.label, icon: m.icon, colors: m.colors, href };
  });
}

// Mencari menu dari alamat (slug), dipakai halaman daftar & detail
export function findSection(slug) {
  const m = menu
    .map(normalisasi)
    .find((x) => x.slug === slug && !x.href.startsWith('http'));
  if (!m) return null;
  return { label: m.label, slug: m.slug, folder: m.folder, prefix: m.prefix || 'item' };
}
