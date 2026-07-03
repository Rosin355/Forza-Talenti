import { useEffect, useState } from "react";

const onlyDigits = (s) => s.replace(/\D/g, "");
const groupCard = (s) => onlyDigits(s).slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ").trim();
const fmtExp = (s) => {
  const d = onlyDigits(s).slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
};

export default function CardForm({ onValidChange }) {
  const [number, setNumber] = useState("4242 4242 4242 4242");
  const [exp, setExp] = useState("12/28");
  const [cvc, setCvc] = useState("123");

  const numOk = onlyDigits(number).length === 16;
  const [mm, aa] = exp.split("/");
  const expOk = /^\d{2}$/.test(mm || "") && Number(mm) >= 1 && Number(mm) <= 12 && /^\d{2}$/.test(aa || "");
  const cvcOk = /^\d{3}$/.test(cvc);
  const valid = numOk && expOk && cvcOk;

  useEffect(() => { onValidChange(valid); }, [valid, onValidChange]);

  return (
    <div className="lfdt-card-form">
      <div className="lfdt-demo-warn" role="note">
        <strong>Ambiente demo</strong> — non inserire dati di carte reali. Nessun pagamento viene elaborato.
      </div>
      <label className="lfdt-field">
        <span>Numero carta</span>
        <input inputMode="numeric" autoComplete="off" value={number} aria-invalid={!numOk}
          onChange={(e) => setNumber(groupCard(e.target.value))} placeholder="4242 4242 4242 4242" />
      </label>
      <div className="lfdt-field-row">
        <label className="lfdt-field">
          <span>Scadenza</span>
          <input inputMode="numeric" value={exp} aria-invalid={!expOk}
            onChange={(e) => setExp(fmtExp(e.target.value))} placeholder="MM/AA" />
        </label>
        <label className="lfdt-field">
          <span>CVC</span>
          <input inputMode="numeric" value={cvc} aria-invalid={!cvcOk}
            onChange={(e) => setCvc(onlyDigits(e.target.value).slice(0, 3))} placeholder="123" />
        </label>
      </div>
      {!valid && <p className="lfdt-field-hint">Completa numero (16 cifre), scadenza MM/AA e CVC (3 cifre) per proseguire.</p>}
    </div>
  );
}
