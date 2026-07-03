/* ============================================================
   LA FORZA DEI TALENTI — dati mock (demo, dati finti)
   ============================================================ */

export const CATS = {
  meditazione: { label: "Meditazione", color: "#8B5CF6", soft: "#F3EEFE",
    desc: "Sedute guidate al mattino e alla sera per ritrovare silenzio e chiarezza. Dal primo respiro consapevole alle pratiche profonde." },
  movimento: { label: "Movimento", color: "#F97316", soft: "#FEF1E7",
    desc: "Il corpo come strumento di ascolto: sequenze dolci, risveglio muscolare e pratiche in giardino quando il tempo lo permette." },
  crescita: { label: "Crescita personale", color: "#D9269B", soft: "#FCEAF5",
    desc: "Percorsi tematici in piccolo gruppo per lavorare su scelte, relazioni e obiettivi. Si cresce meglio in un cerchio." },
  mindfulness: { label: "Mindfulness", color: "#0EA5B7", soft: "#E6F7F9",
    desc: "Protocolli di consapevolezza per la vita di ogni giorno: gestione dello stress, pause mindful in pausa pranzo, respiro." },
  cyl: { label: "CYLAcademy", color: "#3B82F6", soft: "#EAF2FE",
    desc: "Il percorso formativo dell'associazione: moduli progressivi per chi vuole approfondire e, un giorno, condurre." },
  kids: { label: "Kids", color: "#D9A400", soft: "#FBF4DC",
    desc: "Yoga e giochi di consapevolezza per bambini dai 4 ai 12 anni. Piccoli gruppi, grande energia, merenda inclusa." },
  eventi: { label: "Eventi", color: "#F43F5E", soft: "#FEECEF",
    desc: "Cerchi di luna, serate a tema, incontri con ospiti. I momenti in cui tutta la comunità si ritrova." },
  workshop: { label: "Workshop & Stage", color: "#22A05A", soft: "#E9F7EF",
    desc: "Intensivi di mezza o intera giornata: scrittura intuitiva, voce, presenza scenica. Posti limitati, esperienza piena." },
};

export const RAINBOW = ["#F43F5E", "#F97316", "#FACC15", "#22C55E", "#06B6D4", "#3B82F6", "#8B5CF6", "#D9269B"];

export const TEACHERS = [
  { name: "Elena Rigoni", role: "Meditazione · Mindfulness", initial: "ER", color: "#8B5CF6",
    bio: "Pratica da vent'anni e insegna da dodici. Le sue sedute del mattino sono il rito con cui molti soci aprono la giornata." },
  { name: "Marco Vidal", role: "Movimento · Respiro", initial: "MV", color: "#F97316",
    bio: "Chinesiologo, unisce movimento consapevole e lavoro sul respiro. Il suo motto: il corpo arriva dove la mente si rilassa." },
  { name: "Sara Bonetti", role: "Crescita personale", initial: "SB", color: "#D9269B",
    bio: "Counselor e facilitatrice di gruppi. Conduce i percorsi tematici e i workshop di scrittura intuitiva." },
  { name: "Giulia Ferro", role: "Kids · Movimento", initial: "GF", color: "#D9A400",
    bio: "Educatrice e insegnante di yoga per l'infanzia. Con lei i bambini imparano a respirare giocando." },
  { name: "Andrea Toso", role: "CYLAcademy · Voce", initial: "AT", color: "#3B82F6",
    bio: "Formatore e coach vocale, coordina i moduli della CYLAcademy e gli stage di voce e presenza." },
];

export const DAYS = [
  { key: 0, short: "Lun", num: "6" },
  { key: 1, short: "Mar", num: "7" },
  { key: 2, short: "Mer", num: "8" },
  { key: 3, short: "Gio", num: "9" },
  { key: 4, short: "Ven", num: "10" },
  { key: 5, short: "Sab", num: "11" },
  { key: 6, short: "Dom", num: "12" },
];

