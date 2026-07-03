import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Percorsi from "./components/Percorsi";
import PercorsoDettaglio from "./components/PercorsoDettaglio";
import Calendario from "./components/Calendario";
import Tessera from "./components/Tessera";
import Piani from "./components/Piani";
import Checkout from "./components/Checkout";
import Placeholder from "./components/Placeholder";
import DettaglioLezione from "./components/DettaglioLezione";
import Toast from "./components/Toast";
import Footer from "./components/Footer";
import "./styles/app.css";

/* ============================================================
   LA FORZA DEI TALENTI — demo web app (mockup, dati finti)
   Stato globale (prenotazioni, tessera, abbonamento, carrello)
   in DemoContext, persistito in localStorage.
   ============================================================ */

export default function App() {
  return (
    <div className="lfdt-root">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/percorsi" element={<Percorsi />} />
        <Route path="/percorsi/:slug" element={<PercorsoDettaglio />} />
        <Route path="/calendario" element={<Calendario />} />
        <Route path="/tessera" element={<Tessera />} />
        <Route path="/piani" element={<Piani />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin" element={<Placeholder title="Area amministrazione" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <DettaglioLezione />
      <Toast />
      <Footer />
    </div>
  );
}
