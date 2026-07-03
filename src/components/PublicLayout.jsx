import { Outlet } from "react-router-dom";
import Header from "./Header";
import DettaglioLezione from "./DettaglioLezione";
import Toast from "./Toast";
import Footer from "./Footer";

export default function PublicLayout() {
  return (
    <div className="lfdt-root">
      <Header />
      <Outlet />
      <DettaglioLezione />
      <Toast />
      <Footer />
    </div>
  );
}
