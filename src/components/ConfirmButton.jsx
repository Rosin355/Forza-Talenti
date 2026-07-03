import { useState } from "react";

/* Conferma inline a due tempi (accessibile, niente window.confirm).
   Primo click → chiede conferma; conferma → esegue; annulla → torna indietro. */
export default function ConfirmButton({ onConfirm, children, confirmLabel = "Confermi?",
  className = "lfdt-link danger", question = "Sei sicuro?" }) {
  const [asking, setAsking] = useState(false);

  if (asking) {
    return (
      <span className="lfdt-confirm" role="group" aria-label={question}>
        <span className="lfdt-confirm-q">{question}</span>
        <button className="lfdt-link danger" onClick={() => { setAsking(false); onConfirm(); }}>
          {confirmLabel}
        </button>
        <button className="lfdt-link muted" onClick={() => setAsking(false)}>Annulla</button>
      </span>
    );
  }
  return (
    <button className={className} onClick={() => setAsking(true)}>{children}</button>
  );
}
