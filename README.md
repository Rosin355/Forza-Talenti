# La Forza Dei Talenti — demo

Demo web app (mockup, dati finti) per l'associazione **La Forza Dei Talenti**: calendario lezioni con prenotazioni e lista d'attesa, percorsi e insegnanti, tessera socio digitale, piani e abbonamenti.

Costruita con React + Vite. Il deploy su Netlify è configurato tramite `netlify.toml` (build `npm run build`, publish `dist/`).

## Avvio locale

```bash
npm install
npm run dev
```

## Struttura

- `src/App.jsx` — stato dell'app e viste Home/Calendario
- `src/components/` — componenti UI (Header, Hero, LessonCard, DettaglioLezione, Tessera, Piani, Percorsi, Footer…)
- `src/data/mockData.js` — dati mock (lezioni, insegnanti, piani, testimonianze)
- `src/styles/lfdt.css` — stili dell'app
