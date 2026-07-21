import { useNavigate } from "react-router-dom";
import NagomiOrbit from "./NagomiOrbit";

const COME_FUNZIONA = [
  { icon: "⌁", bg: "#EDEEF9", color: "#33398F", title: "Impulsi profondi",
    text: "Impulsi elettromagnetici brevi e calibrati attraversano i tessuti in modo uniforme, raggiungendo anche le zone più profonde senza contatto e senza dolore." },
  { icon: "✦", bg: "#FEF3E2", color: "#F5920B", title: "Energia cellulare",
    text: "Il campo pulsato favorisce il movimento di ioni ed elettroliti e supporta i processi della cellula coinvolti nella produzione di ATP, la sua riserva di energia." },
  { icon: "◎", bg: "#E6F6F9", color: "#0E9BB5", title: "Finestre biologiche",
    text: "Le frequenze dei programmi sono calibrate sulle risposte naturali delle cellule: non forzano l'organismo, ne accompagnano i ritmi." },
];

const PERCHE = [
  ["Indolore", "La maggior parte delle persone non avverte nulla: molte si rilassano al punto da addormentarsi."],
  ["Non invasiva", "Niente aghi, niente farmaci, niente manipolazioni: solo un applicatore appoggiato sulla zona da trattare."],
  ["Seduta breve", "30–45 minuti, facili da incastrare in pausa pranzo o dopo il lavoro."],
  ["Zero preparazione", "Ti sdrai vestito su un lettino e ti rilassi: al resto pensa il campo."],
];

const FAQ = [
  ["Cosa si prova durante la seduta?",
   "Quasi nulla, ed è normale: gli impulsi non si avvertono sulla pelle. La sensazione più riferita è un rilassamento progressivo; alcune persone si addormentano."],
  ["Quanto dura una seduta?",
   "Tra 30 e 45 minuti, a seconda del programma. Con accoglienza e preparazione, considera circa un'ora in totale."],
  ["Quante sedute servono?",
   "Dipende dall'obiettivo e da come risponde il tuo organismo. Di solito si parte da un ciclo di 5–10 sedute, definito insieme nella seduta conoscitiva gratuita e riadattato strada facendo."],
  ["Ci sono controindicazioni?",
   "Per la popolazione generale non sono note controindicazioni. Per prudenza non trattiamo persone con pacemaker o altri dispositivi elettronici impiantati e donne in gravidanza: in questi casi, e in presenza di patologie, parla prima con il tuo medico."],
  ["Devo spogliarmi?",
   "No: il campo elettromagnetico attraversa i vestiti. Ti chiediamo solo di rimuovere oggetti metallici e dispositivi elettronici dalle tasche."],
  ["Posso farla se ho protesi metalliche?",
   "In generale le protesi metalliche non elettroniche non sono un ostacolo, ma ogni situazione è diversa: segnalacelo alla prenotazione e, in caso di dubbi, chiedi al tuo medico."],
  ["Posso leggere o usare il telefono durante la seduta?",
   "Puoi leggere o ascoltare musica. Il telefono preferiamo resti lontano dall'applicatore: te lo custodiamo noi a due passi dal lettino."],
  ["La seduta sostituisce una visita medica?",
   "No. Le nostre sedute sono trattamenti di benessere: non facciamo diagnosi e non sostituiamo terapie. Se hai un problema di salute, il primo passo è sempre il tuo medico."],
];

export default function Tecnologia() {
  const navigate = useNavigate();
  return (
    <main>
      <section className="lfdt-section">
        <div className="lfdt-tech-hero">
          <div>
            <div className="lfdt-eyebrow">PEMF · Pulsed ElectroMagnetic Fields</div>
            <h1 className="lfdt-tech-title">La tecnologia PEMF</h1>
            <p className="lfdt-muted" style={{ maxWidth: "58ch" }}>
              I campi elettromagnetici pulsati sono impulsi brevi e calibrati che attraversano i tessuti
              e dialogano con il metabolismo delle cellule. Una tecnologia studiata da decenni,
              qui al servizio del tuo benessere quotidiano.
            </p>
          </div>
          <div className="lfdt-tech-orbit"><NagomiOrbit size={170} /></div>
        </div>
      </section>

      <section className="lfdt-section">
        <h2>Come funziona</h2>
        <div className="lfdt-steps">
          {COME_FUNZIONA.map((c) => (
            <div key={c.title} className="lfdt-step">
              <div className="lfdt-step-ico" style={{ background: c.bg, color: c.color }}>{c.icon}</div>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="lfdt-section">
        <h2>Perché sceglierla</h2>
        <div className="lfdt-info">
          {PERCHE.map(([t, d]) => (
            <div key={t} className="lfdt-info-item" style={{ "--c": "#33398F" }}>
              <span className="lfdt-info-label">{t}</span>
              <p>{d}</p>
            </div>
          ))}
        </div>
        <p className="lfdt-rules">
          Vuoi approfondire la letteratura scientifica sui campi elettromagnetici pulsati?{" "}
          <a className="lfdt-link" href="https://pubmed.ncbi.nlm.nih.gov/?term=pulsed+electromagnetic+field+therapy"
            target="_blank" rel="noopener noreferrer">Studi e ricerche su PubMed →</a>
        </p>
      </section>

      <section className="lfdt-section" id="faq">
        <h2>Domande frequenti</h2>
        <div className="lfdt-faq">
          {FAQ.map(([q, a]) => (
            <details key={q} className="lfdt-faq-item">
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="lfdt-section">
        <div className="lfdt-disclaimer" role="note">
          Le sedute PEMF sono trattamenti di benessere e non sostituiscono diagnosi o terapie mediche.
          In presenza di pacemaker, gravidanza o patologie, consulta prima il tuo medico.
        </div>
        <div className="lfdt-cta" style={{ "--s": "#EDEEF9", marginTop: 18 }}>
          <div>
            <h3>Vuoi provare?</h3>
            <p>La prima seduta conoscitiva è gratuita: conosciamo la tua storia, ti mostriamo il dispositivo e definiamo insieme il ciclo.</p>
          </div>
          <button className="lfdt-btn primary" onClick={() => navigate("/calendario")}>Prenota la conoscitiva</button>
        </div>
      </section>
    </main>
  );
}
