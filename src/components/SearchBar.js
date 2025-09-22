//Component che mostra l'input di testo per la ricerca e la select per filtro genere.

import React from "react";

// props:
// - query: stringa attuale di ricerca
// - setQuery: setter per aggiornare query
// - genres: array dei generi disponibili
// - selectedGenre: genere selezionato per il filtro
// - setSelectedGenre: setter per il filtro

export default function SearchBar({
  query,
  setQuery,
  genres,
  selectedGenre,
  setSelectedGenre,
}) {
  //Input di testo e select per genere (opzionale)
  return (
    <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
      {/* input testo: memorizza il valore tramite setQuery */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cerca film o serie..."
        style={{ padding: 8, flex: 1 }}
        aria-label="Cerca"
      />

      {/* Select per filtro genere */}
      <select
        value={selectedGenre}
        onChange={(e) => setSelectedGenre(e.target.value)}
        style={{ padding: 8 }}
        aria-label="Filtro genere"
      >
        {/* opzione per vedere tutti i generi */}
        <option value="">Tutti i generi</option>
        {/* mappa dei generi disponibili */}
        {genres.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>
    </div>
  );
}
