import { useMemo } from "react";
import LessonCard from "./LessonCard";
import { CATS } from "../data/cats";
import { DAYS } from "../data/days";
import { LESSONS } from "../data/lessons";
import { useDemo } from "../store/demoStore";

export default function Calendario() {
  const { day, setDay, catFilter, setCatFilter, weekCount, maxWeek } = useDemo();

  const dayLessons = useMemo(
    () => LESSONS.filter((l) => l.day === day && (catFilter === "all" || l.cat === catFilter))
      .sort((a, b) => a.time.localeCompare(b.time)),
    [day, catFilter]
  );

  return (
    <main>
      <section className="lfdt-section">
        <div className="lfdt-row-between">
          <h2>Calendario · 6–12 luglio</h2>
          <span className="lfdt-quota">{weekCount}/{maxWeek} prenotazioni questa settimana</span>
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
        <div className="lfdt-filters" aria-label="Filtra per percorso">
          <button className={`lfdt-chip ${catFilter === "all" ? "on" : ""}`} onClick={() => setCatFilter("all")}>Tutti</button>
          {Object.entries(CATS).map(([k, c]) => (
            <button key={k} className={`lfdt-chip ${catFilter === k ? "on" : ""}`}
              style={{ "--c": c.color, "--s": c.soft }} onClick={() => setCatFilter(k)}>
              <span className="lfdt-chip-dot" />{c.label}
            </button>
          ))}
        </div>
        <div className="lfdt-lessons">
          {dayLessons.length === 0 && (
            <div className="lfdt-empty">Nessuna lezione {catFilter !== "all" ? `di ${CATS[catFilter].label} ` : ""}in questo giorno.
              Prova un altro giorno o togli il filtro.</div>
          )}
          {dayLessons.map((l) => (
            <LessonCard key={l.id} l={l} />
          ))}
        </div>
        <p className="lfdt-rules">Puoi prenotare fino a 2 lezioni a settimana e fino a 12 ore prima dell'inizio.
          Ti chiediamo di disdire almeno 24 ore prima: così chi è in lista d'attesa entra al posto tuo.
          Per imprevisti dell'ultimo minuto scrivi allo staff, troviamo una soluzione insieme.</p>
      </section>
    </main>
  );
}
