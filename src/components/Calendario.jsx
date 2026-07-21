import { useMemo } from "react";
import LessonCard from "./LessonCard";
import { CATS } from "../data/cats";
import { DAYS } from "../data/days";
import { LESSONS } from "../data/lessons";
import { useDemo } from "../store/demoStore";

export default function Calendario() {
  const { day, setDay, catFilter, setCatFilter, weekCount } = useDemo();

  const dayLessons = useMemo(
    () => LESSONS.filter((l) => l.day === day && (catFilter === "all" || l.cat === catFilter))
      .sort((a, b) => a.time.localeCompare(b.time)),
    [day, catFilter]
  );

  return (
    <main>
      <section className="lfdt-section">
        <div className="lfdt-row-between">
          <h2>Disponibilità · 6–12 luglio</h2>
          {weekCount > 0 && <span className="lfdt-quota">{weekCount} {weekCount === 1 ? "seduta prenotata" : "sedute prenotate"}</span>}
        </div>
        <div className="lfdt-days" role="tablist" aria-label="Giorni della settimana">
          {DAYS.map((d) => (
            <button key={d.key} role="tab" aria-selected={day === d.key}
              className={`lfdt-day ${day === d.key ? "on" : ""}`} onClick={() => setDay(d.key)}>
              <span className="lfdt-day-short">{d.short}</span>
              <span className="lfdt-day-num">{d.num}</span>
            </button>
          ))}
        </div>
        <div className="lfdt-filters" aria-label="Filtra per area di trattamento">
          <button className={`lfdt-chip ${catFilter === "all" ? "on" : ""}`} onClick={() => setCatFilter("all")}>Tutte</button>
          {Object.entries(CATS).map(([k, c]) => (
            <button key={k} className={`lfdt-chip ${catFilter === k ? "on" : ""}`}
              style={{ "--c": c.color, "--s": c.soft }} onClick={() => setCatFilter(k)}>
              <span className="lfdt-chip-dot" />{c.label}
            </button>
          ))}
        </div>
        <div className="lfdt-lessons">
          {dayLessons.length === 0 && (
            <div className="lfdt-empty">
              {day === 6 ? "La domenica il centro è chiuso: è il giorno del riposo, anche per le postazioni."
                : `Nessuna disponibilità ${catFilter !== "all" ? `per ${CATS[catFilter].label} ` : ""}in questo giorno. Prova un altro giorno o togli il filtro.`}
            </div>
          )}
          {dayLessons.map((l) => (
            <LessonCard key={l.id} l={l} />
          ))}
        </div>
        <p className="lfdt-rules">Ogni slot dura 45 minuti e ha una postazione per persona. Puoi prenotare fino a
          12 ore prima dell'inizio; ti chiediamo di disdire almeno 24 ore prima, così chi è in lista d'attesa
          entra al posto tuo. Se hai crediti attivi, la prenotazione ne usa uno in automatico.</p>
      </section>
    </main>
  );
}
