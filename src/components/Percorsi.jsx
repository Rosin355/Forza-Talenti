import { CATS, TEACHERS } from "../data/mockData";

export default function Percorsi({ goCal }) {
  return (
    <main>
      <section className="lfdt-section">
        <div className="lfdt-eyebrow">Otto colori, un solo cerchio</div>
        <h2>I percorsi dell'associazione</h2>
        <p className="lfdt-muted" style={{ maxWidth: "62ch" }}>
          Ogni percorso ha il suo colore, lo stesso che ritrovi nel calendario: impari a orientarti a colpo d'occhio.
          Puoi frequentare un solo percorso o comporre la tua settimana mescolandoli.
        </p>
        <div className="lfdt-courses">
          {Object.entries(CATS).map(([k, c]) => (
            <div key={k} className="lfdt-course" style={{ "--c": c.color, "--s": c.soft }}>
              <div className="lfdt-course-head">
                <span className="lfdt-cat-dot" />
                <h3>{c.label}</h3>
              </div>
              <p>{c.desc}</p>
              <button className="lfdt-link" onClick={() => goCal(k)}>Vedi nel calendario →</button>
            </div>
          ))}
        </div>
      </section>

      <section className="lfdt-section">
        <h2>Chi ti accompagna</h2>
        <div className="lfdt-teachers">
          {TEACHERS.map((t) => (
            <div key={t.name} className="lfdt-teacher">
              <div className="lfdt-avatar" style={{ background: t.color }}>{t.initial}</div>
              <div>
                <strong>{t.name}</strong>
                <div className="lfdt-teacher-role" style={{ color: t.color }}>{t.role}</div>
                <p className="lfdt-muted">{t.bio}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="lfdt-rules">Vuoi entrare a far parte dello staff o proporre una collaborazione?
          L'associazione è aperta a convenzioni con altre realtà del territorio.</p>
      </section>
    </main>
  );
}
