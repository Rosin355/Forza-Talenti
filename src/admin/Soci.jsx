import { useState } from "react";
import { MEMBERS } from "../data/members";

const statusClass = (s) => (s === "Attivo" ? "ok" : s === "In scadenza" ? "wait" : "off");

export default function Soci() {
  const [q, setQ] = useState("");
  const [tipoF, setTipoF] = useState("all");

  const filtered = MEMBERS.filter((m) =>
    (tipoF === "all" || m.type === tipoF) &&
    (q.trim() === "" || m.name.toLowerCase().includes(q.trim().toLowerCase()) || m.cardNo.includes(q.trim()))
  );

  return (
    <>
      <h1 className="lfdt-admin-h1">Soci</h1>
      <p className="lfdt-admin-lead">{MEMBERS.length} tesserati. Pacchetto attivo, crediti residui e stato.</p>

      <div className="lfdt-admin-filters">
        <label>Cerca
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Nome o n. tessera" />
        </label>
        <label>Tipo
          <select value={tipoF} onChange={(e) => setTipoF(e.target.value)}>
            <option value="all">Tutti</option>
            <option value="Ordinario">Ordinario</option>
            <option value="Onorario">Onorario</option>
          </select>
        </label>
        <span className="lfdt-admin-count">{filtered.length} risultati</span>
      </div>

      <div className="lfdt-atable-wrap">
        <table className="lfdt-atable">
          <thead>
            <tr>
              <th>Tessera</th><th>Socio</th><th>Tipo</th><th>Pacchetto attivo</th>
              <th className="num">Crediti residui</th><th>Stato</th><th>Scadenza</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((m) => (
              <tr key={m.id}>
                <td className="mono">{m.cardNo}</td>
                <td>{m.name}</td>
                <td>{m.type === "Onorario" ? <span className="lfdt-pill hon">Onorario</span> : "Ordinario"}</td>
                <td>{m.plan}</td>
                <td className="num">{m.credits > 0 ? <strong>{m.credits}</strong> : "—"}</td>
                <td><span className={`lfdt-pill ${statusClass(m.status)}`}>{m.status}</span></td>
                <td>{m.expiry}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
