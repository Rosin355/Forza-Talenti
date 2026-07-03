import { useNavigate } from "react-router-dom";
import Hero from "./Hero";
import Badge from "./Badge";
import LessonCard from "./LessonCard";
import { CATS } from "../data/cats";
import { LESSONS } from "../data/lessons";
import { QUOTES } from "../data/quotes";

export default function Home({ goCal, booked, waitlist, isFull, spotsLeft, setOpen,
  stars, setStars, surveySent, sendSurvey }) {
  const navigate = useNavigate();
  const fullMoon = LESSONS.find((l) => l.id === 12);

  return (
    <main>
      <Hero onCalendario={() => goCal()} onPiani={() => navigate("/piani")} />

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
        <button className="lfdt-link" style={{ marginTop: 14 }} onClick={() => navigate("/percorsi")}>
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
  );
}
