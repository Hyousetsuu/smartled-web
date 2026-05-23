import { GLASS_CARD } from '../constants/modes';
import { hexToRgba } from '../utils/colors';

export function BrightnessSlider({ value, color, isAuto, ldrValue, ldrStatus, onChange, onToggleAuto }) {
  const pct = Math.round((value / 255) * 100);
  const trackColor = isAuto ? '#334155' : color;

  // Determine room status for inline display
  const batasTerang = 500;
  const batasGelap = 3000;
  const midPoint = (batasTerang + batasGelap) / 2;
  const isDark = (ldrValue ?? 0) >= midPoint;

  return (
    <div style={{
      ...GLASS_CARD,
      borderColor: isAuto ? 'rgba(34,211,238,0.15)' : 'rgba(255,255,255,0.06)',
      transition: 'all 0.3s',
    }}>
      {/* Header & Toggle LDR */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 16 }}>{isAuto ? '🌗' : '☀️'}</span>
          <span style={{
            fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600,
            letterSpacing: 0.5, color: isAuto ? '#22d3ee' : 'rgba(255,255,255,0.4)',
            textTransform: 'uppercase', transition: 'color 0.3s',
          }}>Kecerahan</span>
        </div>
        <button className="sled-btn" onClick={onToggleAuto} style={{
          background: isAuto ? 'linear-gradient(135deg, #06b6d4, #22d3ee)' : 'rgba(255,255,255,0.05)',
          color: isAuto ? '#000' : 'rgba(255,255,255,0.4)',
          border: isAuto ? 'none' : '1px solid rgba(255,255,255,0.08)',
          padding: '7px 14px', borderRadius: 14, fontSize: 10, fontWeight: 700,
          cursor: 'pointer', letterSpacing: 0.5,
          boxShadow: isAuto ? '0 4px 15px rgba(34,211,238,0.3)' : 'none',
        }}>
          {isAuto ? '● LDR AKTIF' : '○ LDR SENSOR'}
        </button>
      </div>

      {/* Auto-brightness source indicator */}
      {isAuto && ldrValue != null && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'rgba(34,211,238,0.06)',
          border: '1px solid rgba(34,211,238,0.1)',
          borderRadius: 12, padding: '8px 12px', marginBottom: 14,
          animation: 'fadeSlideIn 0.25s ease',
        }}>
          <span style={{ fontSize: 12 }}>{isDark ? '🌙' : '☀️'}</span>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 500,
            color: 'rgba(255,255,255,0.4)', flex: 1,
          }}>LDR mengatur kecerahan otomatis</span>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700,
            color: '#22d3ee',
          }}>{ldrValue}</span>
        </div>
      )}

      {/* Slider track */}
      <div style={{
        position: 'relative', height: 8, borderRadius: 4,
        background: 'rgba(255,255,255,0.06)', marginBottom: 8,
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', left: 0, top: 0, height: '100%', borderRadius: 4,
          width: `${pct}%`,
          background: isAuto
            ? 'linear-gradient(90deg, #334155, #475569)'
            : `linear-gradient(90deg, ${hexToRgba(color, 0.7)}, ${color})`,
          boxShadow: isAuto ? 'none' : `0 0 12px ${hexToRgba(color, 0.4)}`,
          transition: 'width 0.05s, background 0.15s',
          pointerEvents: 'none',
        }} />
        <input
          type="range" min="0" max="255" step="1"
          value={value} onChange={onChange}
          disabled={isAuto} // Matikan fungsi geser saat auto aktif
          className={isAuto ? 'slider-disabled' : ''}
          style={{
            position: 'absolute', inset: '-10px 0', width: '100%',
            opacity: 0, cursor: isAuto ? 'not-allowed' : 'pointer', margin: 0,
          }}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, alignItems: 'center' }}>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 500,
          color: 'rgba(255,255,255,0.15)', letterSpacing: 1,
        }}>DIM</span>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: 18, fontWeight: 600,
          color: isAuto ? 'rgba(255,255,255,0.2)' : '#fff',
          transition: 'color 0.3s',
        }}>{pct}<span style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>%</span></span>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 500,
          color: 'rgba(255,255,255,0.15)', letterSpacing: 1,
        }}>MAX</span>
      </div>
    </div>
  );
}
