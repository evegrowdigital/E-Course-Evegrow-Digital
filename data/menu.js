// Atur menu beranda di sini.
// href: '/materi' = halaman di website, 'https://...' = link luar (otomatis buka tab baru)
// href: ''        = menu tampil "Segera hadir" (belum bisa diklik)

const menu = [
  { label: 'Materi', href: '/materi', icon: 'book', colors: ['#cf94f2', '#9a4fd6'] },
  { label: 'Tools', href: '', icon: 'wrench', colors: ['#7db3f8', '#3b78e0'] },
  { label: 'Kumpulan Prompt', href: '', icon: 'sparkles', colors: ['#f7a6c8', '#e0568f'] },
  { label: 'Tutorial Mode Video', href: '', icon: 'play', colors: ['#f7ae7c', '#e5703a'] },
  { label: 'Tutorial Mode Gambar', href: '', icon: 'image', colors: ['#7fd9c3', '#35a68b'] },
  { label: 'Kumpulan Template', href: '', icon: 'template', colors: ['#f8d674', '#eba52d'] },
  { label: 'E-course Canva', href: '', icon: 'cap', colors: ['#97a0f8', '#5558d9'] },
  { label: 'Request', href: '', icon: 'send', colors: ['#f79a9a', '#e04f5a'] },
  // Ganti 62XXXXXXXXXX dengan nomor WA kamu (awali 62, tanpa 0 dan tanpa +)
  { label: 'Chat Private 1:1', href: 'https://wa.me/6283852122325', icon: 'whatsapp', colors: ['#6aeb8e', '#1fb850'] },
  { label: 'Dashboard Affiliate', href: '/affiliate', icon: 'users', colors: ['#7F91D9', '#4D5EAC'] },
];

export default menu;
