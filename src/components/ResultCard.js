// Card singola che mostra poster, titolo, generi, rating e bottone preferiti.
// Usa framer-motion per animazioni base (entrata/hover).
import { motion } from "framer-motion";
import React from "react";

// props:
// - item: oggetto normalizzato (id, title, year, poster, rating, genres)
// - onSelect: funzione chiamata con item.id quando si clicca sul titolo
// - isFavorite: booleano se l'item è preferito
// - toggleFavorite: funzione per aggiungere/rimuovere dai preferiti

export default function ResultCard({
  item,
  onSelect,
  isFavorite,
  toggleFavorite,
}) {
  //Motion.div per animazione apparizione/hover
  return (
    <motion.div
      layout //Abilita animazioni layout (quando cambia posizione)
      initial={{ opacity: 0, y: 6 }} //Iniziale: leggero spostamento e trasparenza
      animate={{ opacity: 1, y: 0 }} //Animazione d'entrata
      exit={{ opacity: 0, y: -6 }} //Animazione di uscita
      whileHover={{ scale: 1.02 }} //Hover leggero,leggero ingrandimento al passaggio del mouse
      style={{
        border: "1px solid var(--card-border, #ddd)",
        padding: 12,
        marginBottom: 12,
        display: "flex",
        gap: 12,
        borderRadius: 8,
        background: "var(--card-bg, #fff)",
        alignItems: "center",
      }}
    >
      {/* mostra immagine se disponibile, altrimenti placeholder */}
      {item.poster ? (
        <img
          src={item.poster}
          alt={item.title}
          width="80"
          style={{ borderRadius: 4 }}
        />
      ) : (
        <div
          style={{
            width: 80,
            height: 120,
            background: "#eee",
            borderRadius: 4,
          }}
        />
      )}

      {/* Contenuto principale */}
      <div style={{ flex: 1 }}>
        {/* Titolo cliccabile per aprire dettagli */}
        <h3
          onClick={() => onSelect(item.id)}
          style={{ margin: 0, cursor: "pointer", userSelect: "none" }}
        >
          {item.title} <small>({item.year})</small>
        </h3>
        {/* Generi sotto il titolo */}
        <p style={{ margin: "6px 0" }}>{item.genres?.join(", ")}</p>

        {/* Linea con rating e bottone preferiti */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div>⭐ {item.rating ?? "N/A"}</div>
          <button
            onClick={() => toggleFavorite(item)}
            aria-pressed={isFavorite}
          >
            {isFavorite ? "Rimuovi" : "❤ Preferito"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
