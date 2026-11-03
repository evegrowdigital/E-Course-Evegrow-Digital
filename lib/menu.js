import menu from '@/data/menu';
import { getItems } from './konten';

// Menu dengan folder otomatis aktif jika sudah ada minimal 1 file di foldernya.
export function getMenuItems() {
  return menu.map((item) => ({
    label: item.label,
    icon: item.icon,
    colors: item.colors,
    href: item.folder
      ? getItems(item.folder).length > 0
        ? `/${item.slug}`
        : ''
      : item.href || '',
  }));
}
