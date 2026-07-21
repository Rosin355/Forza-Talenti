import { useId } from "react";

/* Elemento decorativo del brand: orbite ellittiche blu con sfere dorate
   che ruotano lentamente (richiama l'atomo del logo Nagomi).
   L'animazione rispetta prefers-reduced-motion (vedi .lfdt-ring nel CSS). */
export default function NagomiOrbit({ size = 120, spin = true, stroke = "#33398F" }) {
  const uid = useId();
  const gold = `nagomi-gold-${uid}`;
  const sw = Math.max(3, size * 0.028);
  return (
    <svg width={size} height={size} viewBox="-130 -130 260 260" aria-hidden="true"
      className={spin ? "lfdt-ring" : ""}>
      <defs>
        <radialGradient id={gold} cx="0.35" cy="0.3" r="0.85">
          <stop offset="0" stopColor="#FFE28A" />
          <stop offset="0.45" stopColor="#F9C206" />
          <stop offset="1" stopColor="#F5920B" />
        </radialGradient>
      </defs>
      <g fill="none" stroke={stroke} strokeWidth={sw} opacity="0.9">
        <ellipse rx="46" ry="118" transform="rotate(8)" />
        <ellipse rx="118" ry="46" transform="rotate(32)" />
        <ellipse rx="118" ry="46" transform="rotate(-38)" />
      </g>
      <g fill={`url(#${gold})`}>
        <circle cx="12" cy="-116" r="13" />
        <circle cx="104" cy="58" r="15" />
        <circle cx="-102" cy="-52" r="11" />
        <circle cx="-58" cy="102" r="12" />
        <circle cx="118" cy="-34" r="9" />
        <circle cx="-118" cy="30" r="8" />
      </g>
    </svg>
  );
}
