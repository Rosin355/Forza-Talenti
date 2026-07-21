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
  const { member, subscription, credits, booked, waitlist, cancel } = useDemo();
  const mySlots = useMemo(() => LESSONS.filter((l) => booked.includes(l.id)), [booked]);

  return (
    <main>
      <section className="lfdt-section">
        <h2>La tua tessera</h2>
        <div className="lfdt-card-wrap">
          <div className="lfdt-tessera">
            <div className="lfdt-tessera-arc" aria-hidden="true" />
            <div className="lfdt-tessera-top">
              <NagomiOrbit size={44} spin={false} stroke="#FFFFFF" />
              <span className="lfdt-tessera-type">Nagomi Lab · Tessera socio</span>
            </div>
            <div className="lfdt-tessera-name">{member.name}</div>
            <div className="lfdt-tessera-meta">
              <div><span>Tessera n.</span><strong>{member.cardNo}</strong></div>
              <div><span>Crediti</span><strong>{credits}</strong></div>
              <div><span>Valida fino</span><strong>{member.validUntil}</strong></div>
            </div>
          </div>

          <div className="lfdt-stack">
            <div className="lfdt-panel">
              <h3>I tuoi crediti</h3>
              {credits > 0 ? (
                <p><strong>{credits}</strong> {credits === 1 ? "seduta residua" : "sedute residue"} · un credito viene
                  scalato in automatico a ogni prenotazione.</p>
              ) : subscription ? (
                <p><strong>{subscription.planName}</strong> · attivo fino al {subscription.activeUntil} · max 1 seduta al giorno</p>
              ) : (
                <p className="lfdt-muted">Nessun credito attivo. La prima seduta conoscitiva è gratuita;
                  per proseguire scegli un pacchetto.</p>
              )}
              <button className="lfdt-btn ghost small" onClick={() => navigate("/piani")}>
                {credits > 0 || subscription ? "Ricarica o cambia pacchetto" : "Scopri i pacchetti"}
              </button>
            </div>
            <div className="lfdt-panel">
              <h3>Le tue sedute</h3>
              {mySlots.length === 0 && <p className="lfdt-muted">Non hai sedute prenotate. Le disponibilità ti aspettano.</p>}
              {mySlots.map((l) => (
                <div key={l.id} className="lfdt-mybooking">
                  <span className="lfdt-dot" style={{ background: CATS[l.cat].color }} />
                  <div className="grow">
                    <strong>{l.title}</strong>
                    <div className="lfdt-muted">{DAYS[l.day].short} {DAYS[l.day].num} luglio · {l.time} · {l.teacher}</div>
                  </div>
                  <ConfirmButton question="Disdici?" confirmLabel="Sì, disdici" onConfirm={() => cancel(l)}>
                    Disdici
                  </ConfirmButton>
                </div>
              ))}
              {waitlist.length > 0 && (
                <p className="lfdt-muted" style={{ marginTop: 10 }}>
                  In lista d'attesa: {waitlist.map((id) => {
                    const l = LESSONS.find((x) => x.id === id);
                    return l ? `${DAYS[l.day].short} ${l.time}` : null;
                  }).filter(Boolean).join(", ")}.
                  Se si libera una postazione ti avvisiamo e la prenotazione è automatica.
                </p>
              )}
            </div>
            <div className="lfdt-panel">
              <h3>I tuoi vantaggi</h3>
              <p className="lfdt-muted">Con la tessera attiva hai i coupon riservati ai soci e le convenzioni
                con le realtà amiche del territorio. Mostra la tessera digitale in sede agli open day.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
