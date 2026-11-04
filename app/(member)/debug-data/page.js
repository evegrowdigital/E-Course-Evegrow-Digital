const items = await getItems('tutorial mode video');

export const dynamic = 'force-dynamic';

export default function DebugData() {
  return (
    <pre style={{ color: '#fff', fontSize: 13, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
      {ctx.keys().join('\n')}
    </pre>
  );
}
