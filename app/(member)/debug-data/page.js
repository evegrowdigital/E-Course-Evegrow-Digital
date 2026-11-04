import { getItems } from '@/lib/konten';

const ctx = require.context('../../../data', true, /\.js$/);

export const dynamic = 'force-dynamic';

export default function DebugData() {
  const items = getItems('tutorial-mode-video');

  return (
    <pre style={{ color: '#fff', fontSize: 13, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
      {'FILE DATA YANG TERBACA:\n'}
      {ctx.keys().join('\n')}
      {'\n\nITEM TUTORIAL MODE VIDEO: ' + items.length + '\n'}
      {items.map((i) => i.id + ' - ' + (i.judul || '')).join('\n')}
    </pre>
  );
}
