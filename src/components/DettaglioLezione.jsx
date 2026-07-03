import Badge from "./Badge";
import { CATS } from "../data/cats";
import { DAYS } from "../data/days";

export default function DettaglioLezione({ open, booked, waitlist, isFull, spotsLeft, onBook, onCancel, onJoinWait, onClose }) {
  return (
    <div className="lfdt-overlay" onClick={onClose}>
      <div className="lfdt-sheet" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true"
        style={{ "--c": CATS[open.cat].color, "--s": CATS[open.cat].soft }}>
        <div className="lfdt-sheet-head">
          <Badge color={CATS[open.cat].color} soft={CATS[open.cat].soft}>{CATS[open.cat].label}</Badge>
          <button className="lfdt-close" onClick={onClose} aria-label="Chiudi">×</button>
        </div>
        <h3 className="lfdt-sheet-title">{open.title}</h3>
        <div className="lfdt-sheet-meta">
          <div><span>Quando</span><strong>{DAYS[open.day].short} {DAYS[open.day].num} luglio · {open.time}</strong></div>
          <div><span>Durata</span><strong>{open.dur} min</strong></div>
          <div><span>Con</span><strong>{open.teacher}</strong></div>
          <div><span>Dove</span><strong>{open.room}</strong></div>
        </div>
        <div className="lfdt-spots">
          {isFull(open)
            ? <>Posti esauriti · <strong>lista d'attesa attiva</strong>. Se qualcuno disdice, il posto passa al primo in lista.</>
            : <><strong>{spotsLeft(open)}</strong> posti disponibili su {open.cap}</>}
        </div>
        {booked.includes(open.id) ? (
          <button className="lfdt-btn ghost full" onClick={() => { onCancel(open); onClose(); }}>Disdici prenotazione</button>
        ) : isFull(open) ? (
          <button className="lfdt-btn primary full" disabled={waitlist.includes(open.id)} onClick={() => onJoinWait(open)}>
            {waitlist.includes(open.id) ? "Sei in lista d'attesa" : "Entra in lista d'attesa"}
          </button>
        ) : (
          <button className="lfdt-btn primary full" onClick={() => onBook(open)}>Prenota il tuo posto</button>
        )}
        <p className="lfdt-rules center">Prenotazioni fino a 12 ore prima · disdetta entro 24 ore</p>
      </div>
    </div>
  );
}
