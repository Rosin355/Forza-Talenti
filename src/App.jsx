import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PublicLayout from "./components/PublicLayout";
import Home from "./components/Home";
import Percorsi from "./components/Percorsi";
import PercorsoDettaglio from "./components/PercorsoDettaglio";
import Calendario from "./components/Calendario";
import Tecnologia from "./components/Tecnologia";
import Tessera from "./components/Tessera";
import Piani from "./components/Piani";
import Checkout from "./components/Checkout";
import "./styles/app.css";

/* L'area admin (con recharts) è caricata solo quando si apre /admin,
   così il sito pubblico resta leggero. */
const Admin = lazy(() => import("./admin/Admin"));

/* ============================================================
   LA FORZA DEI TALENTI — demo web app (mockup, dati finti)
   Stato globale (prenotazioni, tessera, abbonamento, carrello,
   login admin) in DemoContext. Sito pubblico + area /admin.
   ============================================================ */

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/percorsi" element={<Percorsi />} />
        <Route path="/percorsi/:slug" element={<PercorsoDettaglio />} />
        <Route path="/calendario" element={<Calendario />} />
        <Route path="/tecnologia" element={<Tecnologia />} />
        <Route path="/tessera" element={<Tessera />} />
        <Route path="/piani" element={<Piani />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
      <Route path="/admin/*" element={
        <Suspense fallback={<div className="lfdt-admin-auth"><p className="lfdt-admin-muted">Carico il gestionale…</p></div>}>
          <Admin />
        </Suspense>
      } />
    </Routes>
  );
}
