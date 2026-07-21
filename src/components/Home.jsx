import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "./Hero";
import Badge from "./Badge";
import LessonCard from "./LessonCard";
import { CATS } from "../data/cats";
import { LESSONS } from "../data/lessons";
import { QUOTES } from "../data/quotes";
import { useDemo } from "../store/demoStore";

export default function Home() {
  const navigate = useNavigate();
  const { goCal, say } = useDemo();
  const [stars, setStars] = useState(0);
  const [surveySent, setSurveySent] = useState(false);

  const sendSurvey = () => {
    if (!stars) { say("Scegli da 1 a 5 stelle per inviare la tua valutazione."); return; }
    setSurveySent(true);
    say("Grazie! La tua opinione ci aiuta a rendere il centro migliore.");
  };

  const nextSlots = LESSONS.slice(0, 3);

  return (
    <main>
      <Hero onCalendario={() => goCal()} onPiani={() => navigate("/piani")} />

      {/* i 3 passi Nagomi */}
      <section className="lfdt-section">
        <h2>Come funziona</h2>
        <div className="lfdt-steps">
          <div className="lfdt-step">
            <div className="lfdt-step-ico" style={{ background: "#EDEEF9", color: "#33398F" }}>❋</div>
            <h3>Prenoti la conoscitiva</h3>
            <p>La prima seduta è gratuita: conosciamo la tua storia, ti mostriamo il dispositivo e rispondiamo a ogni domanda.</p>
          </div>
          <div className="lfdt-step">
            <div className="lfdt-step-ico" style={{ background: "#FEF9E1", color: "#B87400" }}>◷</div>
            <h3>Definiamo il tuo ciclo</h3>
            <p>Area di trattamento, frequenza e numero di sedute: costruiamo insieme un percorso realistico, che si adatta strada facendo.</p>
          </div>
          <div className="lfdt-step">
            <div className="lfdt-step-ico" style={{ background: "#E6F6F9", color: "#0E9BB5" }}>✦</div>
            <h3>Ti rilassi, il campo lavora</h3>
            <p>Ti sdrai vestito sul lettino, 30–45 minuti di quiete. Al resto pensano gli impulsi, calibrati sui ritmi delle tue cellule.</p>
          </div>
        </div>
      </section>

      {/* open day in evidenza */}
      <section className="lfdt-section">
        <div className="lfdt-event" role="button" tabIndex={0}
          onClick={() => goCal()} onKeyDown={(e) => e.key === "Enter" && goCal()}>
          <div className="lfdt-event-moon" aria-hidden="true" />
          <div className="lfdt-event-body">
            <Badge color="#F9B411" soft="#3a3620">Open day Nagomi Lab</Badge>
            <h3>Prova la tecnologia PEMF</h3>
            <p>Sabato 11 luglio · dalle 10:00 alle 18:00. Mini-sedute di prova gratuite di 20 minuti,
               visita del centro e tè con gli operatori. Porta chi vuoi: l'armonia si condivide.</p>
            <span className="lfdt-event-cta">Prenota il tuo posto → <em>posti limitati</em></span>
          </div>
        </div>
      </section>

      <section className="lfdt-section">
        <h2>Le aree di trattamento</h2>
        <div className="lfdt-cats">
          {Object.entries(CATS).map(([k, c]) => (
            <button key={k} className="lfdt-cat" style={{ "--c": c.color, "--s": c.soft }}
              onClick={() => navigate(`/percorsi/${k}`)}>
              <span className="lfdt-cat-dot" />
              <span className="lfdt-cat-name">{c.label}</span>
              <span className="lfdt-cat-arrow">→</span>
            </button>
          ))}
        </div>
        <button className="lfdt-link" style={{ marginTop: 14 }} onClick={() => navigate("/percorsi")}>
          Scopri le aree di trattamento e chi ti accompagna →
        </button>
      </section>

      {/* testimonianze */}
      <section className="lfdt-section">
        <h2>Voci dal centro</h2>
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
              <h2>Com'è andata la tua ultima seduta?</h2>
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
              <p className="lfdt-muted">La tua valutazione è arrivata allo staff. Ogni voce rende Nagomi Lab migliore.</p>
            </>
          )}
        </div>
      </section>

      <section className="lfdt-section">
        <div className="lfdt-row-between">
          <h2>Prossime disponibilità</h2>
          <button className="lfdt-link" onClick={() => goCal()}>Tutte le disponibilità →</button>
        </div>
        <div className="lfdt-lessons">
          {nextSlots.map((l) => (
            <LessonCard key={l.id} l={l} />
          ))}
        </div>
      </section>
    </main>
  );
}
