import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { pop } from "../lib/confetti";
import { STATIONS } from "../data/lessons";
import { DAYS } from "../data/days";
import { DemoContext, couponInfo } from "./demoStore";

const KEY = "nagomi-demo-state";
const VERSION = 3;

const DEFAULT_STATE = {
  version: VERSION,
  booked: [],
  waitlist: [],
  creditBookings: [],
  credits: 0,
  member: { name: "Simonetta Vianello", type: "Tessera socio", cardNo: "26/142", issued: "15/03/2026", validUntil: "14/03/2027" },
  subscription: null,
  orders: [],
  cart: null,
  tesseraSeq: 142,
  stations: STATIONS,
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

  /* la capienza reale di uno slot è il numero di postazioni del centro */
  const capOf = () => state.stations;
  const spotsLeft = (l) => Math.max(0, capOf(l) - l.booked - (state.booked.includes(l.id) ? 1 : 0));
  const isFull = (l) => l.booked >= capOf(l) && !state.booked.includes(l.id);

  const slotLabel = (l) => `${DAYS[l.day].short} ${DAYS[l.day].num} · ${l.time}`;

  const book = (l) => {
    if (state.booked.includes(l.id) || isFull(l)) return;
    const usesCredit = state.credits > 0;
    setState((s) => ({
      ...s,
      booked: [...s.booked, l.id],
      credits: usesCredit ? s.credits - 1 : s.credits,
      creditBookings: usesCredit ? [...s.creditBookings, l.id] : s.creditBookings,
    }));
    say(usesCredit
      ? `Seduta prenotata · ${slotLabel(l)} · crediti residui: ${state.credits - 1}`
      : `Seduta prenotata · ${slotLabel(l)}`);
    setOpenLesson(null);
    pop();
  };

  const cancel = (l) => {
    const refund = state.creditBookings.includes(l.id);
    setState((s) => ({
      ...s,
      booked: s.booked.filter((id) => id !== l.id),
      creditBookings: s.creditBookings.filter((id) => id !== l.id),
      credits: refund ? s.credits + 1 : s.credits,
    }));
    say(refund
      ? `Seduta disdetta · ${slotLabel(l)} · credito riaccreditato`
      : `Seduta disdetta · ${slotLabel(l)}`);
  };

  const joinWait = (l) => {
    if (state.waitlist.includes(l.id)) return;
    setState((s) => ({ ...s, waitlist: [...s.waitlist, l.id] }));
    say("Sei in lista d'attesa: se si libera una postazione ti avvisiamo e sei dentro.");
    setOpenLesson(null);
  };

  const goCal = (cat) => { setCatFilter(cat || "all"); navigate("/calendario"); };

  const startCheckout = (item) => { setState((s) => ({ ...s, cart: item })); navigate("/checkout"); };
  const clearCart = () => setState((s) => ({ ...s, cart: null }));

  const setStations = (n) => setState((s) => ({ ...s, stations: Math.max(1, Math.min(6, n)) }));

  const completeOrder = ({ method, couponCode }) => {
    const cart = state.cart;
    if (!cart) return null;
    const price = Number(cart.price) || 0;
    const c = couponInfo(couponCode);
    const couponApplies = c.ok && price > 0;
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
      credits: cart.credits || 0,
    };

    setState((s) => {
      const next = { ...s, orders: [order, ...s.orders], cart: null };
      if (cart.kind === "plan" && cart.credits) {
        next.credits = s.credits + cart.credits;
      } else if (cart.kind === "plan" && cart.id === "mensile") {
        next.subscription = { planId: cart.id, planName: cart.name, activeUntil: fmtDate(addMonths(now, 1)) };
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
    const ok = email.trim().toLowerCase() === "admin@nagomilab.demo" && pwd === "demo2026";
    if (ok) setAdminAuthed(true);
    return ok;
  };
  const logout = () => setAdminAuthed(false);

  const value = {
    ...state,
    weekCount: state.booked.length,
    toast, say,
    openLesson, openSheet: setOpenLesson, closeSheet: () => setOpenLesson(null),
    day, setDay, catFilter, setCatFilter,
    spotsLeft, isFull, book, cancel, joinWait,
    goCal, startCheckout, clearCart, completeOrder, resetDemo,
    setStations,
    couponInfo,
    adminAuthed, login, logout,
  };
  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}
