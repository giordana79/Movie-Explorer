//Adapter per l'API TVMaze: fornisce funzioni searchTitles e getTitleById
const API_URL = "https://api.tvmaze.com"; // URL base dell'API

//Ricerca show per titolo (no key richiesta)query: string di ricerca dell'utente
//Page: pagina lato client che voglio simulare
//(TVMaze /search non fornisce paginazione nativa)
export async function searchTitles(query, page = 1) {
  //Se la query è vuota o solo spazi, ritorna insieme vuoto (no fetch)
  if (!query?.trim()) {
    return { items: [], totalResults: 0, totalPages: 0 };
  }

  //Effettua la chiamata all'endpoint di ricerca con encodeURIComponent per sicurezza.
  const res = await fetch(
    `${API_URL}/search/shows?q=${encodeURIComponent(query)}`
  );
  //Se la risposta non è ok, lancia un errore gestito dal chiamante
  if (!res.ok) throw new Error("Errore nella chiamata di ricerca");
  //Parse JSON: ottiene array in questa forma { score, show }
  const data = await res.json(); // [{ score, show }, ...]

  //Normalizza i risultati per l'UI: mantiene solo i campi utili,
  //cioè trasforma l'array di raw show in oggetti (UI)
  const normalized = data.map((d) => normalizeSearchItem(d.show));

  //Paginazione client-side: 10 risultati per pagina
  const pageSize = 10;
  const totalResults = normalized.length;
  const totalPages = Math.max(1, Math.ceil(totalResults / pageSize));
  const start = (page - 1) * pageSize;
  const items = normalized.slice(start, start + pageSize);

  //Ritorna oggetti utili per l'interfaccia (items, totale, pagine)
  return { items, totalResults, totalPages };
}

//Dettaglio show per ID
//L'id è l'identificatore numero fornito da TVMaze
export async function getTitleById(id) {
  //(Richiesta all'endpoint) - Fetch del dettaglio via /shows/:id
  const res = await fetch(`${API_URL}/shows/${id}`);
  if (!res.ok) throw new Error("Errore nel caricamento del dettaglio");
  //Parse della risp raw
  const raw = await res.json();
  //Normalizza il dettaglio per l'UI
  return normalizeDetailItem(raw);
}

//Normalizzazioni (UI-friendly)
//Queste funzioni estraggono i campi utili e offrono
//fallback in caso di dati mancanti.
function normalizeSearchItem(show) {
  //show: oggetto raw restituito dall'API TVMaze per uno show
  //Map degli show restituiti dalla ricerca in un oggetto più compatto
  return {
    id: show.id, //Id numerico
    title: show.name, //Nome dello show
    year: show.premiered ? show.premiered.slice(0, 4) : "—", //Premiered: string "YYYY-MM-DD" se presente estrae anno
    type: show.type || "series", //Tipo (serie, etc.)
    poster: show.image?.medium || show.image?.original || null, //Poster
    rating: show.rating?.average ?? null, //Rating numerico o null
    genres: show.genres || [], //Generi (per filtro lato client)
  };
}

function normalizeDetailItem(show) {
  //Normalizzazione più completa per la vista dettaglio
  return {
    id: show.id,
    title: show.name,
    year: show.premiered ? show.premiered.slice(0, 4) : "—",
    genres: show.genres || [],
    summaryHTML: show.summary || "",
    poster: show.image?.original || show.image?.medium || null,
    rating: show.rating?.average ?? null,
    status: show.status,
    language: show.language,
    runtime: show.runtime,
    premiered: show.premiered,
    officialSite: show.officialSite || show.url, //Link ufficiale o fallback a url di TVMaze
  };
}
