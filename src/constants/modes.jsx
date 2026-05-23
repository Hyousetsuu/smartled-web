export const I = (d, color = 'currentColor') => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {d}
  </svg>
);

export const ICONS = {
  // Custom color modes
  solid: (c) => I(<><circle cx="12" cy="12" r="5" fill={c} stroke={c} /><circle cx="12" cy="12" r="9" /></>, c || '#818cf8'),
  breath: (c) => I(<><path d="M12 3c0 4-4 6-4 9a4 4 0 008 0c0-3-4-5-4-9z" /><path d="M8 16c0 2.2 1.8 4 4 4s4-1.8 4-4" opacity=".4" /></>, c || '#818cf8'),
  colorwipe: (c) => I(<><rect x="3" y="3" width="18" height="18" rx="3" /><rect x="3" y="3" width="10" height="18" rx="3" fill={c} stroke={c} /></>, c || '#818cf8'),
  larson: (c) => I(<><line x1="4" y1="12" x2="20" y2="12" /><circle cx="12" cy="12" r="3" fill={c} stroke={c} /><circle cx="7" cy="12" r="1.5" opacity=".3" fill={c} stroke="none" /><circle cx="17" cy="12" r="1.5" opacity=".3" fill={c} stroke="none" /></>, c || '#818cf8'),
  running: (c) => I(<><path d="M2 12c2-3 4-3 6 0s4 3 6 0 4-3 6 0" /><path d="M2 17c2-3 4-3 6 0s4 3 6 0 4-3 6 0" opacity=".3" /></>, c || '#818cf8'),
  sparkle: (c) => I(<><path d="M12 2l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" fill={c} stroke={c} /><circle cx="19" cy="5" r="1" fill={c} stroke="none" /><circle cx="5" cy="19" r="1" fill={c} stroke="none" /></>, c || '#818cf8'),
  strobe: (c) => I(<><path d="M13 2L4 14h7l-1 8 9-12h-7z" fill={c} stroke={c} /></>, c || '#818cf8'),
  twinkle: (c) => I(<><path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5z" fill={c} stroke={c} /><path d="M18 14l1 3 3 1-3 1-1 3-1-3-3-1 3-1z" fill={c} stroke={c} opacity=".5" /></>, c || '#818cf8'),
  dualscan: (c) => I(<><line x1="4" y1="6" x2="4" y2="18" /><line x1="20" y1="6" x2="20" y2="18" /><path d="M4 12h5" strokeDasharray="2 2" /><path d="M15 12h5" strokeDasharray="2 2" /><polygon points="9,9 14,12 9,15" fill={c} stroke={c} /><polygon points="15,9 10,12 15,15" fill={c} stroke={c} opacity=".5" /></>, c || '#818cf8'),
  chasewhite: (c) => I(<><circle cx="5" cy="12" r="2" fill="#fff" stroke="#fff" /><circle cx="12" cy="12" r="2" fill="#fff" stroke="#fff" opacity=".5" /><circle cx="19" cy="12" r="2" fill="#fff" stroke="#fff" opacity=".2" /><path d="M7 12h3M14 12h3" strokeDasharray="1 1" /></>, c || '#818cf8'),

  // Auto color modes
  pelangi: () => I(<><path d="M3 17a9 9 0 0118 0" stroke="#f472b6" /><path d="M5 17a7 7 0 0114 0" stroke="#fbbf24" /><path d="M7 17a5 5 0 0110 0" stroke="#34d399" /><path d="M9 17a3 3 0 016 0" stroke="#60a5fa" /></>),
  rainbow: () => I(<><circle cx="12" cy="12" r="9" stroke="#c084fc" /><path d="M12 3a9 9 0 010 18" stroke="#f472b6" /><circle cx="12" cy="12" r="4" stroke="#60a5fa" /><circle cx="12" cy="12" r="1.5" fill="#34d399" stroke="none" /></>, '#c084fc'),
  theater: () => I(<><rect x="2" y="4" width="20" height="16" rx="2" stroke="#fbbf24" /><circle cx="8" cy="12" r="2" fill="#f472b6" stroke="none" /><circle cx="16" cy="12" r="2" fill="#60a5fa" stroke="none" /><line x1="2" y1="8" x2="22" y2="8" stroke="#fbbf24" opacity=".3" /></>, '#fbbf24'),
  fire: () => I(<><path d="M12 22c-4 0-7-3-7-7 0-5 7-13 7-13s7 8 7 13c0 4-3 7-7 7z" fill="none" stroke="#f97316" /><path d="M12 22c-2 0-3.5-1.5-3.5-3.5 0-2.5 3.5-6.5 3.5-6.5s3.5 4 3.5 6.5c0 2-1.5 3.5-3.5 3.5z" fill="#f97316" stroke="#f97316" opacity=".5" /></>, '#f97316'),
  ular: () => I(<><path d="M4 8c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2" stroke="#34d399" /><path d="M4 13c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2" stroke="#34d399" opacity=".4" /><circle cx="5" cy="8" r="1" fill="#34d399" stroke="none" /></>, '#34d399'),
  kedip: () => I(<><circle cx="12" cy="12" r="4" fill="#ef4444" stroke="#ef4444" opacity=".6" /><circle cx="12" cy="12" r="8" stroke="#ef4444" strokeDasharray="3 3" /><line x1="12" y1="2" x2="12" y2="5" stroke="#ef4444" opacity=".4" /><line x1="12" y1="19" x2="12" y2="22" stroke="#ef4444" opacity=".4" /><line x1="2" y1="12" x2="5" y2="12" stroke="#ef4444" opacity=".4" /><line x1="19" y1="12" x2="22" y2="12" stroke="#ef4444" opacity=".4" /></>, '#ef4444'),
  rgbjalan: () => I(<><circle cx="7" cy="12" r="3" fill="#ef4444" stroke="none" opacity=".7" /><circle cx="12" cy="12" r="3" fill="#22c55e" stroke="none" opacity=".7" /><circle cx="17" cy="12" r="3" fill="#3b82f6" stroke="none" opacity=".7" /><path d="M4 18h16" stroke="#888" strokeDasharray="2 2" opacity=".3" /></>, '#22c55e'),
  fireworks: () => I(<><line x1="12" y1="22" x2="12" y2="12" stroke="#fbbf24" opacity=".3" /><line x1="12" y1="8" x2="12" y2="3" stroke="#f472b6" /><line x1="12" y1="8" x2="7" y2="4" stroke="#60a5fa" /><line x1="12" y1="8" x2="17" y2="4" stroke="#fbbf24" /><line x1="12" y1="8" x2="5" y2="8" stroke="#34d399" /><line x1="12" y1="8" x2="19" y2="8" stroke="#c084fc" /><circle cx="12" cy="8" r="2" fill="#f472b6" stroke="none" /></>, '#f472b6'),
  twinklerandom: () => I(<><path d="M12 2l1 3 3 1-3 1-1 3-1-3-3-1 3-1z" fill="#fbbf24" stroke="none" /><path d="M19 10l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z" fill="#c084fc" stroke="none" /><path d="M6 14l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z" fill="#60a5fa" stroke="none" /><path d="M15 17l.5 1.5 1.5.5-1.5.5-.5 1.5-.5-1.5-1.5-.5 1.5-.5z" fill="#34d399" stroke="none" /></>, '#fbbf24'),
  halloween: () => I(<><circle cx="12" cy="13" r="8" fill="none" stroke="#f97316" /><path d="M8 11v2" stroke="#f97316" /><path d="M16 11v2" stroke="#f97316" /><path d="M8 16c1.5 1.5 2.5 1 4 0s2.5-1.5 4 0" stroke="#f97316" /><path d="M10 5l2-3 2 3" stroke="#f97316" /></>, '#f97316'),
  christmas: () => I(<><path d="M12 2l-7 14h4l-3 6h12l-3-6h4z" fill="none" stroke="#22c55e" /><circle cx="10" cy="12" r="1" fill="#ef4444" stroke="none" /><circle cx="14" cy="15" r="1" fill="#fbbf24" stroke="none" /><circle cx="11" cy="18" r="1" fill="#3b82f6" stroke="none" /><rect x="10" y="20" width="4" height="2" rx="1" fill="#8B4513" stroke="none" /></>, '#22c55e'),
};

/* ─── Konfigurasi Kategori Mode ───────────────────────── */
export const CUSTOM_COLOR_MODES = {
  solid: { label: 'Solid' },
  breath: { label: 'Breath' },
  colorwipe: { label: 'Wipe' },
  larson: { label: 'Larson' },
  running: { label: 'Running' },
  sparkle: { label: 'Sparkle' },
  strobe: { label: 'Strobe' },
  twinkle: { label: 'Twinkle' },
  dualscan: { label: 'Dual Scan' },
  chasewhite: { label: 'Chase W.' },
};

export const AUTO_COLOR_MODES = {
  pelangi: { label: 'Pelangi' },
  rainbow: { label: 'R-Cycle' },
  theater: { label: 'Theater' },
  fire: { label: 'Fire' },
  ular: { label: 'Ular' },
  kedip: { label: 'Kedip' },
  rgbjalan: { label: 'RGB Run' },
  fireworks: { label: 'Fireworks' },
  twinklerandom: { label: 'R-Twinkle' },
  halloween: { label: 'Halloween' },
  christmas: { label: 'Christmas' },
};

export const ALL_MODES = { ...CUSTOM_COLOR_MODES, ...AUTO_COLOR_MODES };
export const SMART_COLOR_LOGIC = Object.keys(CUSTOM_COLOR_MODES);

export const GLASS_CARD = {
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.06)',
  borderRadius: 24,
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  padding: 24,
  marginBottom: 16,
  transition: 'border-color 0.3s, box-shadow 0.3s',
};
