import TalentRing from "./TalentRing";

export default function Footer({ setTab, goCal, say }) {
  return (
    <footer className="lfdt-footer">
      <div className="lfdt-footer-top">
        <div className="lfdt-brand">
          <TalentRing size={34} spin={false} />
          <div>
            <div className="lfdt-brandname">La Forza Dei Talenti</div>
            <div className="lfdt-brandsub">APS · Benessere e crescita</div>
          </div>
        </div>
        <div className="lfdt-footer-cols">
          <div>
            <strong>Esplora</strong>
            <button className="lfdt-flink" onClick={() => setTab("percorsi")}>Percorsi</button>
            <button className="lfdt-flink" onClick={() => goCal()}>Calendario</button>
            <button className="lfdt-flink" onClick={() => setTab("piani")}>Tessere e piani</button>
          </div>
          <div>
            <strong>Associazione</strong>
            <button className="lfdt-flink" onClick={() => setTab("percorsi")}>Lo staff</button>
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
      </div>
    </footer>
  );
}
