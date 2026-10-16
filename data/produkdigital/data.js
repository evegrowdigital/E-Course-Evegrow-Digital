// Cover: isi link gambar (https://...) atau nama file di folder /public (misal '/cover-affiliate-1.jpg').
// Kosongkan ('') kalau tidak ada → otomatis memakai /affiliate-M1.jpg dari folder /public.

const data = [
  {
    judul: '1. Pondasi Bisnis Digital',
    cover: 'https://cdn.lynkid.my.id/draft-products/16-10-2026/1792107346641_1842633.png?width=630&amp;quality=90&amp;format=webp',
    video: 'https://youtu.be/idp22MnAq_k?si=YH86tGUgVF_b1wgN',
    tools: '',
    prompt: '',
    materi: `
**Produk digital adalah solusi yang dikemas dalam bentuk digital.**
Ini adalah salah satu mindset terpenting.
Kesalahan pemula:
"Aku mau bikin ebook. Isinya apa ya?"
Seharusnya bukan begitu.
Mulai dari:
**SIAPA → MASALAH APA → SOLUSI APA → PRODUK APA**

Semakin jelas siapa yang dibantu, semakin mudah menentukan isi produk. Produk harus bisa menyelesaikan masalah.
Cara mencari Ide Produk :
1. Dari skill, Tanyakan: "Apa yang aku bisa lakukan?"
2. Dari pengalaman, Tanyakan: "Apa yang sudah pernah aku pelajari?"
3. Dari masalah sendiri, Tanyakan: "Masalah apa yang pernah berhasil aku selesaikan?"
4. Dari pertanyaan audience, Perhatikan pertanyaan yang sering muncul di: TikTok, Instagram, Facebook, Threads, YouTube dan Komunitas.
5. Dari komentar, Komentar sering berisi masalah nyata.
6. Dari kompetitor, Bukan untuk meniru. Tetapi untuk melihat:
• Produk apa yang sudah ada?
• Siapa targetnya?
• Apa yang mereka tawarkan?
• Apa yang masih kurang?
• Bagaimana kamu bisa membuat versi yang lebih spesifik?
7. Dari tren, Perhatikan teknologi dan tren baru.
Contoh: AI berkembang sangat cepat.
Muncul kebutuhan baru seperti:
AI Content, AI Automation, AI Workflow, AI Marketing,AI Productivity
8. Dari kebutuhan pekerjaan, Perhatikan pekerjaan yang berulang.
Contoh: Membuat caption, Membuat laporan, Membuat desain, Membuat konten, Membuat proposal
Pekerjaan berulang bisa dikemas menjadi:
Template + SOP + Prompt + Tutorial.

**Ingatlah:Orang tidak membeli produk digital. Mereka membeli solusi, hasil, dan transformasi.**

Action Plan:
1. Tentukan satu target audiens yang paling spesifik.
2. Tuliskan tiga masalah terbesar yang mereka hadapi.
3. Jelaskan transformasi yang ingin mereka capai.
4. Evaluasi apakah produk yang kamu miliki benar-benar menjawab kebutuhan tersebut.
5. Catat tiga hal yang bisa ditingkatkan agar produk memiliki nilai lebih dibandingkan kompetitor.
`,
  },

  {
    judul: 'Siapkan Toko Digital',
    cover: 'https://cdn.lynkid.my.id/draft-products/16-10-2026/1792115219879_7771262.png?width=630&amp;quality=90&amp;format=webp',
    video: '',
    videos: [
      { judul: 'Tutorial daftar lynk.id', url: 'https://youtu.be/AOzI6AbmBAo?si=Zj7N4OrUN9rJNTcX' },
      { judul: 'Tutorial merapikan toko', url: 'https://youtu.be/EovHV1vSums?si=CItJiheRVxC42VP0' },
      { judul: 'Tutorial Upload Produk', url: 'https://youtu.be/XUvARSK2gOc?si=dyBFUxGoSDQMg4g3' },
      { judul: 'Tutorial Affiliate Produk', url: 'https://youtu.be/bO8Ttx5D_gs?si=msyvyHW0XvpdLPDM' },
    ],
    tools: '',
    prompt: '',
    panduan: [
      { judul: 'Panduan Landing Page Interaktif', url: 'https://drive.google.com/file/d/1EEVuoP9Mlx7tMIZa28_hA5kZN46xxWEk/view' },
      { judul: 'Template Design Landing Page', url: 'https://canva.link/hkiwjrz2vl7k1fy' },
    ],
    materi: ``,
  },

  {
    judul: 'Aset Media Belajar',
    cover: '',
    video: '',
    videos: [
    ],
    tools: '',
    prompt: '',
    prompts: [
      {
        judul: 'Prompt Membuat Cover Produk',
        isi: `
Buat Gambar sebuah cover Produk Digital rasio 1:1 tentang “[Nama Produk]”. Gunakan informasi utama berikut [ISI PRODUK]. Tujuan infografis: PROMOSI DAN INFORMASI. Gunakan visual yang relevan dengan topik, sederhana, informatif, dan mudah dipahami. Susun informasi dengan hirarki visual yang jelas: judul utama, informasi pendukung, visual utama, poin-poin penting, dan penutup. Gunakan layout yang rapi, proporsi seimbang, white space yang cukup, margin aman, safe area, serta typography yang mudah dibaca. Gunakan palet warna yang harmonis dan sesuai dengan topik: [PALET WARNA]. Gunakan elemen visual secukupnya dan hindari dekorasi yang tidak memiliki fungsi informasi. Pastikan semua teks menggunakan bahasa Indonesia yang jelas, singkat, dan sesuai dengan informasi sumber. Jangan menambahkan informasi, angka, klaim, atau teks yang tidak diberikan. Jika menampilkan manusia, tampilkan dengan anatomi natural dan pakaian yang sesuai konteks. Jika menampilkan perempuan Muslim, gunakan hijab dan pakaian yang menutup aurat. Gaya visual: [MODERN MINIMALIS / EDITORIAL / CORPORATE / FRIENDLY / DRAMATIC / DLL] Prioritaskan readability, hierarchy, clarity, dan visual storytelling daripada banyaknya elemen.
Negative prompt:handwritten text sebagai ornamen, teks tidak terbaca, typo, teks acak, informasi tambahan yang tidak diminta, layout berantakan, cluttered, terlalu banyak elemen, visual berlebihan, hierarchy buruk, margin terpotong, cropped text, watermark, logo tidak diminta, signature, blurry, oversharpened, oversaturated, overexposed, plastic skin, bad anatomy, extra fingers, mutated hands, duplicate objects, distorted face, double shadows. Master Negative Prompt masterpiece, 8k resolution, tidak ada teks handwite sebagai ornamen, unreal engine 5, hyper-detailed, trending on artstation, CGI, 3D render, oversharpened, overexposed, oversaturated, airbrushed, plastic skin, flawless skin, perfectly symmetrical face, mannequin, doll, extra fingers, mutated hands, bad anatomy, deformed, cluttered, messy, busy background, chaotic layout, multiple lighting, double shadows, text, watermark, signature, cropped, blurry
`,
      },
    ],
    panduan: [
      { judul: 'Animasi Bibir berbicara', url: 'https://drive.google.com/file/d/1itrwGc_nTbNUHBNFSdAjSalEYA7oECWE/view?usp=drivesdk' },
    ],
    materi: ``,
  },
];

export default data;  
