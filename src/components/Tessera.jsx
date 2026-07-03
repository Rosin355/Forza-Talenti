import TalentRing from "./TalentRing";
import { CATS, DAYS, LESSONS } from "../data/mockData";

export default function Tessera({ myLessons, waitlist, onCancel, setTab }) {
  return (
    <main>
      <section className="lfdt-section">
        <h2>La tua tessera</h2>
        <div className="lfdt-card-wrap">
          <div className="lfdt-tessera">
            <div className="lfdt-tessera-arc" aria-hidden="true" />
            <div className="lfdt-tessera-top">
              <TalentRing size={44} spin={false} />
              <span className="lfdt-tessera-type">Socio ordinario</span>
            </div>
            <div className="lfdt-tessera-name">Aurora Talenti</div>
            <div className="lfdt-tessera-meta">
              <div><span>Tessera n.</span><strong>26/142</strong></div>
              <div><span>Emessa</span><strong>15/03/2026</strong></div>
              <div><span>Valida fino</span><strong>14/03/2027</strong></div>
            </div>
          </div>

          <div className="lfdt-stack">
            <div className="lfdt-panel">
              <h3>Il tuo abbonamento</h3>
              <p><strong>Trimestrale</strong> · attivo fino al 31/08/2026 · rinnovo non automatico</p>
              <button className="lfdt-btn ghost small" onClick={() => setTab("piani")}>Rinnova o cambia piano</button>
            </div>
            <div className="lfdt-panel">
              <h3>Le tue prenotazioni</h3>
              {myLessons.length === 0 && <p className="lfdt-muted">Non hai lezioni prenotate. Il calendario ti aspetta.</p>}
              {myLessons.map((l) => (
                <div key={l.id} className="lfdt-mybooking">
                  <span className="lfdt-dot" style={{ background: CATS[l.cat].color }} />
                  <div className="grow">
                    <strong>{l.title}</strong>
                    <div className="lfdt-muted">{DAYS[l.day].short} {DAYS[l.day].num} luglio · {l.time} · {l.room}</div>
                  </div>
                  <button className="lfdt-link danger" onClick={() => onCancel(l)}>Disdici</button>
                </div>
              ))}
              {waitlist.length > 0 && (
                <p className="lfdt-muted" style={{ marginTop: 10 }}>
                  In lista d'attesa: {waitlist.map((id) => LESSONS.find((l) => l.id === id)?.title).join(", ")}.
                  Se si libera un posto ti avvisiamo e la prenotazione è automatica.
                </p>
              )}
            </div>
            <div className="lfdt-panel">
              <h3>I tuoi vantaggi</h3>
              <p className="lfdt-muted">Con la tessera attiva hai accesso alle convenzioni con le realtà amiche del territorio
                e ai coupon riservati ai soci. Mostra la tessera digitale in sede per gli eventi aperti.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
