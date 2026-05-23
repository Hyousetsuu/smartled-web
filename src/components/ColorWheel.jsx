import { useState, useEffect, useCallback, useRef } from 'react';
import { ALL_MODES, GLASS_CARD } from '../constants/modes';
import { hexToRgb, rgbToHsl, hueToHex, hexToRgba, hslToRgb, rgbToHex } from '../utils/colors';

export function ColorWheel({ color, mode, onColorChange }) {
  const modeLabel = mode === 'off' ? 'Off' : ALL_MODES[mode]?.label ?? mode;
  const [showPanel, setShowPanel] = useState(false);
  const [inputTab, setInputTab] = useState('hex'); // 'hex' | 'rgb' | 'hsl'
  const [hexInput, setHexInput] = useState(color);
  const ringRef = useRef(null);
  const draggingRef = useRef(false);
  const onColorChangeRef = useRef(onColorChange);

  // Keep callback ref fresh so drag handlers always use latest
  useEffect(() => { onColorChangeRef.current = onColorChange; }, [onColorChange]);

  // Sync hexInput when color changes externally
  useEffect(() => { setHexInput(color); }, [color]);

  const rgb = hexToRgb(color);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  // --- Compute hue angle from pointer position ---
  const getHueFromPointer = useCallback((e, skipInnerCheck) => {
    const el = ringRef.current;
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const clientX = e.clientX ?? (e.touches?.[0]?.clientX);
    const clientY = e.clientY ?? (e.touches?.[0]?.clientY);
    if (clientX == null || clientY == null) return null;
    const dx = clientX - cx;
    const dy = clientY - cy;
    // Only check inner radius on first click, not during drag
    if (!skipInnerCheck) {
      const dist = Math.sqrt(dx * dx + dy * dy);
      const innerR = rect.width / 2 * 0.36;
      if (dist < innerR) return null;
    }
    let angle = Math.atan2(dy, dx) * (180 / Math.PI);
    return (angle + 360) % 360;
  }, []);

  const onRingPointerDown = useCallback((e) => {
    const hue = getHueFromPointer(e, false);
    if (hue === null) return; // clicked inner area
    draggingRef.current = true;
    onColorChangeRef.current(hueToHex(hue));
    // Capture pointer for reliable tracking even outside the element
    e.currentTarget.setPointerCapture(e.pointerId);
    e.preventDefault();
  }, [getHueFromPointer]);

  const onRingPointerMove = useCallback((e) => {
    if (!draggingRef.current) return;
    const hue = getHueFromPointer(e, true); // skip inner check during drag
    if (hue === null) return;
    onColorChangeRef.current(hueToHex(hue));
  }, [getHueFromPointer]);

  const onRingPointerUp = useCallback((e) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
  }, []);

  // --- Inner circle: toggle color panel ---
  const onCenterClick = (e) => {
    e.stopPropagation();
    // Don't open panel if we were just dragging
    if (!draggingRef.current) {
      setShowPanel(p => !p);
    }
  };

  // --- Input handlers ---
  const commitHex = (val) => {
    const v = val.startsWith('#') ? val : '#' + val;
    if (/^#[0-9a-fA-F]{6}$/.test(v)) {
      onColorChange(v.toLowerCase());
    }
  };

  const handleRgbChange = (channel, val) => {
    const n = Math.max(0, Math.min(255, parseInt(val) || 0));
    const newRgb = { ...rgb, [channel]: n };
    onColorChange(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
  };

  const handleHslChange = (channel, val) => {
    const max = channel === 'h' ? 360 : 100;
    const n = Math.max(0, Math.min(max, parseInt(val) || 0));
    const newHsl = { ...hsl, [channel]: n };
    const c = hslToRgb(newHsl.h, newHsl.s, newHsl.l);
    onColorChange(rgbToHex(c.r, c.g, c.b));
  };

  // --- Hue indicator position on ring ---
  const indicatorRad = (hsl.h * Math.PI) / 180;
  const ringRadius = 86;
  const indX = 100 + ringRadius * Math.cos(indicatorRad);
  const indY = 100 + ringRadius * Math.sin(indicatorRad);
  const isDragging = draggingRef.current;

  const inputStyle = {
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 10, padding: '8px 10px',
    color: '#fff', fontSize: 13,
    fontFamily: "'JetBrains Mono', monospace",
    outline: 'none', width: '100%',
    textAlign: 'center',
    transition: 'border-color 0.2s',
  };

  const labelStyle = {
    fontSize: 10, fontWeight: 600, letterSpacing: 1,
    color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase',
    marginBottom: 4,
  };

  const tabBtnStyle = (active) => ({
    background: active ? 'rgba(99,102,241,0.2)' : 'transparent',
    border: `1px solid ${active ? 'rgba(99,102,241,0.4)' : 'rgba(255,255,255,0.06)'}`,
    borderRadius: 8, padding: '5px 14px',
    color: active ? '#a5b4fc' : 'rgba(255,255,255,0.3)',
    fontSize: 10, fontWeight: 700, letterSpacing: 1,
    cursor: 'pointer', textTransform: 'uppercase',
    transition: 'all 0.2s',
  });

  return (
    <div style={{ ...GLASS_CARD, padding: '32px 24px' }}>
      <div
        ref={ringRef}
        onPointerDown={onRingPointerDown}
        onPointerMove={onRingPointerMove}
        onPointerUp={onRingPointerUp}
        onPointerCancel={onRingPointerUp}
        style={{ position: 'relative', width: 200, height: 200, margin: '0 auto 28px', touchAction: 'none' }}
      >
        {/* Outer glow ring */}
        <div style={{
          position: 'absolute', inset: -8, borderRadius: '50%',
          background: `conic-gradient(from 0deg, ${hexToRgba(color, 0.15)}, transparent 30%, transparent 70%, ${hexToRgba(color, 0.15)})`,
          filter: 'blur(8px)', transition: 'all 0.3s', pointerEvents: 'none',
        }} />
        {/* Color ring */}
        <div style={{
          width: 200, height: 200, borderRadius: '50%', position: 'relative',
          background: 'conic-gradient(from 90deg, #ff0000, #ff8000, #ffcc00, #80ff00, #00ff80, #00ccff, #0040ff, #8000ff, #ff0080, #ff0000)',
          boxShadow: '0 0 40px rgba(0,0,0,0.3), inset 0 0 20px rgba(0,0,0,0.1)',
          cursor: 'crosshair',
        }} />
        {/* Hue indicator dot on ring */}
        <div style={{
          position: 'absolute',
          left: indX - 7, top: indY - 7,
          width: 14, height: 14, borderRadius: '50%',
          background: color,
          border: '2px solid #fff',
          boxShadow: `0 0 8px ${hexToRgba(color, 0.6)}, 0 0 2px rgba(0,0,0,0.5)`,
          pointerEvents: 'none',
          transition: isDragging ? 'none' : 'left 0.08s, top 0.08s, background 0.1s',
          zIndex: 3,
        }} />
        {/* Inner cutout */}
        <div style={{
          position: 'absolute', top: 28, left: 28, width: 144, height: 144,
          borderRadius: '50%', background: '#0c0c10',
          boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.4)',
          pointerEvents: 'none',
        }} />
        {/* Center color preview (clickable → opens panel) */}
        <div
          onClick={onCenterClick}
          style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
            width: 72, height: 72, borderRadius: '50%', background: color,
            border: `3px solid ${showPanel ? 'rgba(99,102,241,0.5)' : 'rgba(255,255,255,0.08)'}`,
            boxShadow: `0 0 30px ${hexToRgba(color, 0.35)}, inset 0 1px 2px rgba(255,255,255,0.15)`,
            transition: 'background 0.15s, box-shadow 0.3s, border-color 0.3s',
            cursor: 'pointer', zIndex: 4,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          {/* Pencil icon hint */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: showPanel ? 0.8 : 0.3, transition: 'opacity 0.2s' }}>
            <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
        </div>
      </div>

      {/* ─── Color Info Bar ─── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: showPanel ? 20 : 0, transition: 'margin 0.3s' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 16, height: 16, borderRadius: 6, background: color,
            boxShadow: `0 0 8px ${hexToRgba(color, 0.3)}`,
            border: '1px solid rgba(255,255,255,0.1)',
          }} />
          <span style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 16, fontWeight: 500,
            color: '#fff', letterSpacing: 1,
          }}>{color.toUpperCase()}</span>
        </div>
        <span style={{
          fontSize: 11, fontWeight: 600, letterSpacing: 0.5,
          color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase',
          background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: '5px 12px',
          border: '1px solid rgba(255,255,255,0.04)',
        }}>{modeLabel}</span>
      </div>

      {/* ─── Color Input Panel (toggled by center click) ─── */}
      {showPanel && (
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 16, padding: '18px 16px',
          animation: 'fadeSlideIn 0.25s ease',
        }}>
          {/* Tab selector */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
            {['hex', 'rgb', 'hsl'].map(t => (
              <button key={t} onClick={() => setInputTab(t)} style={tabBtnStyle(inputTab === t)}>{t}</button>
            ))}
          </div>

          {/* HEX input */}
          {inputTab === 'hex' && (
            <div>
              <div style={labelStyle}>Hex Color</div>
              <input
                value={hexInput.toUpperCase()}
                onChange={(e) => {
                  const v = e.target.value;
                  setHexInput(v);
                  if (/^#[0-9a-fA-F]{6}$/.test(v)) commitHex(v);
                }}
                onBlur={() => commitHex(hexInput)}
                onKeyDown={(e) => { if (e.key === 'Enter') commitHex(hexInput); }}
                maxLength={7}
                style={inputStyle}
                placeholder="#FF0000"
              />
            </div>
          )}

          {/* RGB inputs */}
          {inputTab === 'rgb' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
              {['r', 'g', 'b'].map(ch => (
                <div key={ch}>
                  <div style={labelStyle}>{ch.toUpperCase()}</div>
                  <input
                    type="number" min="0" max="255"
                    value={rgb[ch]}
                    onChange={(e) => handleRgbChange(ch, e.target.value)}
                    style={inputStyle}
                  />
                </div>
              ))}
            </div>
          )}

          {/* HSL inputs */}
          {inputTab === 'hsl' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
              {[{ k: 'h', label: 'H°', max: 360 }, { k: 's', label: 'S%', max: 100 }, { k: 'l', label: 'L%', max: 100 }].map(({ k, label, max }) => (
                <div key={k}>
                  <div style={labelStyle}>{label}</div>
                  <input
                    type="number" min="0" max={max}
                    value={hsl[k]}
                    onChange={(e) => handleHslChange(k, e.target.value)}
                    style={inputStyle}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Quick color presets */}
          <div style={{ display: 'flex', gap: 6, marginTop: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            {['#ff0000', '#ff8000', '#ffcc00', '#00ff00', '#00ccff', '#0040ff', '#8000ff', '#ff0080', '#ffffff', '#ff4444'].map(c => (
              <div
                key={c}
                onClick={() => onColorChange(c)}
                style={{
                  width: 24, height: 24, borderRadius: 8, background: c, cursor: 'pointer',
                  border: color === c ? '2px solid #fff' : '1px solid rgba(255,255,255,0.1)',
                  boxShadow: color === c ? `0 0 8px ${hexToRgba(c, 0.5)}` : 'none',
                  transition: 'all 0.15s',
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
