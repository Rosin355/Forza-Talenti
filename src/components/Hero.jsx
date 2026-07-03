import TalentRing from "./TalentRing";

export default function Hero({ onCalendario, onPiani }) {
  return (
    <section className="lfdt-hero">
      <div className="lfdt-hero-copy">
        <div className="lfdt-eyebrow">Estate 2026 · iscrizioni aperte</div>
        <h1>Ogni talento ha bisogno<br /><em>di un cerchio</em> in cui crescere.</h1>
        <p>Meditazione, movimento, mindfulness e percorsi di crescita personale.
           Prenoti dall'app, la tua tessera è sempre con te, la prima lezione è di prova — e gratuita.</p>
        <div className="lfdt-hero-cta">
          <button className="lfdt-btn primary" onClick={onCalendario}>Guarda il calendario</button>
          <button className="lfdt-btn ghost" onClick={onPiani}>Scopri i piani</button>
        </div>
      </div>
      <div className="lfdt-hero-ring"><TalentRing size={230} /></div>
    </section>
  );
}
