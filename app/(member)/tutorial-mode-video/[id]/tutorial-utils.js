import { getYouTubeId } from '@/lib/youtube.js';

// Mengambil semua video.
export function daftarVideo(item) {
  const hasil = [];

  const tambah = (judul, url) => {
    const id = getYouTubeId(url);

    if (id) {
      hasil.push({
        judul: judul || '',
        id,
      });
    }
  };

  if (item.video) {
    tambah('', item.video);
  }

  if (Array.isArray(item.videos)) {
    item.videos.forEach((v) => {
      if (typeof v === 'string') {
        tambah('', v);
      } else if (v) {
        tambah(v.judul, v.url || v.video);
      }
    });
  }

  return hasil;
}

// Mengambil URL dan tools.
export function daftarLink(item) {
  const hasil = [];

  const tambah = (judul, url) => {
    if (url && typeof url === 'string') {
      hasil.push({
        judul: judul || 'Akses Tools',
        url,
      });
    }
  };

  if (item.url || item.link || item.href) {
    tambah(
      item.tombol || item.judul,
      item.url || item.link || item.href
    );
  }

  if (Array.isArray(item.tools)) {
    item.tools.forEach((tool) => {
      if (typeof tool === 'string') {
        tambah('Akses Tools', tool);
      } else if (tool) {
        tambah(
          tool.judul || tool.nama || 'Akses Tools',
          tool.url || tool.link || tool.href
        );
      }
    });
  }

  if (Array.isArray(item.links)) {
    item.links.forEach((link) => {
      if (typeof link === 'string') {
        tambah('Akses Materi', link);
      } else if (link) {
        tambah(
          link.judul || link.nama || 'Akses Materi',
          link.url || link.link || link.href
        );
      }
    });
  }

  return hasil;
}

// Mengambil isi panduan.
export function daftarPanduan(item) {
  return (
    item.panduan ||
    item.isi ||
    item.materi ||
    item.konten ||
    item.deskripsiPanduan ||
    ''
  );
}

// Mengambil prompt dari berbagai format data.
export function daftarPrompt(item) {
  const hasil = [];

  const tambah = (judul, isi) => {
    if (typeof isi === 'string' && isi.trim()) {
      hasil.push({
        judul: judul || `Prompt ${hasil.length + 1}`,
        isi,
      });
    }
  };

  // Format:
  // prompts: ['Isi prompt 1', 'Isi prompt 2']
  if (Array.isArray(item.prompts)) {
    item.prompts.forEach((prompt, index) => {
      if (typeof prompt === 'string') {
        tambah(`Prompt ${index + 1}`, prompt);
      } else if (prompt) {
        tambah(
          prompt.judul || prompt.nama || `Prompt ${index + 1}`,
          prompt.isi || prompt.teks || prompt.prompt || prompt.konten
        );
      }
    });
  }

  // Format:
  // prompt: 'Isi prompt'
  if (typeof item.prompt === 'string') {
    tambah('Prompt', item.prompt);
  }

  // Format:
  // prompt1: 'Isi prompt 1'
  // prompt2: 'Isi prompt 2'
  Object.entries(item).forEach(([key, value]) => {
    if (/^prompt\d*$/i.test(key) && typeof value === 'string') {
      tambah(
        key.replace(/prompt/i, 'Prompt ').trim(),
        value
      );
    }
  });

  // Format:
  // prompt: { judul: 'Prompt 1', isi: '...' }
  if (
    item.prompt &&
    typeof item.prompt === 'object' &&
    !Array.isArray(item.prompt)
  ) {
    tambah(
      item.prompt.judul || 'Prompt',
      item.prompt.isi ||
        item.prompt.teks ||
        item.prompt.konten ||
        item.prompt.prompt
    );
  }

  return hasil;
}
