export function PowerButton({ isOff, onClick }) {
  // isOff = true means LED is currently OFF → button should say "Nyalakan LED" (turn ON)
  // isOff = false means LED is currently ON → button should say "Matikan LED" (turn OFF)
  const isCurrentlyOn = !isOff;
  return (
    <button className="sled-btn" onClick={onClick} style={{
      width: '100%',
      background: isCurrentlyOn
        ? 'linear-gradient(135deg, rgba(220,38,38,0.08), rgba(220,38,38,0.03))'
        : 'linear-gradient(135deg, rgba(34,197,94,0.08), rgba(34,197,94,0.03))',
      border: `1px solid ${isCurrentlyOn ? 'rgba(220,38,38,0.25)' : 'rgba(34,197,94,0.25)'}`,
      borderRadius: 24, padding: '18px', cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14,
      transition: 'all 0.25s',
      boxShadow: isCurrentlyOn ? '0 4px 20px rgba(220,38,38,0.1)' : '0 4px 20px rgba(34,197,94,0.1)',
    }}>
      <span style={{
        width: 36, height: 36, borderRadius: '50%',
        border: `2px solid ${isCurrentlyOn ? 'rgba(239,68,68,0.5)' : 'rgba(34,197,94,0.5)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 15, color: isCurrentlyOn ? '#ef4444' : '#22c55e',
        boxShadow: isCurrentlyOn ? '0 0 20px rgba(239,68,68,0.2)' : '0 0 20px rgba(34,197,94,0.2)',
        transition: 'all 0.25s',
        background: isCurrentlyOn ? 'rgba(239,68,68,0.05)' : 'rgba(34,197,94,0.05)',
      }}>⏻</span>
      <span style={{
        fontSize: 12, letterSpacing: 2, fontWeight: 700,
        color: isCurrentlyOn ? '#ef4444' : '#22c55e',
        textTransform: 'uppercase', transition: 'color 0.25s',
      }}>{isCurrentlyOn ? 'Matikan LED' : 'Nyalakan LED'}</span>
    </button>
  );
}
