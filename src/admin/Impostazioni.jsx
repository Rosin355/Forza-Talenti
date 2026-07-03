const ROLES = [
  {
    name: "Admin Master", tone: "#8B5CF6", active: true,
    desc: "Controllo completo del gestionale.",
    perms: ["Gestione soci e tessere", "Modifica corsi e capienze", "Incassi e report", "Gestione ruoli e permessi"],
  },
  {
    name: "Collaboratori", tone: "#0EA5B7", active: false,
    desc: "Gestione operativa quotidiana, senza area amministrativa.",
    perms: ["Prenotazioni e liste d'attesa", "Check-in in sala", "Modifica calendario lezioni", "Nessun accesso agli incassi"],
  },
  {
    name: "Staff member", tone: "#F97316", active: false,
    desc: "Accesso in sola lettura per gli insegnanti.",
    perms: ["Vista delle proprie lezioni", "Elenco iscritti alla lezione", "Nessuna modifica ai dati", "Nessun accesso ai soci"],
  },
];

export default function Impostazioni() {
  return (
    <>
      <h1 className="lfdt-admin-h1">Impostazioni</h1>
      <p className="lfdt-admin-lead">Account, ruoli e permessi. In questa demo i ruoli sono illustrativi.</p>

      <div className="lfdt-admin-card" style={{ marginBottom: 18 }}>
        <h2>Account</h2>
        <div className="lfdt-account-row">
          <div className="lfdt-admin-avatar big" aria-hidden="true">AM</div>
          <div>
            <strong>Staff Demo</strong>
            <div className="lfdt-admin-muted">admin@lfdt.demo</div>
          </div>
          <span className="lfdt-admin-role">Admin Master</span>
        </div>
      </div>

      <h2 className="lfdt-admin-h2">Livelli di accesso previsti</h2>
      <div className="lfdt-roles">
        {ROLES.map((r) => (
          <div key={r.name} className={`lfdt-role ${r.active ? "on" : ""}`} style={{ "--c": r.tone }}>
            <div className="lfdt-role-head">
              <span className="lfdt-role-dot" />
              <strong>{r.name}</strong>
              {r.active ? <span className="lfdt-pill ok">Attivo</span> : <span className="lfdt-pill soon">In arrivo</span>}
            </div>
            <p className="lfdt-admin-muted">{r.desc}</p>
            <ul className="lfdt-role-perms">
              {r.perms.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </div>
        ))}
      </div>
      <p className="lfdt-admin-note">La gestione granulare dei permessi sarà disponibile nella versione finale del gestionale.</p>
    </>
  );
}
