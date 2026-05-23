import { GLASS_CARD, CUSTOM_COLOR_MODES, AUTO_COLOR_MODES, ICONS } from '../constants/modes';

export function AnimSection({ currentMode, onMode }) {
  const pillStyle = (key) => {
    const active = currentMode === key;
    return {
      background: active
        ? 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.1))'
        : 'rgba(255,255,255,0.02)',
      border: `1px solid ${active ? 'rgba(99,102,241,0.35)' : 'rgba(255,255,255,0.05)'}`,
      borderRadius: 16, padding: '14px 6px', cursor: 'pointer',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
      boxShadow: active ? '0 4px 20px rgba(99,102,241,0.15)' : 'none',
      transition: 'all 0.2s',
    };
  };
  const nameStyle = (key) => ({
    fontSize: 9, letterSpacing: 0.8, fontWeight: 700,
    color: currentMode === key ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.25)',
    textTransform: 'uppercase',
    transition: 'color 0.2s',
  });

  return (
    <>
      <div style={GLASS_CARD}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span style={{
            fontSize: 11, fontWeight: 700, letterSpacing: 1,
            color: '#818cf8', textTransform: 'uppercase',
          }}>Warna Kustom</span>
          <div style={{
            flex: 1, height: 1,
            background: 'linear-gradient(90deg, rgba(129,140,248,0.2), transparent)',
          }} />
        </div>
        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', marginBottom: 4 }}>
          Bisa diatur warnanya
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginTop: 16 }}>
          {Object.keys(CUSTOM_COLOR_MODES).map(key => (
            <button key={key} className="sled-btn" onClick={() => onMode(key)} style={pillStyle(key)}>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: currentMode === key ? '#a5b4fc' : 'rgba(255,255,255,0.2)', transition: 'color 0.2s' }}>{ICONS[key](currentMode === key ? '#a5b4fc' : 'rgba(255,255,255,0.2)')}</span>
              <span style={nameStyle(key)}>{CUSTOM_COLOR_MODES[key].label}</span>
            </button>
          ))}
        </div>
      </div>
      <div style={GLASS_CARD}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span style={{
            fontSize: 11, fontWeight: 700, letterSpacing: 1,
            color: '#f472b6', textTransform: 'uppercase',
          }}>Tema Otomatis</span>
          <div style={{
            flex: 1, height: 1,
            background: 'linear-gradient(90deg, rgba(244,114,182,0.2), transparent)',
          }} />
        </div>
        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', marginBottom: 4 }}>
          Warna berubah otomatis
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginTop: 16 }}>
          {Object.keys(AUTO_COLOR_MODES).map(key => (
            <button key={key} className="sled-btn" onClick={() => onMode(key)} style={pillStyle(key)}>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: currentMode === key ? 1 : 0.4, transition: 'opacity 0.2s' }}>{ICONS[key]()}</span>
              <span style={nameStyle(key)}>{AUTO_COLOR_MODES[key].label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
