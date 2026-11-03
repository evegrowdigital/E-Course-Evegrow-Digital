// Logo + nama brand
const LOGO = '/logo.png';

export default function Brand({ size = 'md' }) {
  return (
    <div className={`brand ${size === 'lg' ? 'brand-lg' : ''}`}>
      <img
        src={LOGO}
        alt="Evegrow Digital"
        className="brand-logo"
      />

      <span className="brand-text">
        <span className="brand-name">
          EVEGROW
        </span>

        <span className="brand-sub">
          DIGITAL
        </span>
      </span>
    </div>
  );
          }
