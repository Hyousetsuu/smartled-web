import { ALL_MODES } from '../constants/modes';

export function TopBar({ mode, color, isAuto }) {
  const isOff = mode === 'off';
  const dotColor = isOff ? '#2a2a2a' : color;
  const label = isOff ? 'OFF' : ALL_MODES[mode]?.label?.toUpperCase() || mode.toUpperCase();

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, padding: '0 4px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: -0.5, color: '#fff' }}>Smart</span>
        <span style={{ fontSize: 18, fontWeight: 300, letterSpacing: -0.5, color: 'rgba(255,255,255,0.25)' }}>LED</span>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: isOff ? '#333' : '#6366f1', display: 'inline-block', marginLeft: 4, animation: isOff ? 'none' : 'pulseGlow 2s ease-in-out infinite' }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {/* Indikator LDR Aktif */}
        {isAuto && !isOff && (
          <span style={{
            fontSize: 10, fontWeight: 600, color: '#22d3ee',
            background: 'rgba(34,211,238,0.1)', border: '1px solid rgba(34,211,238,0.2)',
            padding: '4px 10px', borderRadius: 20, letterSpacing: 0.5,
          }}>LDR ON</span>
        )}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 20, padding: '6px 14px 6px 10px',
        }}>
          <span style={{
            width: 8, height: 8, borderRadius: '50%', background: dotColor,
            boxShadow: isOff ? 'none' : `0 0 10px ${dotColor}`,
            display: 'inline-block', animation: isOff ? 'none' : 'dotBlink 1.8s ease-in-out infinite',
            transition: 'background 0.3s',
          }} />
          <span style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 500,
            color: isOff ? '#333' : 'rgba(255,255,255,0.5)', letterSpacing: 0.5,
          }}>{label}</span>
        </div>
      </div>
    </div>
  );
}
