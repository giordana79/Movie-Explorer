//Lista di risultati con paginazione client-side e animazioni
import ResultCard from "./ResultCard";
import { AnimatePresence } from "framer-motion";
import React from "react";

// props:
// - results: array di elementi visibili nella pagina corrente
// - onSelect: funzione per aprire dettaglio
// - favorites: array dei preferiti
// - toggleFavorite: funzione per aggiungere/rimuovere preferiti
// - page, setPage, totalPages: stati per la paginazione

export default function ResultsList({
  results, //Array di risultati attualmente visualizzati (dopo filtro & paginazione)
  onSelect,
  favorites,
  toggleFavorite,
  page, //Pagina corrente
  setPage, //Setter pagina
  totalPages, //Numero totale di pagine
}) {
  return (
    <section>
      {/* Lista animata gestisce il montaggio/smontaggio animato degli item */}
      <AnimatePresence>
        {results.map((item) => (
          <ResultCard
            key={item.id}
            item={item}
            onSelect={onSelect}
            isFavorite={favorites.some((f) => f.id === item.id)}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </AnimatePresence>

      {/* Pagina: controllo prec/next */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 8,
          marginTop: 16,
        }}
      >
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page <= 1}
        >
          ← Prev
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span>Pagina</span>
          <strong>{page}</strong>
          <span>di</span>
          <strong>{totalPages}</strong>
        </div>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page >= totalPages}
        >
          Next →
        </button>
      </div>
    </section>
  );
}
