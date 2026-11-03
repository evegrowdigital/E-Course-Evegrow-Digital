// Logo + nama brand. Ganti '/logo.png' jika nama file logomu berbeda.
const LOGO = '/logo.png';

export default function Brand({ size = 'md' }) {
  return (
    <span className={`brand ${size === 'lg' ? 'brand-lg' : ''}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={LOGO} alt="Evegrow.Digital" className="brand-logo" />
      <span className="brand-text">
        <span className="brand-name">EVEGROW</span>
        <span className="brand-sub">DIGITAL</span>
      </span>
    </span>
  );
}
