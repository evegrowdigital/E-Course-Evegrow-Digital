// data/kumpulan prompt/kp11/data.js

const data= [
  {
    judul: 'Upgrade Kualitas Gambar jadi Lebih Bagus',
    cover: '',
    video: '',
    videos: [
     {
        judul: '',
        url: '',
     },
      ],
    tools: '',
    prompt: `Gunakan FOTO YANG DIUPLOAD sebagai SATU-SATUNYA referensi visual.
Anggap foto ini SUDAH FINAL secara visual.

Perhatikan bahwa pada foto ini MUNGKIN terdapat watermark atau logo
yang berasal dari proses generasi sebelumnya.

Watermark tersebut BUKAN bagian dari objek, tekstur, atau desain foto.
Anggap watermark sebagai elemen NON-VISUAL dan ABAIKAN sepenuhnya.

❗ Jangan:
- menyalin watermark
- menebalkan watermark
- memperjelas watermark
- menduplikasi watermark
- menjadikan watermark sebagai tekstur

TUGAS KAMU BUKAN membuat ulang gambar,
tetapi meningkatkan kualitas teknisnya saja.

JANGAN ubah:
- wajah / identitas orang
- ekspresi
- pose
- proporsi tubuh
- angle kamera
- framing / komposisi
- lighting direction
- environment / background
- desain outfit

Fokus HANYA pada peningkatan kualitas gambar.

Technical enhancement only:
- upscale resolution from HD to true 4K
- increase pixel density naturally
- add realistic micro details
  (skin texture, fabric fibers, material surface)
- improve sharpness without oversharpening
- cleaner edges, no artificial outlines
- better dynamic range
- remove noise, blur, compression artifacts

Hasil akhir HARUS terlihat seperti:
foto yang SAMA PERSIS,
namun diambil ulang dengan
higher-end camera,
better lens,
higher resolution sensor.

NO beauty retouching  
NO face alteration  
NO stylization  
NO cinematic look  
NO creative reinterpretation  

Ultra realistic  
Photorealistic  
High fidelity detail  
True 4K resolution
`,
    prompts: [
      {
        judul: '',
        isi: '',
        url: '',
      },
    ],
    panduan: [
      {
        judul: '',
        url: '',
      },
    ],
    materi: `
`,
  },
];

export default data;
