import { createContext, useContext } from "react";

export const DemoContext = createContext(null);

export function useDemo() {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemo deve essere usato dentro DemoProvider");
  return ctx;
}

export function couponInfo(code) {
  if ((code || "").trim().toUpperCase() === "TALENTO10") return { ok: true, rate: 0.1, code: "TALENTO10" };
  return { ok: false, rate: 0, code: (code || "").trim().toUpperCase() };
}
