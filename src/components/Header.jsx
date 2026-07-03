import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const NAV = [
  ["/", "Home"],
  ["/percorsi", "Percorsi"],
  ["/calendario", "Calendario"],
  ["/tessera", "Tessera"],
  ["/piani", "Piani"],
];

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="lfdt-header">
      <div className="lfdt-brand" onClick={() => navigate("/")} role="button" tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && navigate("/")}>
        <img src={logo} alt="La Forza Dei Talenti" className="lfdt-logo" width={40} height={40} />
        <div>
          <div className="lfdt-brandname">La Forza Dei Talenti</div>
          <div className="lfdt-brandsub">Associazione · Benessere e crescita</div>
        </div>
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
