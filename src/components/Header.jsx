import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

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
  return (
    <header className="lfdt-header">
      <div className="lfdt-brand" onClick={() => navigate("/")} role="button" tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && navigate("/")}>
        <img src={logo} alt="Nagomi Lab — Campi Elettromagnetici Pulsati"
          className="lfdt-logo" height={48} />
      </div>
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
