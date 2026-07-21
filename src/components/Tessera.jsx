import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import NagomiOrbit from "./NagomiOrbit";
import ConfirmButton from "./ConfirmButton";
import { CATS } from "../data/cats";
import { DAYS } from "../data/days";
import { LESSONS } from "../data/lessons";
import { useDemo } from "../store/demoStore";

export default function Tessera() {
  const navigate = useNavigate();
  const { member, subscription, booked, waitlist, cancel } = useDemo();
  const myLessons = useMemo(() => LESSONS.filter((l) => booked.includes(l.id)), [booked]);

  return (
    <main>
      <section className="lfdt-section">
        <h2>La tua tessera</h2>
        <div className="lfdt-card-wrap">
          <div className="lfdt-tessera">
            <div className="lfdt-tessera-arc" aria-hidden="true" />
            <div className="lfdt-tessera-top">
              <NagomiOrbit size={44} spin={false} stroke="#FFFFFF" />
              <span className="lfdt-tessera-type">{member.type}</span>
            </div>
            <div className="lfdt-tessera-name">{member.name}</div>
            <div className="lfdt-tessera-meta">
              <div><span>Tessera n.</span><strong>{member.cardNo}</strong></div>
              <div><span>Emessa</span><strong>{member.issued}</strong></div>
              <div><span>Valida fino</span><strong>{member.validUntil}</strong></div>
            </div>
          </div>

          <div className="lfdt-stack">
            <div className="lfdt-panel">
              <h3>Il tuo abbonamento</h3>
              {subscription ? (
                <p><strong>{subscription.planName}</strong> · attivo fino al {subscription.activeUntil} · rinnovo non automatico</p>
              ) : (
                <p className="lfdt-muted">Nessun abbonamento attivo al momento.</p>
              )}
              <button className="lfdt-btn ghost small" onClick={() => navigate("/piani")}>
                {subscription ? "Rinnova o cambia piano" : "Attiva un abbonamento"}
              </button>
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
                  <ConfirmButton question="Disdici?" confirmLabel="Sì, disdici" onConfirm={() => cancel(l)}>
                    Disdici
                  </ConfirmButton>
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
