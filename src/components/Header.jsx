import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useDemo } from "../store/demoStore";

const NAV = [
  ["/", "Home"],
  ["/percorsi", "Trattamenti"],
  ["/tecnologia", "Tecnologia"],
  ["/calendario", "Prenota"],
  ["/tessera", "Tessera"],
  ["/piani", "Pacchetti"],
];

export default function Header() {
  const navigate = useNavigate();
  const { credits } = useDemo();
  return (
    <header className="lfdt-header">
      <div className="lfdt-brand" onClick={() => navigate("/")} role="button" tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && navigate("/")}>
        <img src={logo} alt="Nagomi Lab — Campi Elettromagnetici Pulsati"
          className="lfdt-logo" height={48} />
      </div>
      {credits > 0 && (
        <button className="lfdt-credits" onClick={() => navigate("/tessera")}
          aria-label={`${credits} crediti seduta disponibili`}>
          <span className="lfdt-credits-dot" aria-hidden="true" />{credits} {credits === 1 ? "credito" : "crediti"}
        </button>
      )}
      <nav className="lfdt-nav" aria-label="Navigazione principale">
        {NAV.map(([to, lab]) => (
          <NavLink key={to} to={to} end={to === "/"}
            className={({ isActive }) => `lfdt-navbtn ${isActive ? "on" : ""}`}>
            {lab}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
