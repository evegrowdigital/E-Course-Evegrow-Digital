export const KATEGORI = [
  { slug: 'produk-digital', label: 'Produk Digital', folder: 'produkdigital' },
  { slug: 'animasi-ai', label: 'Animasi AI', folder: 'animasiai' },
  { slug: 'affiliate-ai', label: 'Affiliate AI', folder: 'affiliate' },
];

export const SOSMED = [
  { nama: 'TikTok', href: 'https://www.tiktok.com/@alynna.mia' },
  { nama: 'TikTok', href: 'https://www.tiktok.com/@evegrowdigital' },
  { nama: 'Instagram', href: 'https://www.instagram.com/evergrow.digital' },
  { nama: 'Threads', href: 'https://www.threads.net/@evegrow.digital' },
];

export function getKategori(slug) {
  return KATEGORI.find((k) => k.slug === slug);
}
