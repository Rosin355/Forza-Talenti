import { NavLink, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useDemo } from "../store/demoStore";
import logo from "../assets/logo.png";
import AdminLogin from "./AdminLogin";
import Dashboard from "./Dashboard";
import Prenotazioni from "./Prenotazioni";
import Corsi from "./Corsi";
import Soci from "./Soci";
import Impostazioni from "./Impostazioni";

const NAV = [
  ["/admin", "Dashboard"],
  ["/admin/prenotazioni", "Sedute"],
  ["/admin/corsi", "Agenda & postazioni"],
  ["/admin/soci", "Soci"],
  ["/admin/impostazioni", "Impostazioni"],
];

export default function Admin() {
  const { adminAuthed, logout } = useDemo();
  const navigate = useNavigate();

  if (!adminAuthed) return <AdminLogin />;

  return (
    <div className="lfdt-admin">
      <aside className="lfdt-admin-side">
        <div className="lfdt-admin-brand">
          <img src={logo} alt="" className="lfdt-logo" height={30} />
          <div>
            <strong>Nagomi Lab</strong>
            <span>Gestionale</span>
          </div>
        </div>
        <nav className="lfdt-admin-nav" aria-label="Navigazione gestionale">
          {NAV.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === "/admin"}
              className={({ isActive }) => `lfdt-admin-navlink ${isActive ? "on" : ""}`}>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="lfdt-admin-side-foot">Demo · dati non reali</div>
      </aside>

      <div className="lfdt-admin-main">
        <header className="lfdt-admin-top">
          <div className="lfdt-admin-top-title">Pannello di gestione</div>
          <div className="lfdt-admin-top-right">
            <span className="lfdt-admin-role" title="Ruolo demo">Admin Master</span>
            <div className="lfdt-admin-avatar" aria-hidden="true">AM</div>
            <button className="lfdt-admin-link" onClick={() => navigate("/")}>Torna al sito</button>
            <button className="lfdt-admin-link" onClick={logout}>Esci</button>
          </div>
        </header>

        <div className="lfdt-admin-content">
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="prenotazioni" element={<Prenotazioni />} />
            <Route path="corsi" element={<Corsi />} />
            <Route path="soci" element={<Soci />} />
            <Route path="impostazioni" element={<Impostazioni />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
