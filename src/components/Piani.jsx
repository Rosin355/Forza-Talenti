import { useState } from "react";
import { PLANS } from "../data/plans";
import { useDemo, couponInfo } from "../store/demoStore";

export default function Piani() {
  const { startCheckout, goCal, say } = useDemo();
  const [coupon, setCoupon] = useState("");
  const [couponOk, setCouponOk] = useState(false);

  const applyCoupon = () => {
    if (couponInfo(coupon).ok) { setCouponOk(true); say("Coupon applicato: −10% sui pacchetti."); }
    else say("Codice non riconosciuto. Controlla il coupon e riprova.");
  };

  const choose = (p) => {
    if (p.id === "conoscitiva") {
      say("La conoscitiva è gratuita: scegli lo slot che preferisci dal calendario.");
      goCal();
      return;
    }
    startCheckout({ kind: "plan", id: p.id, name: p.name, price: Number(p.price), sub: p.sub, credits: p.credits || 0 });
  };

  return (
    <main>
      <section className="lfdt-section">
        <h2>Pacchetti di sedute</h2>
        <p className="lfdt-muted" style={{ maxWidth: "62ch" }}>
          Ogni seduta vale un credito: i crediti si acquistano in pacchetti e vengono scalati
          automaticamente a ogni prenotazione. La prima seduta conoscitiva è sempre gratuita,
          e puoi pagare anche in sede.
        </p>
        <div className="lfdt-plans">
          {PLANS.map((p) => (
            <div key={p.id} className={`lfdt-plan ${p.hot ? "hot" : ""}`}>
              {p.hot && <div className="lfdt-plan-flag">Il più scelto</div>}
              <h3>{p.name}</h3>
              <div className="lfdt-plan-sub">{p.sub}</div>
              <div className="lfdt-plan-price">
                {Number(p.price) === 0 ? (
                  <>Gratis</>
                ) : (
                  <>
                    <span className="euro">€</span>{couponOk ? Math.round(+p.price * 0.9) : p.price}
                    <span className="per">{p.per}</span>
                  </>
                )}
              </div>
              <p className="lfdt-plan-note">{p.note}</p>
              <button className="lfdt-btn primary full" onClick={() => choose(p)}>
                {p.id === "conoscitiva" ? "Prenota la conoscitiva" : `Scegli ${p.name}`}
              </button>
            </div>
          ))}
        </div>
        <div className="lfdt-coupon">
          <label htmlFor="coupon">Hai un coupon o una convenzione?</label>
          <div className="lfdt-coupon-row">
            <input id="coupon" value={coupon} onChange={(e) => setCoupon(e.target.value)}
              placeholder="Es. NAGOMI10" />
            <button className="lfdt-btn ghost" onClick={applyCoupon}>Applica</button>
          </div>
          {couponOk && <div className="lfdt-coupon-ok">Coupon NAGOMI10 attivo · −10% sui pacchetti</div>}
        </div>
        <p className="lfdt-rules">I crediti non hanno vincolo d'orario: valgono su qualunque slot disponibile.
          Per esigenze particolari (aziende, convenzioni, cicli personalizzati) scrivici: prepariamo un
          preventivo su misura.</p>
      </section>
    </main>
  );
}
