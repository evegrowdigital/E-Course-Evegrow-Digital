
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

const dataDirectory = path.join(process.cwd(), 'data');

function nomor(id) {
  return parseInt(String(id).replace(/\D/g, ''), 10) || 0;
}

function getFolderPath(folder) {
  return path.join(dataDirectory, folder);
}

export async function getItems(folder) {
  const folderPath = getFolderPath(folder);

  if (!fs.existsSync(folderPath)) {
    console.error(`[konten] Folder tidak ditemukan: ${folderPath}`);
    return [];
  }

  const files = fs
    .readdirSync(folderPath)
    .filter((file) => file.toLowerCase().endsWith('.js'));

  const items = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(folderPath, file);
      const moduleUrl = pathToFileURL(filePath).href;
      const module = await import(moduleUrl);

      const content = module.default;
      const id = file.replace(/\.js$/i, '');

      return {
        ...content,
        id,
      };
    })
  );

  return items.sort((a, b) => nomor(a.id) - nomor(b.id));
}

export async function getItem(folder, id) {
  const items = await getItems(folder);

  return items.find(
    (item) => item.id.toLowerCase() === String(id).toLowerCase()
  );
}
