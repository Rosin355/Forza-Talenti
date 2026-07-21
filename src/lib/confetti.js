import confetti from "canvas-confetti";

const COLORS = ["#33398F", "#6366F1", "#F9C206", "#F5920B", "#FFE28A", "#0E9BB5"];

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/* feedback leggero: prenotazione confermata */
export function pop() {
  if (reduced()) return;
  confetti({
    particleCount: 45,
    spread: 60,
    startVelocity: 32,
    scalar: 0.8,
    ticks: 120,
    origin: { y: 0.72 },
    colors: COLORS,
    disableForReducedMotion: true,
  });
}

/* celebrazione: conferma di un acquisto */
export function celebrate() {
  if (reduced()) return;
  const base = { colors: COLORS, disableForReducedMotion: true };
  confetti({ ...base, particleCount: 90, spread: 75, origin: { y: 0.6 }, startVelocity: 45 });
  confetti({ ...base, particleCount: 55, angle: 60, spread: 60, origin: { x: 0, y: 0.7 } });
  confetti({ ...base, particleCount: 55, angle: 120, spread: 60, origin: { x: 1, y: 0.7 } });
}
