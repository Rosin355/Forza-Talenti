import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { pop } from "../lib/confetti";
import { DemoContext, couponInfo } from "./demoStore";

const KEY = "lfdt-demo-state";
const VERSION = 2;
const MAX_WEEK = 2;

const DEFAULT_STATE = {
  version: VERSION,
  booked: [4],
  waitlist: [],
  member: { name: "Simonetta Vianello", type: "Socio ordinario", cardNo: "26/142", issued: "15/03/2026", validUntil: "14/03/2027" },
  subscription: { planId: "trimestre", planName: "Trimestrale", activeUntil: "31/08/2026" },
  orders: [],
  cart: null,
  tesseraSeq: 142,
};

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw);
    if (parsed.version !== VERSION) return DEFAULT_STATE;
    return { ...DEFAULT_STATE, ...parsed };
  } catch {
    return DEFAULT_STATE;
  }
}

const pad = (n) => String(n).padStart(2, "0");
const fmtDate = (d) => `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
const addMonths = (d, m) => { const x = new Date(d); x.setMonth(x.getMonth() + m); return x; };

export function DemoProvider({ children }) {
  const navigate = useNavigate();
  const [state, setState] = useState(load);
  const [toast, setToast] = useState(null);
  const [openLesson, setOpenLesson] = useState(null);
  const [day, setDay] = useState(0);
  const [catFilter, setCatFilter] = useState("all");
  const [adminAuthed, setAdminAuthed] = useState(false);
  const toastTimer = useRef(null);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* storage non disponibile */ }
  }, [state]);

  const say = (msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  };

  const spotsLeft = (l) => l.cap - l.booked - (state.booked.includes(l.id) ? 1 : 0);
  const isFull = (l) => l.booked >= l.cap && !state.booked.includes(l.id);

  const book = (l) => {
    if (state.booked.includes(l.id)) return;
    if (state.booked.length >= MAX_WEEK) {
      say("Hai già 2 prenotazioni questa settimana. Disdici una lezione per prenotarne un'altra.");
      return;
    }
    if (isFull(l)) return;
    setState((s) => ({ ...s, booked: [...s.booked, l.id] }));
    say(`Prenotazione confermata · ${l.title}`);
    setOpenLesson(null);
    pop();
  };

  const cancel = (l) => {
    setState((s) => ({ ...s, booked: s.booked.filter((id) => id !== l.id) }));
    say(`Prenotazione disdetta · ${l.title}`);
  };

  const joinWait = (l) => {
    if (state.waitlist.includes(l.id)) return;
    setState((s) => ({ ...s, waitlist: [...s.waitlist, l.id] }));
    say("Sei in lista d'attesa: se si libera un posto ti avvisiamo e sei dentro.");
    setOpenLesson(null);
  };

  const goCal = (cat) => { setCatFilter(cat || "all"); navigate("/calendario"); };

  const startCheckout = (item) => { setState((s) => ({ ...s, cart: item })); navigate("/checkout"); };
  const clearCart = () => setState((s) => ({ ...s, cart: null }));

  const completeOrder = ({ method, couponCode }) => {
    const cart = state.cart;
    if (!cart) return null;
    const price = Number(cart.price) || 0;
    const c = couponInfo(couponCode);
    const couponApplies = c.ok && !(cart.kind === "plan" && cart.id === "tessera");
    const discount = couponApplies ? Math.round(price * c.rate) : 0;
    const total = price - discount;
    const now = new Date();
    const order = {
      no: 1043 + state.orders.length,
      date: fmtDate(now),
      name: cart.name,
      kind: cart.kind,
      method,
      subtotal: price,
      discount,
      total,
      coupon: couponApplies ? c.code : null,
      issuedTessera: cart.kind === "plan" && cart.id === "tessera",
    };

    setState((s) => {
      const next = { ...s, orders: [order, ...s.orders], cart: null };
      if (cart.kind === "plan" && cart.id === "tessera") {
        const seq = s.tesseraSeq + 1;
        const yy = String(now.getFullYear()).slice(2);
        next.tesseraSeq = seq;
        next.member = { ...s.member, cardNo: `${yy}/${seq}`, issued: fmtDate(now), validUntil: fmtDate(addMonths(now, 12)) };
      } else if (cart.kind === "plan") {
        const months = cart.id === "mensile" ? 1 : cart.id === "trimestre" ? 3 : cart.id === "semestre" ? 6 : 0;
        next.subscription = { planId: cart.id, planName: cart.name, activeUntil: fmtDate(addMonths(now, months)) };
      } else if (cart.kind === "event" && cart.lessonId && !s.booked.includes(cart.lessonId)) {
        next.booked = [...s.booked, cart.lessonId];
      }
      return next;
    });
    return order;
  };

  const resetDemo = () => {
    try { localStorage.removeItem(KEY); } catch { /* storage non disponibile */ }
    setState(DEFAULT_STATE);
    setOpenLesson(null);
    setDay(0);
    setCatFilter("all");
    setAdminAuthed(false);
    say("Demo reimpostata ai valori iniziali.");
  };

  const login = (email, pwd) => {
    const ok = email.trim().toLowerCase() === "admin@lfdt.demo" && pwd === "demo2026";
    if (ok) setAdminAuthed(true);
    return ok;
  };
  const logout = () => setAdminAuthed(false);

  const value = {
    ...state,
    maxWeek: MAX_WEEK,
    weekCount: state.booked.length,
    toast, say,
    openLesson, openSheet: setOpenLesson, closeSheet: () => setOpenLesson(null),
    day, setDay, catFilter, setCatFilter,
    spotsLeft, isFull, book, cancel, joinWait,
    goCal, startCheckout, clearCart, completeOrder, resetDemo,
    couponInfo,
    adminAuthed, login, logout,
  };
  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}
