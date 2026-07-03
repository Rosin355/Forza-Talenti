import { Navigate, useParams } from "react-router-dom";
import LessonCard from "./LessonCard";
import { CATS } from "../data/cats";
import { LESSONS } from "../data/lessons";

export default function PercorsoDettaglio({ goCal, booked, waitlist, isFull, spotsLeft, setOpen }) {
  const { slug } = useParams();
  const cat = CATS[slug];
  if (!cat) return <Navigate to="/percorsi" replace />;

  const lessons = LESSONS.filter((l) => l.cat === slug)
    .sort((a, b) => a.day - b.day || a.time.localeCompare(b.time));

  return (
    <main>
      <section className="lfdt-section">
        <div className="lfdt-eyebrow" style={{ color: cat.color }}>Percorso</div>
        <h2>{cat.label}</h2>
        <p className="lfdt-muted" style={{ maxWidth: "62ch" }}>{cat.desc}</p>
      </section>
      <section className="lfdt-section">
        <div className="lfdt-row-between">
          <h2>Le lezioni della settimana</h2>
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
    </main>
  );
}
