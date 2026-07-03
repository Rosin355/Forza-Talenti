import { useState, useMemo } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { LESSONS } from "./data/lessons";
import Header from "./components/Header";
import Home from "./components/Home";
import Percorsi from "./components/Percorsi";
import PercorsoDettaglio from "./components/PercorsoDettaglio";
import Calendario from "./components/Calendario";
import Tessera from "./components/Tessera";
import Piani from "./components/Piani";
import Placeholder from "./components/Placeholder";
import DettaglioLezione from "./components/DettaglioLezione";
import Toast from "./components/Toast";
import Footer from "./components/Footer";
import "./styles/app.css";

/* ============================================================
   LA FORZA DEI TALENTI — demo web app v2 (mockup, dati finti)
   Novità: pagina Percorsi + insegnanti, home con "come funziona",
   evento in evidenza, testimonianze e sondaggio, calendario con
   filtri per categoria e palinsesto più ricco.
   ============================================================ */

export default function App() {
  const navigate = useNavigate();
  const [day, setDay] = useState(0);
  const [catFilter, setCatFilter] = useState("all");
  const [open, setOpen] = useState(null);
  const [booked, setBooked] = useState([4]);
  const [waitlist, setWaitlist] = useState([]);
  const [toast, setToast] = useState(null);
  const [coupon, setCoupon] = useState("");
  const [couponOk, setCouponOk] = useState(false);
  const [stars, setStars] = useState(0);
  const [surveySent, setSurveySent] = useState(false);

  const MAX_WEEK = 2;
  const weekCount = booked.length;

  const say = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2600); };

  const spotsLeft = (l) => l.cap - l.booked - (booked.includes(l.id) ? 1 : 0);
  const isFull = (l) => l.booked >= l.cap && !booked.includes(l.id);

  const book = (l) => {
    if (booked.includes(l.id)) return;
    if (weekCount >= MAX_WEEK) { say("Hai già 2 prenotazioni questa settimana. Disdici una lezione per prenotarne un'altra."); return; }
    if (isFull(l)) return;
    setBooked([...booked, l.id]);
    say(`Prenotazione confermata · ${l.title}`);
    setOpen(null);
  };
  const cancel = (l) => {
    setBooked(booked.filter((id) => id !== l.id));
    say(`Prenotazione disdetta · ${l.title}`);
  };
  const joinWait = (l) => {
    if (waitlist.includes(l.id)) return;
    setWaitlist([...waitlist, l.id]);
    say("Sei in lista d'attesa: se si libera un posto ti avvisiamo e sei dentro.");
    setOpen(null);
  };

  const goCal = (cat) => { setCatFilter(cat || "all"); navigate("/calendario"); };

  const myLessons = useMemo(() => LESSONS.filter((l) => booked.includes(l.id)), [booked]);
  const dayLessons = useMemo(
    () => LESSONS.filter((l) => l.day === day && (catFilter === "all" || l.cat === catFilter))
      .sort((a, b) => a.time.localeCompare(b.time)),
    [day, catFilter]
  );

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "TALENTO10") { setCouponOk(true); say("Coupon applicato: −10% sul primo abbonamento."); }
    else say("Codice non riconosciuto. Controlla il coupon e riprova.");
  };

  const sendSurvey = () => {
    if (!stars) { say("Scegli da 1 a 5 stelle per inviare la tua valutazione."); return; }
    setSurveySent(true);
    say("Grazie! La tua opinione aiuta tutto il cerchio a migliorare.");
  };

  const lessonProps = { booked, waitlist, isFull, spotsLeft, setOpen };

  return (
    <div className="lfdt-root">
      <Header />

      <Routes>
        <Route path="/" element={
          <Home goCal={goCal} {...lessonProps}
            stars={stars} setStars={setStars} surveySent={surveySent} sendSurvey={sendSurvey} />
        } />
        <Route path="/percorsi" element={<Percorsi />} />
        <Route path="/percorsi/:slug" element={<PercorsoDettaglio goCal={goCal} {...lessonProps} />} />
        <Route path="/calendario" element={
          <Calendario day={day} setDay={setDay} catFilter={catFilter} setCatFilter={setCatFilter}
            dayLessons={dayLessons} weekCount={weekCount} maxWeek={MAX_WEEK} {...lessonProps} />
        } />
        <Route path="/tessera" element={<Tessera myLessons={myLessons} waitlist={waitlist} onCancel={cancel} />} />
        <Route path="/piani" element={
          <Piani coupon={coupon} setCoupon={setCoupon} couponOk={couponOk} applyCoupon={applyCoupon} say={say} />
        } />
        <Route path="/checkout" element={<Placeholder title="Checkout" />} />
        <Route path="/admin" element={<Placeholder title="Area amministrazione" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {open && (
        <DettaglioLezione open={open} booked={booked} waitlist={waitlist}
          isFull={isFull} spotsLeft={spotsLeft}
          onBook={book} onCancel={cancel} onJoinWait={joinWait} onClose={() => setOpen(null)} />
      )}

      <Toast message={toast} />

      <Footer goCal={goCal} say={say} />
    </div>
  );
}
