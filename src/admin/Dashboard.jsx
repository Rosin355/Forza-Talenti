import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell, ResponsiveContainer,
} from "recharts";
import { CATS } from "../data/cats";
import { DAYS } from "../data/days";
import { LESSONS } from "../data/lessons";
import { BOOKINGS } from "../data/bookings";
import { useDemo } from "../store/demoStore";

const euro = (n) => "€" + n.toLocaleString("it-IT");

export default function Dashboard() {
  const { booked, waitlist, orders, stations } = useDemo();

  const lessonById = (id) => LESSONS.find((l) => l.id === id);
  const activeMock = BOOKINGS.filter((b) => b.status !== "Disdetta");

  const seduteSettimana = activeMock.length + booked.length + waitlist.length;

  const totalCapacity = LESSONS.length * stations;
  const totalBooked = LESSONS.reduce((a, l) => a + Math.min(l.booked, stations), 0) + booked.length;
  const occupazione = Math.min(100, Math.round((totalBooked / totalCapacity) * 100));

  const creditiBase = 85;
  const creditiVenduti = creditiBase + orders.reduce((a, o) => a + (o.credits || 0), 0);

  const incassiBase = 2960;
  const incassiMese = incassiBase + orders.reduce((a, o) => a + (o.total || 0), 0);

  const KPI = [
    { label: "Sedute della settimana", value: seduteSettimana, hint: `${booked.length + waitlist.length} dal sito (live)`, color: "#33398F" },
    { label: "Occupazione slot", value: occupazione + "%", hint: `${stations} postazioni attive`, color: "#0E9BB5" },
    { label: "Crediti venduti nel mese", value: creditiVenduti, hint: "pacchetti 5/10 e singole", color: "#F5920B" },
    { label: "Incassi del mese", value: euro(incassiMese), hint: "pacchetti e sedute singole", color: "#22A05A" },
  ];

  const perDay = DAYS.map((d) => {
    const mock = activeMock.filter((b) => lessonById(b.lessonId)?.day === d.key).length;
    const live = [...booked, ...waitlist].filter((id) => lessonById(id)?.day === d.key).length;
    return { giorno: d.short, sedute: mock + live };
  });

  const perCat = Object.entries(CATS).map(([k, c]) => {
    const ls = LESSONS.filter((l) => l.cat === k);
    const pct = ls.length
      ? Math.round((ls.reduce((a, l) => a + Math.min(l.booked, stations) / stations, 0) / ls.length) * 100)
      : 0;
    return { name: c.label, occupazione: pct, color: c.color };
  });

  return (
    <>
      <h1 className="lfdt-admin-h1">Dashboard</h1>
      <p className="lfdt-admin-lead">Panoramica della settimana 6–12 luglio. Dati dimostrativi.</p>

      <div className="lfdt-kpis">
        {KPI.map((k) => (
          <div key={k.label} className="lfdt-kpi">
            <span className="lfdt-kpi-dot" style={{ background: k.color }} />
            <div className="lfdt-kpi-label">{k.label}</div>
            <div className="lfdt-kpi-value">{k.value}</div>
            <div className="lfdt-kpi-hint">{k.hint}</div>
          </div>
        ))}
      </div>

      <div className="lfdt-admin-charts">
        <div className="lfdt-admin-card">
          <h2>Sedute per giorno</h2>
          <div className="lfdt-chart">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={perDay} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E9EAF3" vertical={false} />
                <XAxis dataKey="giorno" tick={{ fontSize: 12, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#6B7280" }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip cursor={{ fill: "#00000008" }} contentStyle={{ borderRadius: 12, border: "1px solid #E5E7EB", fontSize: 13 }} />
                <Bar dataKey="sedute" fill="#33398F" radius={[6, 6, 0, 0]} maxBarSize={38} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lfdt-admin-card">
          <h2>Occupazione per area</h2>
          <div className="lfdt-chart">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={perCat} layout="vertical" margin={{ top: 4, right: 16, left: 8, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E9EAF3" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} unit="%" tick={{ fontSize: 12, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" width={130} tick={{ fontSize: 11.5, fill: "#4B5563" }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: "#00000008" }} formatter={(v) => [v + "%", "Occupazione"]}
                  contentStyle={{ borderRadius: 12, border: "1px solid #E5E7EB", fontSize: 13 }} />
                <Bar dataKey="occupazione" radius={[0, 6, 6, 0]} maxBarSize={22}>
                  {perCat.map((e) => <Cell key={e.name} fill={e.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}
