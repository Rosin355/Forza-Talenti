import Badge from "./Badge";
import { CATS } from "../data/cats";
import { useDemo } from "../store/demoStore";

/* ---------- card lezione ---------- */
export default function LessonCard({ l }) {
  const { booked, waitlist, isFull, spotsLeft, openSheet } = useDemo();
  const c = CATS[l.cat];
  const mine = booked.includes(l.id);
  return (
    <button className="lfdt-lesson" style={{ "--c": c.color, "--s": c.soft }} onClick={() => openSheet(l)}>
      <div className="lfdt-lesson-time">
        <strong>{l.time}</strong>
        <span>{l.dur}′</span>
      </div>
      <div className="lfdt-lesson-bar" aria-hidden="true" />
      <div className="lfdt-lesson-body">
        <div className="lfdt-lesson-toprow">
          <Badge color={c.color} soft={c.soft}>{c.label}</Badge>
          {mine && <Badge color="#22A05A" soft="#E9F7EF">Prenotata ✓</Badge>}
          {!mine && isFull(l) && <Badge color="#8A8578" soft="#F1EFE9">Lista d'attesa</Badge>}
          {!mine && waitlist.includes(l.id) && <Badge color="#D9A400" soft="#FBF4DC">In attesa</Badge>}
          {l.price != null && <Badge color="#22A05A" soft="#E9F7EF">€{l.price}</Badge>}
        </div>
        <div className="lfdt-lesson-title">{l.title}</div>
        <div className="lfdt-lesson-sub">{l.teacher} · {l.room}{!isFull(l) && !mine ? ` · ${spotsLeft(l)} posti` : ""}</div>
      </div>
      <span className="lfdt-lesson-go">→</span>
    </button>
  );
}
