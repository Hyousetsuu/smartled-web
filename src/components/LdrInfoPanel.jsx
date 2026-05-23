import { useState, useEffect, useRef } from 'react';
import { GLASS_CARD } from '../constants/modes';
import { hexToRgba } from '../utils/colors';

export function LdrInfoPanel({ ldrValue, ldrStatus }) {
  const hasData = ldrValue != null;

  // Kalibrasi sesuai Arduino: batasTerang=500, batasGelap=3000
  const batasTerang = 500;
  const batasGelap = 3000;
  const midPoint = (batasTerang + batasGelap) / 2;
  const isDark = hasData ? ldrValue >= midPoint : false;
  const intensityPct = hasData
    ? Math.max(0, Math.min(100, ((batasGelap - ldrValue) / (batasGelap - batasTerang)) * 100))
    : 0;

  // Continuously looping 5-second countdown
  const [countdown, setCountdown] = useState(5);
  const countdownKey = useRef(0);

  // Loop the countdown every 5 seconds, always
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          // restart: bump key to re-trigger CSS animation
          countdownKey.current++;
          return 5;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Also reset when a fresh ldrValue arrives from Firebase
  useEffect(() => {
    if (hasData) {
      countdownKey.current++;
      setCountdown(5);
    }
  }, [ldrValue, hasData]);

  const statusColor = isDark ? '#a78bfa' : '#fbbf24';
  const statusIcon = isDark ? '🌙' : '☀️';
  const statusLabel = hasData
    ? (ldrStatus || (isDark ? 'GELAP' : 'TERANG'))
    : '...';

  return (
    <div style={{
      ...GLASS_CARD,
      borderColor: 'rgba(34,211,238,0.12)',
      background: hasData
        ? `linear-gradient(135deg, rgba(34,211,238,0.03), rgba(${isDark ? '139,92,246' : '251,191,36'},0.03))`
        : 'rgba(255,255,255,0.03)',
      animation: 'fadeSlideIn 0.3s ease',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Scan line effect */}
      <div style={{
        position: 'absolute', top: 0, left: '-20%', width: '20%', height: '100%',
        background: 'linear-gradient(90deg, transparent, rgba(34,211,238,0.04), transparent)',
        animation: 'ldrScanLine 3s ease-in-out infinite',
        pointerEvents: 'none',
      }} />

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 14 }}>📡</span>
          <span style={{
            fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700,
            letterSpacing: 1, color: '#22d3ee', textTransform: 'uppercase',
          }}>LDR Sensor</span>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: hasData ? 'rgba(34,211,238,0.08)' : 'rgba(255,255,255,0.04)',
          borderRadius: 12,
          padding: '4px 10px',
          border: `1px solid ${hasData ? 'rgba(34,211,238,0.15)' : 'rgba(255,255,255,0.08)'}`,
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: '50%',
            background: hasData ? '#22d3ee' : '#555',
            animation: hasData ? 'ldrPulse 2s ease-in-out infinite' : 'none',
          }} />
          <span style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 600,
            color: hasData ? '#22d3ee' : '#555', letterSpacing: 0.5,
          }}>{hasData ? `LIVE • ${countdown}s` : 'MENUNGGU...'}</span>
        </div>
      </div>

      {/* No data state */}
      {!hasData && (
        <div style={{
          textAlign: 'center', padding: '20px 0',
          animation: 'ldrPulse 2s ease-in-out infinite',
        }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>📶</div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 500,
            color: 'rgba(255,255,255,0.25)', letterSpacing: 0.5,
          }}>Menunggu data sensor...</div>
          <div style={{
            fontSize: 9, color: 'rgba(255,255,255,0.12)', marginTop: 6,
            fontFamily: "'JetBrains Mono', monospace",
          }}>Pastikan Arduino menulis ke LED/ldr_value</div>
        </div>
      )}

      {/* Main content — only when data is available */}
      {hasData && (
        <>
          {/* Main info row */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr auto 1fr',
            gap: 16, alignItems: 'center', marginBottom: 16,
          }}>
            {/* Sensor Value */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 28, fontWeight: 700,
                color: '#fff', lineHeight: 1,
                textShadow: `0 0 20px ${hexToRgba(statusColor, 0.3)}`,
              }}>{ldrValue}</div>
              <div style={{
                fontSize: 9, fontWeight: 600, letterSpacing: 1,
                color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', marginTop: 4,
              }}>RAW VALUE</div>
            </div>

            {/* Divider */}
            <div style={{
              width: 1, height: 40,
              background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.08), transparent)',
            }} />

            {/* Room Condition */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 28, lineHeight: 1, filter: isDark ? 'none' : 'drop-shadow(0 0 8px rgba(251,191,36,0.4))' }}>
                {statusIcon}
              </div>
              <div style={{
                fontSize: 10, fontWeight: 700, letterSpacing: 0.5,
                color: statusColor, marginTop: 6,
                textTransform: 'uppercase',
              }}>{statusLabel}</div>
            </div>
          </div>

          {/* Light Intensity Bar */}
          <div style={{ marginBottom: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 9, fontWeight: 600, color: 'rgba(255,255,255,0.2)', letterSpacing: 0.5, textTransform: 'uppercase' }}>Intensitas Cahaya</span>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 600,
                color: statusColor,
              }}>{Math.round(intensityPct)}%</span>
            </div>
            <div style={{
              height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.06)',
              overflow: 'hidden', position: 'relative',
            }}>
              <div style={{
                position: 'absolute', left: 0, top: 0, height: '100%', borderRadius: 3,
                width: `${intensityPct}%`,
                background: isDark
                  ? 'linear-gradient(90deg, #4c1d95, #7c3aed, #a78bfa)'
                  : 'linear-gradient(90deg, #92400e, #f59e0b, #fbbf24)',
                boxShadow: `0 0 10px ${hexToRgba(statusColor, 0.3)}`,
                transition: 'width 0.8s ease, background 0.5s',
              }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
              <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.12)', fontFamily: "'JetBrains Mono', monospace" }}>GELAP</span>
              <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.12)', fontFamily: "'JetBrains Mono', monospace" }}>TERANG</span>
            </div>
          </div>
        </>
      )}

      {/* Update interval countdown bar */}
      <div style={{
        height: 2, borderRadius: 1, background: 'rgba(34,211,238,0.08)',
        overflow: 'hidden', marginTop: 8,
      }}>
        <div
          key={countdownKey.current}
          style={{
            height: '100%', borderRadius: 1,
            background: 'linear-gradient(90deg, #06b6d4, #22d3ee)',
            animation: 'countdownBar 5s linear forwards',
          }}
        />
      </div>
      <div style={{ textAlign: 'center', marginTop: 6 }}>
        <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.12)', fontFamily: "'JetBrains Mono', monospace", letterSpacing: 0.5 }}>
          PEMBACAAN SETIAP 5 DETIK
        </span>
      </div>
    </div>
  );
}
