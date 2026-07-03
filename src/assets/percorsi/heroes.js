// Mappa slug → immagine hero del percorso.
// I placeholder SVG vivono in questa cartella, uno per slug (es. meditazione.svg).
// Per usare una FOTO REALE basta salvare qui <slug>.jpg (o .png/.webp): il file
// raster ha la precedenza sul placeholder SVG, senza toccare il codice.
const files = import.meta.glob("./*.{svg,png,jpg,jpeg,webp}", { eager: true, import: "default" });

const RASTER = /\.(png|jpe?g|webp)$/i;
const baseName = (path) => path.split("/").pop().replace(/\.[^.]+$/, "");

export function heroFor(slug) {
  const entries = Object.entries(files).filter(([path]) => baseName(path) === slug);
  if (!entries.length) return null;
  const raster = entries.find(([path]) => RASTER.test(path));
  return (raster || entries[0])[1];
}
