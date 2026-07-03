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
          <img src={logo} alt="La Forza Dei Talenti" className="lfdt-logo" width={34} height={34} />
          <div>
            <div className="lfdt-brandname">La Forza Dei Talenti</div>
            <div className="lfdt-brandsub">APS · Benessere e crescita</div>
          </div>
        </div>
        <div className="lfdt-footer-cols">
          <div>
            <strong>Esplora</strong>
            <button className="lfdt-flink" onClick={() => navigate("/percorsi")}>Percorsi</button>
            <button className="lfdt-flink" onClick={() => goCal()}>Calendario</button>
            <button className="lfdt-flink" onClick={() => navigate("/piani")}>Tessere e piani</button>
          </div>
          <div>
            <strong>Associazione</strong>
            <button className="lfdt-flink" onClick={() => navigate("/percorsi")}>Lo staff</button>
            <button className="lfdt-flink" onClick={() => say("Demo: sezione in arrivo nella versione finale.")}>Collaborazioni</button>
            <button className="lfdt-flink" onClick={() => say("Demo: sezione in arrivo nella versione finale.")}>Foto e archivio</button>
          </div>
          <div>
            <strong>Info</strong>
            <button className="lfdt-flink" onClick={() => say("Demo: documento disponibile nella versione finale.")}>Termini e condizioni</button>
            <button className="lfdt-flink" onClick={() => say("Demo: documento disponibile nella versione finale.")}>Privacy policy</button>
          </div>
        </div>
      </div>
      <div className="lfdt-footer-bottom">
        <span>© 2026 La Forza Dei Talenti APS · demo non collegata a dati reali</span>
        <button className="lfdt-reset" onClick={resetDemo}
          aria-label="Reimposta la demo ai valori iniziali" title="Reset demo">Reset demo</button>
      </div>
    </footer>
  );
}
