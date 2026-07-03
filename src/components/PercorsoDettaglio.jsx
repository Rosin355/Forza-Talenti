import { Navigate, useNavigate, useParams } from "react-router-dom";
import LessonCard from "./LessonCard";
import { CATS } from "../data/cats";
import { LESSONS } from "../data/lessons";
import { TEACHERS } from "../data/teachers";
import { heroFor } from "../assets/percorsi/heroes";

export default function PercorsoDettaglio({ goCal, booked, waitlist, isFull, spotsLeft, setOpen }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const cat = CATS[slug];
  if (!cat) return <Navigate to="/percorsi" replace />;

  const hero = heroFor(slug);
  const teachers = cat.teachers.map((id) => TEACHERS.find((t) => t.id === id)).filter(Boolean);
  const lessons = LESSONS.filter((l) => l.cat === slug)
    .sort((a, b) => a.day - b.day || a.time.localeCompare(b.time));
  const [lead, ...paragraphs] = cat.long;

  const info = [
    { label: "A chi è adatto", value: cat.forWho },
    { label: "Cosa portare", value: cat.bring },
    { label: "Livello", value: cat.level },
    { label: "Durata tipica", value: cat.duration },
  ];

  return (
    <main style={{ "--c": cat.color, "--s": cat.soft }}>
      <section className="lfdt-section">
        <div className="lfdt-phero">
          {hero && <img className="lfdt-phero-img" src={hero} alt={`Percorso ${cat.label}`} />}
          <div className="lfdt-phero-overlay">
            <div className="lfdt-phero-eyebrow">Percorso</div>
            <h1>{cat.label}</h1>
            <div className="lfdt-phero-meta">{cat.level} · {cat.duration}</div>
          </div>
        </div>
      </section>

      <section className="lfdt-section">
        <div className="lfdt-prose">
          <p className="lfdt-lead">{lead}</p>
          {paragraphs.map((p, i) => (
            <p key={i} className="lfdt-prose-p">{p}</p>
          ))}
        </div>
      </section>

      <section className="lfdt-section">
        <div className="lfdt-info">
          {info.map((it) => (
            <div key={it.label} className="lfdt-info-item">
              <span className="lfdt-info-label">{it.label}</span>
              <p>{it.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="lfdt-section">
        <h2>Chi ti accompagna</h2>
        <div className="lfdt-teachers">
          {teachers.map((t) => (
            <div key={t.id} className="lfdt-teacher">
              <div className="lfdt-avatar" style={{ background: t.color }}>{t.initial}</div>
              <div>
                <strong>{t.name}</strong>
                <div className="lfdt-teacher-role" style={{ color: t.color }}>{t.role}</div>
                <p className="lfdt-muted">{t.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="lfdt-section">
        <div className="lfdt-row-between">
          <h2>Prossime lezioni di questo percorso</h2>
          <button className="lfdt-link" onClick={() => goCal(slug)}>Vedi nel calendario →</button>
        </div>
        <div className="lfdt-lessons">
          {lessons.length === 0 && (
            <div className="lfdt-empty">Nessuna lezione di {cat.label} in programma questa settimana.</div>
          )}
          {lessons.map((l) => (
            <LessonCard key={l.id} l={l} booked={booked} waitlist={waitlist}
              isFull={isFull} spotsLeft={spotsLeft} onOpen={() => setOpen(l)} />
          ))}
        </div>
      </section>

      <section className="lfdt-section">
        <div className="lfdt-cta">
          <div>
            <h3>Pronto a iniziare?</h3>
            <p>La prima lezione di prova è gratuita. Attiva la tessera e prenota il tuo posto nel cerchio.</p>
          </div>
          <button className="lfdt-btn primary" onClick={() => navigate("/piani")}>Scopri i piani</button>
        </div>
      </section>
    </main>
  );
}
