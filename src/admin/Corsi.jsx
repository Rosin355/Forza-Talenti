import { useMemo } from "react";
import Badge from "../components/Badge";
import { CATS } from "../data/cats";
import { DAYS } from "../data/days";
import { LESSONS } from "../data/lessons";
import { BOOKINGS } from "../data/bookings";
import { useDemo } from "../store/demoStore";

export default function Corsi() {
  const { waitlist, booked, stations, setStations } = useDemo();

  const waitByLesson = useMemo(() => {
    const map = {};
    BOOKINGS.filter((b) => b.status === "Lista d'attesa").forEach((b) => { map[b.lessonId] = (map[b.lessonId] || 0) + 1; });
    waitlist.forEach((id) => { map[id] = (map[id] || 0) + 1; });
    return map;
  }, [waitlist]);

  const rows = LESSONS.slice().sort((a, b) => a.day - b.day || a.time.localeCompare(b.time));
  const occOf = (l) => Math.min(l.booked, stations) + (booked.includes(l.id) ? 1 : 0);

  return (
    <>
      <h1 className="lfdt-admin-h1">Agenda &amp; postazioni</h1>
      <p className="lfdt-admin-lead">Gli slot della settimana con occupazione e lista d'attesa.
        Cambia il numero di postazioni per vederne subito l'effetto sulla capienza.</p>

      <div className="lfdt-admin-filters">
        <label>Postazioni attive
          <div className="lfdt-stepper" style={{ background: "#fff" }}>
            <button aria-label="Riduci postazioni" onClick={() => setStations(stations - 1)}>−</button>
            <span>{stations}</span>
            <button aria-label="Aumenta postazioni" onClick={() => setStations(stations + 1)}>+</button>
          </div>
        </label>
        <span className="lfdt-admin-count">{rows.length} slot · capienza totale {rows.length * stations} sedute</span>
      </div>

      <div className="lfdt-atable-wrap">
        <table className="lfdt-atable">
          <thead>
            <tr>
              <th>Quando</th><th>Area</th><th>Operatore</th>
              <th className="num">Occupate</th><th className="num">Lista</th><th className="num">Postazioni</th><th className="num">Occupazione</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((l) => {
              const c = CATS[l.cat];
              const d = DAYS[l.day];
              const occ = occOf(l);
              const pct = Math.min(100, Math.round((occ / stations) * 100));
              return (
                <tr key={l.id}>
                  <td className="mono">{d.short} {d.num} · {l.time}</td>
                  <td><Badge color={c.color} soft={c.soft}>{c.label}</Badge></td>
                  <td>{l.teacher}</td>
                  <td className="num">{occ}</td>
                  <td className="num">{waitByLesson[l.id] || 0}</td>
                  <td className="num">{stations}</td>
                  <td className="num">
                    <div className="lfdt-fillbar" title={`${pct}%`}>
                      <span style={{ width: pct + "%", background: c.color }} />
                    </div>
                    <em>{pct}%</em>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
