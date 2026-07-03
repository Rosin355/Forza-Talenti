import Badge from "./Badge";
import ConfirmButton from "./ConfirmButton";
import { CATS } from "../data/cats";
import { DAYS } from "../data/days";
import { useDemo } from "../store/demoStore";

export default function DettaglioLezione() {
  const { openLesson: open, closeSheet, booked, waitlist, isFull, spotsLeft,
    book, cancel, joinWait, startCheckout } = useDemo();
  if (!open) return null;

  const cat = CATS[open.cat];
  const mine = booked.includes(open.id);
  const paid = open.price != null;
  const when = `${DAYS[open.day].short} ${DAYS[open.day].num} luglio · ${open.time}`;

  const buy = () => {
    startCheckout({ kind: "event", id: `event-${open.id}`, lessonId: open.id, name: open.title, price: open.price, sub: when });
    closeSheet();
  };

  return (
    <div className="lfdt-overlay" onClick={closeSheet}>
      <div className="lfdt-sheet" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true"
        style={{ "--c": cat.color, "--s": cat.soft }}>
        <div className="lfdt-sheet-head">
          <Badge color={cat.color} soft={cat.soft}>{cat.label}</Badge>
          <button className="lfdt-close" onClick={closeSheet} aria-label="Chiudi">×</button>
        </div>
        <h3 className="lfdt-sheet-title">{open.title}</h3>
        <div className="lfdt-sheet-meta">
          <div><span>Quando</span><strong>{when}</strong></div>
          <div><span>Durata</span><strong>{open.dur} min</strong></div>
          <div><span>Con</span><strong>{open.teacher}</strong></div>
          <div><span>Dove</span><strong>{open.room}</strong></div>
        </div>
        <div className="lfdt-spots">
          {paid
            ? <>Stage a contributo dedicato · <strong>€{open.price}</strong>. La tessera resta necessaria per partecipare.</>
            : isFull(open)
              ? <>Posti esauriti · <strong>lista d'attesa attiva</strong>. Se qualcuno disdice, il posto passa al primo in lista.</>
              : <><strong>{spotsLeft(open)}</strong> posti disponibili su {open.cap}</>}
        </div>

        {mine ? (
          <ConfirmButton className="lfdt-btn ghost full" question="Disdici questa prenotazione?"
            confirmLabel="Sì, disdici" onConfirm={() => { cancel(open); closeSheet(); }}>
            Disdici prenotazione
          </ConfirmButton>
        ) : paid ? (
          <button className="lfdt-btn primary full" onClick={buy}>Acquista il posto — €{open.price}</button>
        ) : isFull(open) ? (
          <button className="lfdt-btn primary full" disabled={waitlist.includes(open.id)} onClick={() => joinWait(open)}>
            {waitlist.includes(open.id) ? "Sei in lista d'attesa" : "Entra in lista d'attesa"}
          </button>
        ) : (
          <button className="lfdt-btn primary full" onClick={() => book(open)}>Prenota il tuo posto</button>
        )}
        <p className="lfdt-rules center">Prenotazioni fino a 12 ore prima · disdetta entro 24 ore</p>
      </div>
    </div>
  );
}