export const LESSONS = [
  { id: 1, day: 0, time: "07:30", dur: 60, cat: "meditazione", title: "Meditazione del mattino", teacher: "Elena Rigoni", room: "Sala Cerchio", cap: 12, booked: 8 },
  { id: 16, day: 0, time: "12:30", dur: 45, cat: "mindfulness", title: "Pausa mindful", teacher: "Marco Vidal", room: "Sala Quiete", cap: 10, booked: 6 },
  { id: 2, day: 0, time: "18:30", dur: 75, cat: "movimento", title: "Movimento consapevole", teacher: "Marco Vidal", room: "Sala Grande", cap: 16, booked: 16 },
  { id: 3, day: 0, time: "20:00", dur: 90, cat: "crescita", title: "Il coraggio di scegliere · incontro 4/8", teacher: "Sara Bonetti", room: "Sala Cerchio", cap: 14, booked: 9 },
  { id: 4, day: 1, time: "09:00", dur: 60, cat: "mindfulness", title: "Mindfulness e respiro", teacher: "Elena Rigoni", room: "Sala Quiete", cap: 10, booked: 4 },
  { id: 5, day: 1, time: "17:00", dur: 60, cat: "kids", title: "Kids Yoga (6–10 anni)", teacher: "Giulia Ferro", room: "Sala Grande", cap: 12, booked: 11 },
  { id: 6, day: 1, time: "19:00", dur: 75, cat: "cyl", title: "CYLAcademy · Modulo 3: ascolto attivo", teacher: "Andrea Toso", room: "Aula Studio", cap: 20, booked: 13 },
  { id: 17, day: 1, time: "20:30", dur: 60, cat: "meditazione", title: "Meditazione della sera", teacher: "Elena Rigoni", room: "Sala Cerchio", cap: 12, booked: 7 },
  { id: 7, day: 2, time: "07:30", dur: 60, cat: "meditazione", title: "Meditazione del mattino", teacher: "Elena Rigoni", room: "Sala Cerchio", cap: 12, booked: 12 },
  { id: 18, day: 2, time: "17:00", dur: 60, cat: "kids", title: "Kids · Respiro e fantasia (4–6 anni)", teacher: "Giulia Ferro", room: "Sala Quiete", cap: 8, booked: 5 },
  { id: 8, day: 2, time: "18:30", dur: 90, cat: "workshop", title: "Workshop · Scrittura intuitiva", teacher: "Sara Bonetti", room: "Sala Quiete", cap: 10, booked: 6 },
  { id: 19, day: 2, time: "19:00", dur: 75, cat: "movimento", title: "Movimento e respiro", teacher: "Marco Vidal", room: "Sala Grande", cap: 16, booked: 10 },
  { id: 9, day: 3, time: "12:30", dur: 45, cat: "mindfulness", title: "Pausa mindful", teacher: "Marco Vidal", room: "Sala Quiete", cap: 10, booked: 3 },
  { id: 10, day: 3, time: "18:30", dur: 75, cat: "movimento", title: "Movimento consapevole", teacher: "Marco Vidal", room: "Sala Grande", cap: 16, booked: 12 },
  { id: 20, day: 3, time: "20:00", dur: 90, cat: "crescita", title: "Relazioni che nutrono · incontro 2/6", teacher: "Sara Bonetti", room: "Sala Cerchio", cap: 14, booked: 14 },
  { id: 11, day: 4, time: "17:00", dur: 60, cat: "kids", title: "Kids · Piccoli esploratori", teacher: "Giulia Ferro", room: "Sala Grande", cap: 12, booked: 7 },
  { id: 21, day: 4, time: "18:30", dur: 60, cat: "meditazione", title: "Meditazione del tramonto", teacher: "Elena Rigoni", room: "Giardino", cap: 18, booked: 9 },
  { id: 12, day: 4, time: "19:30", dur: 120, cat: "eventi", title: "Cerchio di luna piena", teacher: "Tutto lo staff", room: "Giardino", cap: 30, booked: 24 },
  { id: 13, day: 5, time: "10:00", dur: 90, cat: "meditazione", title: "Meditazione profonda", teacher: "Elena Rigoni", room: "Sala Cerchio", cap: 12, booked: 5 },
  { id: 22, day: 5, time: "11:30", dur: 60, cat: "cyl", title: "CYLAcademy · Laboratorio pratico", teacher: "Andrea Toso", room: "Aula Studio", cap: 20, booked: 8 },
  { id: 14, day: 5, time: "15:00", dur: 180, cat: "workshop", title: "Stage · Voce e presenza", teacher: "Andrea Toso", room: "Sala Grande", cap: 18, booked: 18 },
  { id: 15, day: 6, time: "09:30", dur: 75, cat: "movimento", title: "Risveglio in movimento", teacher: "Giulia Ferro", room: "Giardino", cap: 20, booked: 6 },
  { id: 23, day: 6, time: "18:00", dur: 90, cat: "mindfulness", title: "Chiudere la settimana · pratica e tè", teacher: "Elena Rigoni", room: "Sala Quiete", cap: 12, booked: 10 },
];

export const PLANS = [
  { id: "tessera", name: "Tessera Societaria", sub: "Socio ordinario · valida 365 giorni", price: "25", per: "/anno", note: "Numerata e obbligatoria per partecipare alle attività. I soci onorari la ricevono gratuitamente." },
  { id: "mensile", name: "Mensile", sub: "Accesso ai corsi del mese", price: "55", per: "/mese", note: "Ideale per iniziare o per i mesi estivi. Sconti attivi con coupon e convenzioni." },
  { id: "trimestre", name: "Trimestrale", sub: "3 mesi consecutivi", price: "150", per: "/trim.", note: "Risparmi 15 € rispetto al mensile e mantieni il posto nei corsi a numero chiuso.", hot: true },
  { id: "semestre", name: "Semestrale", sub: "6 mesi consecutivi", price: "280", per: "/sem.", note: "Il più conveniente per chi pratica con costanza. Include priorità sugli stage." },
];

export const QUOTES = [
  { text: "Sono entrata per una lezione di prova e sono rimasta per il cerchio di persone che ho trovato. La meditazione del mattino ha cambiato le mie giornate.", who: "Martina P.", since: "socia dal 2024" },
  { text: "Prenotare dall'app è comodissimo: vedo i posti, mi metto in lista d'attesa e se si libera qualcosa mi arriva l'avviso. Mai più lezioni perse.", who: "Davide R.", since: "socio dal 2025" },
  { text: "Mio figlio aspetta il martedì tutta la settimana. Kids Yoga è l'unico posto dove si ferma dieci minuti… respirando.", who: "Chiara M.", since: "mamma di un piccolo socio" },
];
