import { useMemo, useState } from "react";
import Badge from "../components/Badge";
import { CATS } from "../data/cats";
import { DAYS } from "../data/days";
import { LESSONS } from "../data/lessons";
import { BOOKINGS } from "../data/bookings";
import { useDemo } from "../store/demoStore";

export default function Corsi() {
  const { waitlist } = useDemo();
  const [capOverride, setCapOverride] = useState({});

  const waitByLesson = useMemo(() => {
    const map = {};
    BOOKINGS.filter((b) => b.status === "Lista d'attesa").forEach((b) => { map[b.lessonId] = (map[b.lessonId] || 0) + 1; });
    waitlist.forEach((id) => { map[id] = (map[id] || 0) + 1; });
    return map;
  }, [waitlist]);

  const rows = LESSONS.slice().sort((a, b) => a.day - b.day || a.time.localeCompare(b.time));
  const capOf = (l) => capOverride[l.id] ?? l.cap;
  const setCap = (id, base, delta) =>
    setCapOverride((o) => ({ ...o, [id]: Math.max(0, (o[id] ?? base) + delta) }));

  return (
    <>
      <h1 className="lfdt-admin-h1">Corsi</h1>
      <p className="lfdt-admin-lead">Capienza, occupazione e lista d'attesa. La capienza è modificabile (solo in questa demo).</p>

      <div className="lfdt-atable-wrap">
        <table className="lfdt-atable">
          <thead>
            <tr>
              <th>Lezione</th><th>Corso</th><th>Quando</th>
              <th className="num">Prenotati</th><th className="num">Lista</th><th>Capienza</th><th className="num">Riempimento</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((l) => {
              const c = CATS[l.cat];
              const d = DAYS[l.day];
              const cap = capOf(l);
              const pct = cap ? Math.min(100, Math.round((l.booked / cap) * 100)) : 0;
              return (
                <tr key={l.id}>
                  <td>{l.title}{l.price != null && <span className="lfdt-live-tag paid">€{l.price}</span>}</td>
                  <td><Badge color={c.color} soft={c.soft}>{c.label}</Badge></td>
                  <td>{d.short} {d.num} · {l.time}</td>
                  <td className="num">{l.booked}</td>
                  <td className="num">{waitByLesson[l.id] || 0}</td>
                  <td>
                    <div className="lfdt-stepper">
                      <button aria-label={`Riduci capienza ${l.title}`} onClick={() => setCap(l.id, l.cap, -1)}>−</button>
                      <span>{cap}</span>
                      <button aria-label={`Aumenta capienza ${l.title}`} onClick={() => setCap(l.id, l.cap, +1)}>+</button>
                    </div>
                  </td>
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
