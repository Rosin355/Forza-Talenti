import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDemo } from "../store/demoStore";
import logo from "../assets/logo.png";

export default function AdminLogin() {
  const { login } = useDemo();
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@lfdt.demo");
  const [pwd, setPwd] = useState("demo2026");
  const [err, setErr] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!login(email, pwd)) setErr("Credenziali non valide. Usa quelle demo qui sopra.");
  };

  return (
    <div className="lfdt-admin-auth">
      <form className="lfdt-login-card" onSubmit={submit}>
        <img src={logo} alt="La Forza Dei Talenti" className="lfdt-logo" width={40} height={40} />
        <h1>Area gestionale</h1>
        <p className="lfdt-login-sub">Accesso riservato allo staff · ambiente demo</p>

        <div className="lfdt-login-demo" role="note">
          <strong>Credenziali demo</strong>
          <span>admin@lfdt.demo</span>
          <span>demo2026</span>
        </div>

        <label className="lfdt-field">
          <span>Email</span>
          <input type="email" value={email} autoComplete="username"
            onChange={(e) => { setEmail(e.target.value); setErr(""); }} />
        </label>
        <label className="lfdt-field">
          <span>Password</span>
          <input type="password" value={pwd} autoComplete="current-password"
            onChange={(e) => { setPwd(e.target.value); setErr(""); }} />
        </label>

        {err && <div className="lfdt-login-err" role="alert">{err}</div>}

        <button className="lfdt-btn primary full" type="submit" style={{ marginTop: 16 }}>Entra nel gestionale</button>
        <button className="lfdt-link" type="button" style={{ marginTop: 14 }} onClick={() => navigate("/")}>← Torna al sito</button>
      </form>
    </div>
  );
}
