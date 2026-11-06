// data/tutorialmodevideo/tmv11/data.js

const data= [
  {
    judul: 'Membuat MPI Canva + AI',
    cover: 'https://cdn.lynkid.my.id/draft-products/06-11-2026/1793925672983_4990647.png?width=630&amp;quality=90&amp;format=webp',
    video: 'l',
    videos: [
      { judul: 'Membuat Prompt MPI', url: 'https://youtu.be/uvgO8qLSh3E' },
      { judul: 'Generate Gambar MPI', url: 'https://youtu.be/IHfI9HedxmE' },
      { judul: 'Membuat Materi Video', url: 'https://youtu.be/RMaloFZLdRw' },
      { judul: 'Tutorial MPI di Canva', url: 'https://youtu.be/vKcX0CtnbiI' },
      { judul: 'Cara menautkan Link/Halaman', url: 'https://youtu.be/Ut6coT3P6Cs' },
    ],
    tools: 'https://kumpulantools.vercel.app/',
    prompt: '',
    prompts: [
      {
        judul: 'Prompt Animasi Teks',
        isi: `Animasikan teks dengan gerakan melompat dan
memantul secara bergantian. Setiap huruf atau kata
bergerak secara berurutan dengan efek elastis yang
halus, sedikit squash and stretch, serta easing yang
natural.
Setelah bergerak, semua huruf harus kembali dengan
tepat ke posisi awalnya. Pertahankan teks asli, ejaan,
font, warna, ukuran, jarak, posisi, dan tata letak tanpa
perubahan.
Tambahkan gerakan halus pada elemen dekoratif
seperti bergoyang, memantul kecil, atau efek kilauan.
Kamera tetap stabil, tanpa zoom atau perubahan
adegan.
Tidak ada perubahan teks, huruf hilang, huruf
tambahan, kesalahan ejaan, distorsi, morphing, atau
perubahan bentuk. Akhiri animasi dengan semua
elemen kembali sempurna ke posisi awal.`,
        },
        {
        judul: 'Prompt Karakter Jalan Di tempat tanpa pindah Posisi',
        isi: `Animasikan karakter dengan gerakan berjalan di tempat secara ceria dan natural. Tambahkan gerakan kaki kanan dan kiri secara bergantian seperti sedang berjalan, ayunan tangan mengikuti langkah kaki, serta gerakan tubuh yang sedikit naik dan turun mengikuti ritme langkah. Tambahkan gerakan kepala dan ekspresi yang tetap ceria. Daun sedikit bergoyang secara lembut mengikuti gerakan karakter.

Karakter hanya boleh melakukan gerakan berjalan di tempat tanpa berpindah posisi, maju, mundur, atau bergeser ke samping. Posisi karakter harus tetap berada di titik yang sama sepanjang animasi.

Pertahankan desain, bentuk, warna, wajah, proporsi, ekspresi, dan seluruh detail karakter seperti gambar asli.

Kamera tetap diam (static camera), tanpa zoom, rotasi, atau perubahan sudut pandang.

Tidak ada perubahan latar belakang, pencahayaan, maupun penambahan elemen baru.

Setelah melakukan gerakan berjalan di tempat, karakter harus kembali tepat ke posisi, ukuran, dan pose awal secara sempurna untuk menciptakan seamless looping animation tanpa jeda atau gerakan patah saat animasi berulang.
        `,
        },
    ],
    panduan: [
      { judul: '', url: '' },
    ],
    materi: ``,
  },
];

export default data;
