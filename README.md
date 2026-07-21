# Nagomi Lab — demo centro PEMF

Demo web app (dati finti, nessun backend) per **Nagomi Lab — Campi Elettromagnetici Pulsati**:
prenotazione di sedute individuali PEMF con crediti a pacchetto, tessera socio digitale,
checkout demo con pagamento finto e area gestionale (`/admin`, credenziali demo mostrate in pagina).

Le sedute PEMF descritte nella demo sono trattamenti di benessere e non sostituiscono
diagnosi o terapie mediche.

Costruita con React + Vite (react-router-dom, canvas-confetti, recharts).
Deploy su Netlify configurato via `netlify.toml` (build `npm run build`, publish `dist/`).

## Avvio locale

```bash
npm install
npm run dev
```

## Struttura

- `src/App.jsx` — rotte pubbliche + area admin (lazy)
- `src/components/` — componenti UI del sito pubblico
- `src/admin/` — gestionale demo (login finto, dashboard, sedute, agenda, soci)
- `src/data/` — dati mock (aree, slot sedute, pacchetti, operatori, soci)
- `src/store/` — stato globale persistito in localStorage (`nagomi-demo-state`)
- `src/styles/app.css` — stili (design system Nagomi: Sora + Karla, blu #33398F, oro)

Il pulsante "Reset demo" nel footer riporta la demo allo stato iniziale.
