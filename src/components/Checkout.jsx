import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TalentRing from "./TalentRing";
import CardForm from "./CardForm";
import { useDemo, couponInfo } from "../store/demoStore";
import { celebrate } from "../lib/confetti";

const STEPS = ["Riepilogo", "Dati", "Pagamento", "Conferma"];
const METHODS = [
  { id: "carta", label: "Carta" },
  { id: "satispay", label: "Satispay" },
  { id: "sede", label: "In sede" },
];
const METHOD_LABEL = { carta: "Carta", satispay: "Satispay", sede: "In sede" };

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, member, completeOrder } = useDemo();

  const [step, setStep] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [name, setName] = useState(member.name);
  const [email, setEmail] = useState("");
  const [method, setMethod] = useState("carta");
  const [cardValid, setCardValid] = useState(true);
  const [order, setOrder] = useState(null);

  useEffect(() => { if (step === 3) celebrate(); }, [step]);

  if (!cart && !order) {
    return (
      <main>
        <section className="lfdt-section">
          <h2>Checkout</h2>
          <div className="lfdt-empty">Il carrello è vuoto. Scegli un piano o uno stage per iniziare.</div>
          <button className="lfdt-btn primary" style={{ marginTop: 14 }} onClick={() => navigate("/piani")}>Vai ai piani</button>
        </section>
      </main>
    );
  }

  const isTessera = cart?.kind === "plan" && cart?.id === "tessera";
  const price = Number(cart?.price) || 0;
  const rate = couponApplied && !isTessera ? couponInfo(couponCode).rate : 0;
  const discount = Math.round(price * rate);
  const total = price - discount;

  const applyCoupon = () => setCouponApplied(couponInfo(couponCode).ok);
  const dataValid = name.trim() && email.trim();

  const pay = () => {
    const o = completeOrder({ method, couponCode: couponApplied ? couponCode : "" });
    if (o) { setOrder(o); setStep(3); }
  };

  return (
    <main>
      <section className="lfdt-section">
        <h2>{step === 3 ? "Fatto!" : "Checkout"}</h2>

        {step < 3 && (
          <ol className="lfdt-steps-nav" aria-label="Fasi del checkout">
            {STEPS.slice(0, 3).map((label, i) => (
              <li key={label} className={`lfdt-step-item ${i === step ? "on" : ""} ${i < step ? "done" : ""}`}>
                <span className="lfdt-step-dot">{i < step ? "✓" : i + 1}</span>
                <span className="lfdt-step-label">{label}</span>
              </li>
            ))}
          </ol>
        )}

        {/* STEP 1 — RIEPILOGO */}
        {step === 0 && (
          <div className="lfdt-checkout-grid">
            <div className="lfdt-panel">
              <h3>Il tuo ordine</h3>
              <div className="lfdt-order-item">
                <div className="grow">
                  <strong>{cart.name}</strong>
                  {cart.sub && <div className="lfdt-muted">{cart.sub}</div>}
                </div>
                <span className="lfdt-order-price">€{price}</span>
              </div>
              <div className="lfdt-coupon" style={{ marginTop: 18 }}>
                <label htmlFor="ck-coupon">Hai un coupon?</label>
                <div className="lfdt-coupon-row">
                  <input id="ck-coupon" value={couponCode} onChange={(e) => { setCouponCode(e.target.value); setCouponApplied(false); }}
                    placeholder="Es. TALENTO10" />
                  <button className="lfdt-btn ghost" onClick={applyCoupon}>Applica</button>
                </div>
                {couponApplied && !isTessera && <div className="lfdt-coupon-ok">Coupon {couponInfo(couponCode).code} attivo · −10%</div>}
                {couponApplied && isTessera && <div className="lfdt-field-hint">Il coupon non è applicabile alla tessera associativa.</div>}
              </div>
            </div>
            <div className="lfdt-panel lfdt-totals">
              <div className="lfdt-total-row"><span>Subtotale</span><span>€{price}</span></div>
              {discount > 0 && <div className="lfdt-total-row disc"><span>Sconto</span><span>−€{discount}</span></div>}
              <div className="lfdt-total-row grand"><span>Totale</span><span>€{total}</span></div>
              <button className="lfdt-btn primary full" onClick={() => setStep(1)}>Continua</button>
              <button className="lfdt-link" style={{ marginTop: 12 }} onClick={() => navigate("/piani")}>← Torna ai piani</button>
            </div>
          </div>
        )}

        {/* STEP 2 — DATI */}
        {step === 1 && (
          <div className="lfdt-checkout-narrow">
            <div className="lfdt-panel">
              <h3>I tuoi dati</h3>
              <label className="lfdt-field">
                <span>Nome e cognome</span>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome e cognome" />
              </label>
              <label className="lfdt-field">
                <span>Email</span>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="nome@esempio.it" />
              </label>
              {!dataValid && <p className="lfdt-field-hint">Inserisci nome ed email per proseguire.</p>}
            </div>
            <div className="lfdt-checkout-actions">
              <button className="lfdt-btn ghost" onClick={() => setStep(0)}>Indietro</button>
              <button className="lfdt-btn primary" disabled={!dataValid} onClick={() => setStep(2)}>Continua</button>
            </div>
          </div>
        )}

        {/* STEP 3 — PAGAMENTO */}
        {step === 2 && (
          <div className="lfdt-checkout-narrow">
            <div className="lfdt-panel">
              <h3>Come vuoi pagare?</h3>
              <div className="lfdt-methods" role="radiogroup" aria-label="Metodo di pagamento">
                {METHODS.map((m) => (
                  <button key={m.id} role="radio" aria-checked={method === m.id}
                    className={`lfdt-method ${method === m.id ? "on" : ""}`} onClick={() => setMethod(m.id)}>
                    {m.label}
                  </button>
                ))}
              </div>

              {method === "carta" && <CardForm onValidChange={setCardValid} />}
              {method === "satispay" && (
                <p className="lfdt-muted lfdt-method-note">Riceverai una richiesta di pagamento sull'app Satispay.
                  In questa demo la confermiamo per te.</p>
              )}
              {method === "sede" && (
                <p className="lfdt-muted lfdt-method-note">Perfetto: salderai <strong>€{total}</strong> in sede alla prossima visita.
                  Registriamo subito la tua richiesta.</p>
              )}
            </div>
            <div className="lfdt-checkout-actions">
              <button className="lfdt-btn ghost" onClick={() => setStep(1)}>Indietro</button>
              <button className="lfdt-btn primary" disabled={method === "carta" && !cardValid} onClick={pay}>
                {method === "sede" ? "Conferma richiesta" : method === "satispay" ? "Conferma €" + total : "Paga €" + total}
              </button>
            </div>
          </div>
        )}

        {/* STEP 4 — CONFERMA */}
        {step === 3 && order && (
          <div className="lfdt-success">
            <div className="lfdt-check" aria-hidden="true"><span>✓</span></div>
            <h3>
              {order.method === "carta" ? "Pagamento confermato" :
               order.method === "satispay" ? "Richiesta Satispay inviata" : "Richiesta registrata"}
            </h3>
            <p className="lfdt-muted">Grazie {name.split(" ")[0]}! {order.issuedTessera
              ? "La tua tessera è attiva: bentornata nel cerchio."
              : "Trovi il riepilogo qui sotto e nella tua area tessera."}</p>

            <div className="lfdt-receipt">
              <div className="lfdt-receipt-head">
                <strong>Ricevuta</strong>
                <span>Ordine n. {order.no} · {order.date}</span>
              </div>
              <div className="lfdt-total-row"><span>{order.name}</span><span>€{order.subtotal}</span></div>
              {order.discount > 0 && <div className="lfdt-total-row disc"><span>Sconto {order.coupon}</span><span>−€{order.discount}</span></div>}
              <div className="lfdt-total-row"><span>Metodo</span><span>{METHOD_LABEL[order.method]}</span></div>
              <div className="lfdt-total-row grand">
                <span>{order.method === "sede" ? "Da saldare in sede" : "Totale pagato"}</span><span>€{order.total}</span>
              </div>
            </div>

            {order.issuedTessera && (
              <div className="lfdt-tessera lfdt-tessera-mini">
                <div className="lfdt-tessera-arc" aria-hidden="true" />
                <div className="lfdt-tessera-top">
                  <TalentRing size={38} spin={false} />
                  <span className="lfdt-tessera-type">{member.type}</span>
                </div>
                <div className="lfdt-tessera-name">{member.name}</div>
                <div className="lfdt-tessera-meta">
                  <div><span>Tessera n.</span><strong>{member.cardNo}</strong></div>
                  <div><span>Valida fino</span><strong>{member.validUntil}</strong></div>
                </div>
              </div>
            )}

            <div className="lfdt-checkout-actions center">
              <button className="lfdt-btn ghost" onClick={() => navigate("/")}>Torna alla home</button>
              <button className="lfdt-btn primary" onClick={() => navigate("/tessera")}>Vai alla tessera</button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
