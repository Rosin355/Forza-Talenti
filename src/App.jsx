import { useState, useMemo } from "react";
import { CATS, DAYS, LESSONS, QUOTES } from "./data/mockData";
import Header from "./components/Header";
import Hero from "./components/Hero";
import LessonCard from "./components/LessonCard";
import DettaglioLezione from "./components/DettaglioLezione";
import Tessera from "./components/Tessera";
import Piani from "./components/Piani";
import Percorsi from "./components/Percorsi";
import Footer from "./components/Footer";
import Badge from "./components/Badge";
import "./styles/lfdt.css";

/* ============================================================
   LA FORZA DEI TALENTI — demo web app v2 (mockup, dati finti)
   Novità: pagina Percorsi + insegnanti, home con "come funziona",
   evento in evidenza, testimonianze e sondaggio, calendario con
   filtri per categoria e palinsesto più ricco.
   ============================================================ */

export default function App() {
  const [tab, setTab] = useState("home");
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

  const goCal = (cat) => { setCatFilter(cat || "all"); setTab("cal"); };

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

  const fullMoon = LESSONS.find((l) => l.id === 12);

  return (
    <div className="lfdt-root">
      <Header tab={tab} setTab={setTab} />

      {/* ---------- HOME ---------- */}
      {tab === "home" && (
        <main>
          <Hero onCalendario={() => goCal()} onPiani={() => setTab("piani")} />

          {/* come funziona */}
          <section className="lfdt-section">
            <h2>Come funziona</h2>
            <div className="lfdt-steps">
              <div className="lfdt-step">
                <div className="lfdt-step-ico" style={{ background: "#F3EEFE", color: "#8B5CF6" }}>❋</div>
                <h3>Diventi socio</h3>
                <p>Attivi la tessera annuale numerata: vale 365 giorni dal giorno dell'emissione, in qualunque momento tu ti iscriva.</p>
              </div>
              <div className="lfdt-step">
                <div className="lfdt-step-ico" style={{ background: "#E6F7F9", color: "#0EA5B7" }}>◷</div>
                <h3>Prenoti la lezione</h3>
                <p>Dal calendario scegli giorno e corso, fino a 12 ore prima dell'inizio. Se i posti sono finiti, entri in lista d'attesa.</p>
              </div>
              <div className="lfdt-step">
                <div className="lfdt-step-ico" style={{ background: "#FEF1E7", color: "#F97316" }}>✦</div>
                <h3>Partecipi (o disdici)</h3>
                <p>Ti aspettiamo in sala. Se hai un imprevisto, disdici entro 24 ore: il tuo posto passa a chi è in attesa.</p>
              </div>
            </div>
          </section>

          {/* evento in evidenza */}
          <section className="lfdt-section">
            <div className="lfdt-event" role="button" tabIndex={0}
              onClick={() => setOpen(fullMoon)} onKeyDown={(e) => e.key === "Enter" && setOpen(fullMoon)}>
              <div className="lfdt-event-moon" aria-hidden="true" />
              <div className="lfdt-event-body">
                <Badge color="#F43F5E" soft="#3d2430">Evento della settimana</Badge>
                <h3>Cerchio di luna piena</h3>
                <p>Venerdì 10 luglio · ore 19:30 · in giardino. Meditazione collettiva, condivisione e tisana sotto la luna.
                   Aperto a soci e accompagnatori.</p>
                <span className="lfdt-event-cta">Prenota il tuo posto → <em>{fullMoon.cap - fullMoon.booked} rimasti</em></span>
              </div>
            </div>
          </section>

          <section className="lfdt-section">
            <h2>I nostri percorsi</h2>
            <div className="lfdt-cats">
              {Object.entries(CATS).map(([k, c]) => (
                <button key={k} className="lfdt-cat" style={{ "--c": c.color, "--s": c.soft }}
                  onClick={() => goCal(k)}>
                  <span className="lfdt-cat-dot" />
                  <span className="lfdt-cat-name">{c.label}</span>
                  <span className="lfdt-cat-arrow">→</span>
                </button>
              ))}
            </div>
            <button className="lfdt-link" style={{ marginTop: 14 }} onClick={() => setTab("percorsi")}>
              Leggi le descrizioni dei percorsi e conosci gli insegnanti →
            </button>
          </section>

          {/* testimonianze */}
          <section className="lfdt-section">
            <h2>Voci dal cerchio</h2>
            <div className="lfdt-quotes">
              {QUOTES.map((q, i) => (
                <figure key={i} className="lfdt-quote">
                  <blockquote>"{q.text}"</blockquote>
                  <figcaption><strong>{q.who}</strong> · {q.since}</figcaption>
                </figure>
              ))}
            </div>
          </section>

          {/* sondaggio */}
          <section className="lfdt-section">
            <div className="lfdt-survey">
              {!surveySent ? (
                <>
                  <h2>Com'è andata la tua ultima lezione?</h2>
                  <p className="lfdt-muted">Bastano due secondi: la tua valutazione arriva direttamente allo staff.</p>
                  <div className="lfdt-stars" role="radiogroup" aria-label="Valutazione da 1 a 5 stelle">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button key={n} role="radio" aria-checked={stars === n} aria-label={`${n} stelle`}
                        className={`lfdt-star ${stars >= n ? "on" : ""}`} onClick={() => setStars(n)}>★</button>
                    ))}
                  </div>
                  <button className="lfdt-btn primary" onClick={sendSurvey}>Invia la valutazione</button>
                </>
              ) : (
                <>
                  <h2>Grazie di cuore 🙏</h2>
                  <p className="lfdt-muted">La tua valutazione è arrivata allo staff. Ogni voce rende il cerchio più forte.</p>
                </>
              )}
            </div>
          </section>

          <section className="lfdt-section">
            <div className="lfdt-row-between">
              <h2>In programma questa settimana</h2>
              <button className="lfdt-link" onClick={() => goCal()}>Tutto il calendario →</button>
            </div>
            <div className="lfdt-lessons">
              {[LESSONS.find(l => l.id === 12), LESSONS.find(l => l.id === 14), LESSONS.find(l => l.id === 7)].map((l) => (
                <LessonCard key={l.id} l={l} booked={booked} waitlist={waitlist}
                  isFull={isFull} spotsLeft={spotsLeft} onOpen={() => setOpen(l)} />
              ))}
            </div>
          </section>
        </main>
      )}

      {/* ---------- PERCORSI ---------- */}
      {tab === "percorsi" && <Percorsi goCal={goCal} />}

      {/* ---------- CALENDARIO ---------- */}
      {tab === "cal" && (
        <main>
          <section className="lfdt-section">
            <div className="lfdt-row-between">
              <h2>Calendario · 6–12 luglio</h2>
              <span className="lfdt-quota">{weekCount}/{MAX_WEEK} prenotazioni questa settimana</span>
            </div>
            <div className="lfdt-days" role="tablist" aria-label="Giorni della settimana">
              {DAYS.map((d) => (
                <button key={d.key} role="tab" aria-selected={day === d.key}
                  className={`lfdt-day ${day === d.key ? "on" : ""}`} onClick={() => setDay(d.key)}>
                  <span className="lfdt-day-short">{d.short}</span>
                  <span className="lfdt-day-num">{d.num}</span>
                </button>
              ))}
            </div>
            <div className="lfdt-filters" aria-label="Filtra per percorso">
              <button className={`lfdt-chip ${catFilter === "all" ? "on" : ""}`} onClick={() => setCatFilter("all")}>Tutti</button>
              {Object.entries(CATS).map(([k, c]) => (
                <button key={k} className={`lfdt-chip ${catFilter === k ? "on" : ""}`}
                  style={{ "--c": c.color, "--s": c.soft }} onClick={() => setCatFilter(k)}>
                  <span className="lfdt-chip-dot" />{c.label}
                </button>
              ))}
            </div>
            <div className="lfdt-lessons">
              {dayLessons.length === 0 && (
                <div className="lfdt-empty">Nessuna lezione {catFilter !== "all" ? `di ${CATS[catFilter].label} ` : ""}in questo giorno.
                  Prova un altro giorno o togli il filtro.</div>
              )}
              {dayLessons.map((l) => (
                <LessonCard key={l.id} l={l} booked={booked} waitlist={waitlist}
                  isFull={isFull} spotsLeft={spotsLeft} onOpen={() => setOpen(l)} />
              ))}
            </div>
            <p className="lfdt-rules">Puoi prenotare fino a 2 lezioni a settimana e fino a 12 ore prima dell'inizio.
              Ti chiediamo di disdire almeno 24 ore prima: così chi è in lista d'attesa entra al posto tuo.
              Per imprevisti dell'ultimo minuto scrivi allo staff, troviamo una soluzione insieme.</p>
          </section>
        </main>
      )}

      {/* ---------- TESSERA ---------- */}
      {tab === "tessera" && (
        <Tessera myLessons={myLessons} waitlist={waitlist} onCancel={cancel} setTab={setTab} />
      )}

      {/* ---------- PIANI ---------- */}
      {tab === "piani" && (
        <Piani coupon={coupon} setCoupon={setCoupon} couponOk={couponOk} applyCoupon={applyCoupon} say={say} />
      )}

      {/* ---------- DETTAGLIO LEZIONE ---------- */}
      {open && (
        <DettaglioLezione open={open} booked={booked} waitlist={waitlist}
          isFull={isFull} spotsLeft={spotsLeft}
          onBook={book} onCancel={cancel} onJoinWait={joinWait} onClose={() => setOpen(null)} />
      )}

      {toast && <div className="lfdt-toast" role="status">{toast}</div>}

      <Footer setTab={setTab} goCal={goCal} say={say} />
    </div>
  );
}
