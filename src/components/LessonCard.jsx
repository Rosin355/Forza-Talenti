import Badge from "./Badge";
import { CATS } from "../data/cats";
import { useDemo } from "../store/demoStore";

/* ---------- card slot seduta ---------- */
export default function LessonCard({ l }) {
  const { booked, waitlist, isFull, spotsLeft, openSheet } = useDemo();
  const c = CATS[l.cat];
  const mine = booked.includes(l.id);
  const left = spotsLeft(l);
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
          {mine ? (
            <Badge color="#22A05A" soft="#E9F7EF">Prenotata ✓</Badge>
          ) : isFull(l) ? (
            waitlist.includes(l.id)
              ? <Badge color="#B87400" soft="#FEF9E1">In lista d'attesa</Badge>
              : <Badge color="#8A8578" soft="#F1EFE9">Lista d'attesa</Badge>
          ) : left === 1 ? (
            <Badge color="#B87400" soft="#FEF9E1">Ultimo posto</Badge>
          ) : (
            <Badge color="#22A05A" soft="#E9F7EF">Disponibile</Badge>
          )}
          {l.price != null && <Badge color="#33398F" soft="#EDEEF9">€{l.price}</Badge>}
        </div>
        <div className="lfdt-lesson-title">{l.title}</div>
        <div className="lfdt-lesson-sub">{l.teacher} · {l.room}</div>
      </div>
      <span className="lfdt-lesson-go">→</span>
    </button>
  );
}
