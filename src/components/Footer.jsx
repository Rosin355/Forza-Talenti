import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useDemo } from "../store/demoStore";

export default function Footer() {
  const navigate = useNavigate();
  const { goCal, say, resetDemo } = useDemo();
  return (
    <footer className="lfdt-footer">
      <div className="lfdt-footer-top">
        <div className="lfdt-brand">
          <img src={logo} alt="Nagomi Lab — Campi Elettromagnetici Pulsati"
            className="lfdt-logo" height={44} />
        </div>
        <div className="lfdt-footer-cols">
          <div>
            <strong>Esplora</strong>
            <button className="lfdt-flink" onClick={() => navigate("/percorsi")}>Trattamenti</button>
            <button className="lfdt-flink" onClick={() => navigate("/tecnologia")}>La tecnologia</button>
            <button className="lfdt-flink" onClick={() => goCal()}>Prenota una seduta</button>
            <button className="lfdt-flink" onClick={() => navigate("/piani")}>Pacchetti</button>
          </div>
          <div>
            <strong>Il centro</strong>
            <button className="lfdt-flink" onClick={() => navigate("/percorsi")}>Gli operatori</button>
            <button className="lfdt-flink" onClick={() => say("Demo: sezione in arrivo nella versione finale.")}>Dove siamo</button>
            <button className="lfdt-flink" onClick={() => say("Demo: sezione in arrivo nella versione finale.")}>Collaborazioni</button>
          </div>
          <div>
            <strong>Info</strong>
            <button className="lfdt-flink" onClick={() => say("Demo: documento disponibile nella versione finale.")}>Termini e condizioni</button>
            <button className="lfdt-flink" onClick={() => say("Demo: documento disponibile nella versione finale.")}>Privacy policy</button>
          </div>
        </div>
      </div>
      <div className="lfdt-footer-bottom">
        <span>© 2026 Nagomi Lab · demo dimostrativa, dati non reali</span>
        <button className="lfdt-reset" onClick={resetDemo}
          aria-label="Reimposta la demo ai valori iniziali" title="Reset demo">Reset demo</button>
      </div>
    </footer>
  );
}
