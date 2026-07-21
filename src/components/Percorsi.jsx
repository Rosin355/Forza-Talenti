import { useNavigate } from "react-router-dom";
import { CATS } from "../data/cats";
import { TEACHERS } from "../data/teachers";

export default function Percorsi() {
  const navigate = useNavigate();
  return (
    <main>
      <section className="lfdt-section">
        <div className="lfdt-eyebrow">Cinque aree, un unico metodo</div>
        <h2>Le aree di trattamento</h2>
        <p className="lfdt-muted" style={{ maxWidth: "62ch" }}>
          La tecnologia è la stessa — campi elettromagnetici pulsati, calibrati sulle risposte naturali
          delle cellule — ma ogni area ha programmi, frequenze e obiettivi propri.
          Nella seduta conoscitiva gratuita capiamo insieme da dove partire.
        </p>
        <div className="lfdt-courses">
          {Object.entries(CATS).map(([k, c]) => (
            <div key={k} className="lfdt-course" style={{ "--c": c.color, "--s": c.soft }}>
              <div className="lfdt-course-head">
                <span className="lfdt-cat-dot" />
                <h3>{c.label}</h3>
              </div>
              <p>{c.desc}</p>
              <button className="lfdt-link" onClick={() => navigate(`/percorsi/${k}`)}>Scopri l'area →</button>
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
        <p className="lfdt-rules">Le sedute PEMF sono trattamenti di benessere e non sostituiscono diagnosi
          o terapie mediche. In presenza di pacemaker, gravidanza o patologie, consulta prima il tuo medico.</p>
      </section>
    </main>
  );
}
