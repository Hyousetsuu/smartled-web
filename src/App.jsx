// src/App.jsx
import { useState, useEffect, useCallback } from 'react';
import { db } from './firebase';
import { ref, onValue, set } from 'firebase/database';

import './App.css';
import { SMART_COLOR_LOGIC } from './constants/modes';
import { TopBar } from './components/TopBar';
import { ColorWheel } from './components/ColorWheel';
import { BrightnessSlider } from './components/BrightnessSlider';
import { LdrInfoPanel } from './components/LdrInfoPanel';
import { AnimSection } from './components/AnimSection';
import { PowerButton } from './components/PowerButton';

/* ─── Font injection ──────────────────────────────────────────────────── */
if (!document.getElementById('sled-font')) {
  const l = document.createElement('link');
  l.id = 'sled-font';
  l.rel = 'stylesheet';
  l.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap';
  document.head.appendChild(l);
}

/* ─── Main App ────────────────────────────────────────────────────────── */
export default function App() {
  const [mode, setMode] = useState('off');
  const [color, setColor] = useState('#ff0000');
  const [brightness, setBrightness] = useState(150);
  const [isAuto, setIsAuto] = useState(false); // State untuk LDR
  const [ldrValue, setLdrValue] = useState(null); // Nilai mentah sensor LDR
  const [ldrStatus, setLdrStatus] = useState(''); // Status ruangan: TERANG/GELAP

  useEffect(() => {
    const unsubs = [
      onValue(ref(db, 'LED/mode'), s => { if (s.val()) setMode(s.val()); }),
      onValue(ref(db, 'LED/color'), s => { if (s.val()) setColor(s.val()); }),
      onValue(ref(db, 'LED/brightness'), s => { if (s.val() !== null) setBrightness(s.val()); }),
      onValue(ref(db, 'LED/auto'), s => { if (s.val() !== null) setIsAuto(s.val()); }),
      onValue(ref(db, 'LED/ldr_value'), s => { if (s.val() !== null) setLdrValue(s.val()); }),
      onValue(ref(db, 'LED/ldr_status'), s => { if (s.val() !== null) setLdrStatus(s.val()); }),
    ];
    return () => unsubs.forEach(u => u());
  }, []);

  const writeMode = useCallback(m => set(ref(db, 'LED/mode'), m), []);
  const writeColor = useCallback(c => set(ref(db, 'LED/color'), c), []);
  const writeBrightness = useCallback(b => set(ref(db, 'LED/brightness'), b), []);
  const writeAuto = useCallback(a => set(ref(db, 'LED/auto'), a), []);

  const handleColorChange = (c) => {
    setColor(c); writeColor(c);
    if (!SMART_COLOR_LOGIC.includes(mode)) { setMode('solid'); writeMode('solid'); }
  };

  const handleBrightness = e => {
    if (isAuto) return; // Mencegah slider digeser saat LDR aktif
    const v = Number(e.target.value); setBrightness(v); writeBrightness(v);
  };

  const toggleAuto = () => {
    const newState = !isAuto;
    setIsAuto(newState);
    writeAuto(newState);
  };

  const handleMode = m => { setMode(m); writeMode(m); };
  const handlePower = () => { handleMode(mode === 'off' ? 'solid' : 'off'); };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '32px 16px', paddingBottom: '60px', position: 'relative', zIndex: 1,
    }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        <TopBar mode={mode} color={color} isAuto={isAuto} />
        <ColorWheel color={color} mode={mode} onColorChange={handleColorChange} />
        <BrightnessSlider value={brightness} color={color} isAuto={isAuto} ldrValue={ldrValue} ldrStatus={ldrStatus} onChange={handleBrightness} onToggleAuto={toggleAuto} />
        <LdrInfoPanel ldrValue={ldrValue} ldrStatus={ldrStatus} />
        <AnimSection currentMode={mode} onMode={handleMode} />
        <PowerButton isOff={mode === 'off'} onClick={handlePower} />

        {/* Footer */}
        <div style={{
          textAlign: 'center', marginTop: 24,
          fontSize: 10, color: 'rgba(255,255,255,0.1)', letterSpacing: 1,
        }}>
          SmartLED Controller • v2.2
        </div>
      </div>
    </div>
  );
}