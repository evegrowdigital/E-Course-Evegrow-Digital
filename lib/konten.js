import fs from 'fs';
import path from 'path';

const dataDirectory = path.join(process.cwd(), 'data');

function nomor(id) {
  return parseInt(String(id).replace(/\D/g, ''), 10) || 0;
}

function getFolderPath(folder) {
  return path.join(dataDirectory, folder);
}

export function getItems(folder) {
  const folderPath = getFolderPath(folder);

  if (!fs.existsSync(folderPath)) {
    console.error(`[konten] Folder tidak ditemukan: ${folderPath}`);
    return [];
  }

  const files = fs
    .readdirSync(folderPath)
    .filter((file) => file.toLowerCase().endsWith('.json'));

  const items = files.map((file) => {
    const filePath = path.join(folderPath, file);
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const id = file.replace(/\.json$/i, '');

    return {
      ...content,
      id,
    };
  });

  return items.sort((a, b) => nomor(a.id) - nomor(b.id));
}

export function getItem(folder, id) {
  return getItems(folder).find(
    (item) => item.id.toLowerCase() === String(id).toLowerCase()
  );
}
