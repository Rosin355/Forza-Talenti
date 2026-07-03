import TalentRing from "./TalentRing";

export default function Header({ tab, setTab }) {
  return (
    <header className="lfdt-header">
      <div className="lfdt-brand" onClick={() => setTab("home")} role="button" tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setTab("home")}>
        <TalentRing size={40} spin={false} />
        <div>
          <div className="lfdt-brandname">La Forza Dei Talenti</div>
          <div className="lfdt-brandsub">Associazione · Benessere e crescita</div>
        </div>
      </div>
      <nav className="lfdt-nav" aria-label="Navigazione principale">
        {[["home", "Home"], ["percorsi", "Percorsi"], ["cal", "Calendario"], ["tessera", "Tessera"], ["piani", "Piani"]].map(([k, lab]) => (
          <button key={k} className={`lfdt-navbtn ${tab === k ? "on" : ""}`} onClick={() => setTab(k)}>{lab}</button>
        ))}
      </nav>
    </header>
  );
}
