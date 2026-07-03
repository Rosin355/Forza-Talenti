import { useMemo, useState } from "react";
import Badge from "../components/Badge";
import { CATS } from "../data/cats";
import { DAYS } from "../data/days";
import { LESSONS } from "../data/lessons";
import { BOOKINGS } from "../data/bookings";
import { useDemo } from "../store/demoStore";

const STATI = ["Confermata", "Lista d'attesa", "Disdetta"];
const statusClass = (s) =>
  s === "Confermata" ? "ok" : s === "Lista d'attesa" ? "wait" : "off";

export default function Prenotazioni() {
  const { booked, waitlist, member } = useDemo();
  const [dayF, setDayF] = useState("all");
  const [catF, setCatF] = useState("all");
  const [statoF, setStatoF] = useState("all");

  const rows = useMemo(() => {
    const mock = BOOKINGS.map((b) => ({ ...b, live: false }));
    const live = [
      ...booked.map((id) => ({ id: `live-b-${id}`, member: member.name, lessonId: id, status: "Confermata", live: true })),
      ...waitlist.map((id) => ({ id: `live-w-${id}`, member: member.name, lessonId: id, status: "Lista d'attesa", live: true })),
    ];
    return [...live, ...mock]
      .map((r) => ({ ...r, lesson: LESSONS.find((l) => l.id === r.lessonId) }))
      .filter((r) => r.lesson);
  }, [booked, waitlist, member.name]);

  const filtered = rows.filter((r) =>
    (dayF === "all" || r.lesson.day === Number(dayF)) &&
    (catF === "all" || r.lesson.cat === catF) &&
    (statoF === "all" || r.status === statoF)
  );

  return (
    <>
      <h1 className="lfdt-admin-h1">Prenotazioni</h1>
      <p className="lfdt-admin-lead">Le prenotazioni fatte dal sito compaiono qui in tempo reale.</p>

      <div className="lfdt-admin-filters">
        <label>Giorno
          <select value={dayF} onChange={(e) => setDayF(e.target.value)}>
            <option value="all">Tutti</option>
            {DAYS.map((d) => <option key={d.key} value={d.key}>{d.short} {d.num}</option>)}
          </select>
        </label>
        <label>Corso
          <select value={catF} onChange={(e) => setCatF(e.target.value)}>
            <option value="all">Tutti</option>
            {Object.entries(CATS).map(([k, c]) => <option key={k} value={k}>{c.label}</option>)}
          </select>
        </label>
        <label>Stato
          <select value={statoF} onChange={(e) => setStatoF(e.target.value)}>
            <option value="all">Tutti</option>
            {STATI.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>
        <span className="lfdt-admin-count">{filtered.length} risultati</span>
      </div>

      <div className="lfdt-atable-wrap">
        <table className="lfdt-atable">
          <thead>
            <tr>
              <th>Socio</th><th>Corso</th><th>Lezione</th><th>Quando</th><th>Stato</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={5} className="lfdt-atable-empty">Nessuna prenotazione con questi filtri.</td></tr>
            )}
            {filtered.map((r) => {
              const c = CATS[r.lesson.cat];
              const d = DAYS[r.lesson.day];
              return (
                <tr key={r.id} className={r.live ? "live" : ""}>
                  <td>
                    {r.member}
                    {r.live && <span className="lfdt-live-tag">dal sito · live</span>}
                  </td>
                  <td><Badge color={c.color} soft={c.soft}>{c.label}</Badge></td>
                  <td>{r.lesson.title}</td>
                  <td>{d.short} {d.num} · {r.lesson.time}</td>
                  <td><span className={`lfdt-pill ${statusClass(r.status)}`}>{r.status}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
