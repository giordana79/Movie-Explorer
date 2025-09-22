//App principale: coordina gestione query, debounce, fetch tramite adapter,
// filtri per genere, paginazione client-side, preferiti, tema e modal dettaglio.

//Import delle funzioni dell'adapter per interagire con TVMaze
import React, { useEffect, useMemo, useState } from "react";
import { searchTitles, getTitleById } from "./api/tvmazeAdapter";
//Hook utili
import useDebounce from "./hooks/useDebounce";
import useLocalStorage from "./hooks/useLocalStorage";
import useTheme from "./hooks/useTheme";
//Componenti UI
import SearchBar from "./components/SearchBar";
import ResultsList from "./components/ResultsList";
import DetailModal from "./components/DetailModal";
import ThemeToggle from "./components/ThemeToggle";

//Funzione componente principale
export default function App() {
  //Stato: query di ricerca (input)
  const [query, setQuery] = useState("");
  //Stato: rawResults con i risultati normalizzati dal adapter (prima di filtro/paginazione)
  const [rawResults, setRawResults] = useState([]);
  //Stato: loading e error per feedback all'utente
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //Dettaglio show selezionato
  const [detail, setDetail] = useState(null);

  //Preferiti persistiti con il nostro hook useLocalStorage
  const [favorites, setFavorites] = useLocalStorage("favorites", []);

  //Tema: hook custom che legge/scrive in localStorage e applica classe al root
  const { theme, toggleTheme } = useTheme();

  //Debounce della query per evitare chiamate ad ogni battuta
  const debouncedQuery = useDebounce(query, 600);

  //Paginazione client-side: pagina corrente e dimensione pagina
  const [page, setPage] = useState(1);
  const pageSize = 10; // deve rispecchiare ciò che è usato nell'adapter

  //Filtro per genere: stringa o vuoto (tutti)
  const [selectedGenre, setSelectedGenre] = useState("");

  //Elenco di generi disponibili calcolato dai risultati
  const genres = useMemo(() => {
    //Colleziona tutti i generi unici presenti in rawResults
    const setG = new Set();
    rawResults.forEach((r) => {
      (r.genres || []).forEach((g) => setG.add(g));
    });
    //Ritorna array ordinato dei generi unici
    return Array.from(setG).sort();
  }, [rawResults]);

  //Effetto: quando cambia la query debounced, effettua la ricerca
  useEffect(() => {
    //Se stringa vuota, resetto risultati e pagina
    if (!debouncedQuery) {
      setRawResults([]);
      setPage(1);
      return;
    }

    //Chiamata API attraverso l'adapter
    setLoading(true);
    setError(null);
    //searchTitles ritorna { items, totalResults, totalPages }
    searchTitles(debouncedQuery, 1)
      .then((res) => {
        setRawResults(res.items); //Salva risultati normalizzati (tutti)
        setPage(1); //Reset pagina a 1 ad ogni nuova ricerca
      })
      .catch((err) => setError(err.message || "Errore ricerca"))
      .finally(() => setLoading(false));
  }, [debouncedQuery]);

  //Funzione per aprire il dettaglio: chiama getTitleById e mostra modal
  const handleSelect = async (id) => {
    try {
      setLoading(true);
      const d = await getTitleById(id);
      setDetail(d);
    } catch (err) {
      setError(err.message || "Errore dettaglio");
    } finally {
      setLoading(false);
    }
  };

  //Toggle preferiti: aggiunge se non è presente,rimuove se già c'è
  const toggleFavorite = (item) => {
    setFavorites((prev) =>
      prev.some((f) => f.id === item.id)
        ? prev.filter((f) => f.id !== item.id)
        : [...prev, item]
    );
  };

  //Filtraggio per genere applicato sui rawResults
  const filtered = useMemo(() => {
    if (!selectedGenre) return rawResults;
    return rawResults.filter((r) => (r.genres || []).includes(selectedGenre));
  }, [rawResults, selectedGenre]);

  //Paginazione: calcola totale pagine e items per pagina
  const totalResults = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalResults / pageSize));

  //Se la pagina corrente è maggiore del numero di pagine (es. dopo filtro), resetta a 1
  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages, page]);

  //Calcolo dei risultati visibili nella pagina corrente (slice)
  const visible = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  //Render UI
  return (
    <div
      style={{
        padding: 20,
        minHeight: "100vh",
        background: theme === "dark" ? "#111" : "#f7f7f7",
        color: theme === "dark" ? "#eee" : "#111",
      }}
    >
      {/* Header con titolo e toggle tema */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 16,
        }}
      >
        <h1 style={{ margin: 0 }}>🎬 Movie/Series Explorer</h1>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          {/* Theme Toggle */}
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
      </header>

      {/* SearchBar con filtro genere */}
      <SearchBar
        query={query}
        setQuery={setQuery}
        genres={genres}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
      />

      {/* Stato caricamento / error */}
      {loading && <p>Caricamento...</p>}
      {error && <p style={{ color: "salmon" }}>{error}</p>}

      {/* Lista risultati con paginazione */}
      <ResultsList
        results={visible}
        onSelect={handleSelect}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
      />

      {/* Preferiti: mostra una lista compatta senza paginazione */}
      <section style={{ marginTop: 24 }}>
        <h2>Preferiti</h2>
        {favorites.length === 0 ? (
          <p>Nessun preferito</p>
        ) : (
          <div>
            {favorites.map((f) => (
              <div
                key={f.id}
                style={{ padding: 8, borderBottom: "1px solid #ddd" }}
              >
                <strong>{f.title}</strong> ({f.year})
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Modal dettaglio show */}
      <DetailModal detail={detail} onClose={() => setDetail(null)} />
    </div>
  );
}
