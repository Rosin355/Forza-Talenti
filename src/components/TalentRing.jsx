const RAINBOW = ["#F43F5E", "#F97316", "#FACC15", "#22C55E", "#06B6D4", "#3B82F6", "#8B5CF6", "#D9269B"];

/* ---------- anello decorativo (richiama il logo) ---------- */
export default function TalentRing({ size = 120, spin = true }) {
  const r = size / 2 - size * 0.13;
  const c = size / 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true"
      className={spin ? "lfdt-ring" : ""}>
      {RAINBOW.map((col, i) => {
        const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
        return (
          <g key={i}>
            <circle cx={c + Math.cos(a) * r} cy={c + Math.sin(a) * r} r={size * 0.075} fill={col} />
            <circle cx={c + Math.cos(a) * r * 0.66} cy={c + Math.sin(a) * r * 0.66} r={size * 0.032} fill={col} opacity="0.55" />
          </g>
        );
      })}
    </svg>
  );
}
