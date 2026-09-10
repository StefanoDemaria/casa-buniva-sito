# Casa Buniva — sito di anteprima

Sito statico (HTML + CSS + JS puri, nessuna build necessaria) per il locale Casa Buniva a Torino.
Direzione visiva: **nero / oro / marrone** — nero e marrone caldo come fondo, oro anticato come accento, niente pattern ripetuti in sottofondo.

## Struttura del progetto

```
casa-buniva-sito/
├── index.html            pagina unica del sito
├── css/style.css          tutti gli stili
├── js/script.js           navbar, scroll a sezioni, reveal, carosello recensioni, fallback foto
├── images/
│   ├── hero-video.mp4      video di sfondo della Soglia (in loop, muto)
│   ├── hero-poster.jpg     fotogramma estratto dal video stesso, mostrato finché il video non parte (evita lo "sfarfallio" tra foto e video)
│   ├── bottega.jpg         foto reale usata in "La Bottega" e in "Galleria"
│   ├── favicon.svg         icona del sito
│   └── dettaglio-bottiglie.jpg, dettaglio-bancone.jpg, cocktail-hero.jpg   altre foto reali del locale
└── README.md
```

## Come vederlo in anteprima

Basta un piccolo server locale (aprire `index.html` direttamente da file:// funziona quasi tutto, ma alcuni browser bloccano mappe/font senza un server). Dalla cartella del progetto:

```
python3 -m http.server 8000
```

poi apri `http://localhost:8000` nel browser. Per pubblicarlo online basta caricare l'intera cartella su un hosting statico qualsiasi (Netlify, Vercel, GitHub Pages, o lo spazio hosting che userà il locale).

## Foto e video: tutti reali

Tutte le foto e il video del sito sono ora quelli veri del locale (nessuna illustrazione segnaposto rimasta): `bottega.jpg` era già una delle foto inviate in chat; `dettaglio-bottiglie.jpg`, `dettaglio-bancone.jpg`, `cocktail-hero.jpg` e `hero-video.mp4` sono i file aggiunti successivamente. Tutti i file immagine sono stati ridimensionati e compressi per il web (JPEG qualità 80, larghezza massima 900-1600px a seconda dell'uso), e il video è stato ricompresso senza audio (era comunque muto in pagina) portandolo da 6 MB a circa 600 KB, per un caricamento rapido.

Il poster dell'hero (`hero-poster.jpg`) è un fotogramma estratto direttamente dal video (non una foto separata come in origine): così, mentre il video si carica, si vede un'immagine identica al primo istante del video stesso, ed è un caricamento fluido invece di uno "sfarfallio" tra due immagini diverse.

Il sistema di fallback (`.photo-frame` / `.ph-fallback` in `js/script.js`) resta comunque attivo: se in futuro un file mancasse o venisse rinominato per errore, al suo posto compare un'illustrazione al posto di un'icona di immagine rotta, così il sito non si rompe mai visivamente.

Per sostituire una foto in futuro basta salvare il nuovo file in `images/` con lo stesso nome di quello attuale — nessuna modifica al codice necessaria.

## Dati segnaposto da sostituire prima di andare online

- **Indirizzo** (`index.html`, sezione `#indirizzo`): **confermato** — "Via Michele Buniva, 13, 10124 Torino". Mappa e link "Apri in Google Maps" puntano già a questo indirizzo (il link usa la scheda esatta del locale su Google Maps).
- **Telefono**: **confermato** — `334 769 1900`.
- **Orari**: **confermati** — dalla scheda Google del locale.
- **Email**: `info@casabuniva.it` — ancora **inventata**, da sostituire con quella vera.
- **Social**: link a `instagram.com/casabuniva` e `facebook.com/casabuniva` — ancora **inventati**, da verificare/correggere.
- **Recensioni** (sezione "Voci della Sera"): esempi scritti da me, nessuna recensione reale è stata trovata online. Segnalato anche in pagina con una piccola nota. Da sostituire con recensioni vere (Google/TripAdvisor) appena disponibili.
- **Menu cocktail**: inventato su richiesta, a tema piemontese/torinese. Da sostituire con la carta reale del locale.

## Note tecniche

- Font da Google Fonts (Cinzel, Poiret One, Work Sans) caricati via `<link>` in `index.html` — serve connessione internet.
- Navbar fissa in alto, nera semi-trasparente con sfocatura (`backdrop-filter`), sempre visibile durante lo scroll; su schermi stretti diventa un menu a comparsa (icona hamburger).
- Effetto "stanza dopo stanza": `scroll-snap` CSS sul contenitore `.scroller`, con animazioni di comparsa via `IntersectionObserver` in `js/script.js` (funzionano scorrendo sia in giù che in su).
- Il carosello recensioni scorre in loop continuo via CSS `animation` e si ferma al passaggio del mouse (o al tocco su mobile).
- Nessuna dipendenza esterna oltre ai font — nessun framework, nessuna build.
