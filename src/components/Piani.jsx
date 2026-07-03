import { PLANS } from "../data/mockData";

export default function Piani({ coupon, setCoupon, couponOk, applyCoupon, say }) {
  return (
    <main>
      <section className="lfdt-section">
        <h2>Tessere e abbonamenti</h2>
        <p className="lfdt-muted" style={{ maxWidth: "62ch" }}>
          La tessera associativa è annuale e vale 365 giorni dall'emissione: se ti iscrivi a novembre, vale fino a novembre.
          La prima lezione di prova è sempre gratuita. Alcuni corsi e stage hanno un costo dedicato, indicato nella pagina della lezione.
        </p>
        <div className="lfdt-plans">
          {PLANS.map((p) => (
            <div key={p.id} className={`lfdt-plan ${p.hot ? "hot" : ""}`}>
              {p.hot && <div className="lfdt-plan-flag">Il più scelto</div>}
              <h3>{p.name}</h3>
              <div className="lfdt-plan-sub">{p.sub}</div>
              <div className="lfdt-plan-price">
                <span className="euro">€</span>{couponOk && p.id !== "tessera" ? Math.round(+p.price * 0.9) : p.price}
                <span className="per">{p.per}</span>
              </div>
              <p className="lfdt-plan-note">{p.note}</p>
              <button className="lfdt-btn primary full" onClick={() => say("Demo: il pagamento verrà attivato nella versione finale (Stripe / Satispay / in sede).")}>
                Scegli {p.name}
              </button>
            </div>
          ))}
        </div>
        <div className="lfdt-coupon">
          <label htmlFor="coupon">Hai un coupon o una convenzione?</label>
          <div className="lfdt-coupon-row">
            <input id="coupon" value={coupon} onChange={(e) => setCoupon(e.target.value)}
              placeholder="Es. TALENTO10" />
            <button className="lfdt-btn ghost" onClick={applyCoupon}>Applica</button>
          </div>
          {couponOk && <div className="lfdt-coupon-ok">Coupon TALENTO10 attivo · −10% sugli abbonamenti</div>}
        </div>
        <p className="lfdt-rules">Puoi pagare anche in sede: mese, singola lezione, tessera o eventi.
          In casi particolari (metà mese, recupero lezioni) lo staff può emettere un pagamento su misura.</p>
      </section>
    </main>
  );
}
