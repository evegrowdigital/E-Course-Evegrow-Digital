import fs from 'fs';
import path from 'path';

const dataDirectory = path.join(process.cwd(), 'data');

function nomor(id) {
  return parseInt(id.replace(/\D/g, ''), 10) || 0;
}

function getFolderPath(folder) {
  return path.join(dataDirectory, folder);
}

export function getItems(folder) {
  const folderPath = getFolderPath(folder);

  if (!fs.existsSync(folderPath)) {
    return [];
  }

  const files = fs
    .readdirSync(folderPath)
    .filter((file) => /^[A-Za-z]+\d+\.json$/i.test(file));

  const items = files.map((file) => {
    const filePath = path.join(folderPath, file);
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const id = file.replace(/\.json$/i, '');

    return {
      id,
      ...content,
    };
  });

  return items.sort((a, b) => nomor(a.id) - nomor(b.id));
}

export function getItem(folder, id) {
  return getItems(folder).find(
    (item) => item.id.toLowerCase() === String(id).toLowerCase()
  );
}
