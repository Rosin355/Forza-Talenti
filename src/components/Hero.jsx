import NagomiOrbit from "./NagomiOrbit";

export default function Hero({ onCalendario, onPiani }) {
  return (
    <section className="lfdt-hero">
      <div className="lfdt-hero-copy">
        <div className="lfdt-eyebrow">Nagomi 和み · armonia cellulare</div>
        <h1>Ricarica le tue cellule.<br /><em>Ritrova la tua armonia.</em></h1>
        <p>Sedute individuali con tecnologia PEMF: campi elettromagnetici pulsati che stimolano
           il naturale metabolismo delle cellule. Prenoti dall'app, la prima seduta conoscitiva
           è gratuita.</p>
        <div className="lfdt-hero-cta">
          <button className="lfdt-btn primary" onClick={onCalendario}>Prenota una seduta</button>
          <button className="lfdt-btn ghost" onClick={onPiani}>Scopri i pacchetti</button>
        </div>
      </div>
      <div className="lfdt-hero-ring"><NagomiOrbit size={230} /></div>
    </section>
  );
}
