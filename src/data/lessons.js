/* Sedute individuali PEMF: slot da 45 min su appuntamento.
   Il centro ha STATIONS postazioni: ogni slot può ospitare al massimo
   STATIONS persone in parallelo. `booked` è l'occupazione mock di partenza.
   Lun–Ven: 9–12 e 15–19 · Sab: solo mattina · Dom: chiuso. */
export const STATIONS = 2;

const MORNING = ["09:00", "10:00", "11:00"];
const AFTERNOON = ["15:00", "16:00", "17:00", "18:00"];

/* pattern deterministici per varietà realistica */
const AREAS = ["benessere", "dolore", "relax", "recupero", "energia"];
const OPS = ["Marta Serena", "Luca Kimura", "Iris Benetti"];
const OCC = [1, 0, 2, 1, 0, 1, 2, 0, 1, 1, 0, 2, 1, 0, 0, 1, 2, 1, 0, 1];

function buildSlots() {
  const slots = [];
  let id = 1;
  for (let day = 0; day <= 5; day++) {
    const times = day === 5 ? MORNING : [...MORNING, ...AFTERNOON];
    for (const time of times) {
      const i = id - 1;
      slots.push({
        id: id++,
        day,
        time,
        dur: 45,
        cat: AREAS[i % AREAS.length],
        title: "Seduta individuale PEMF",
        teacher: OPS[i % OPS.length],
        room: "Studio Nagomi",
        cap: STATIONS,
        booked: Math.min(OCC[i % OCC.length], STATIONS),
      });
    }
  }
  return slots;
}

export const LESSONS = buildSlots();
