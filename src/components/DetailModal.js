//Modal con dettagli show; usa framer-motion per l'animazione
import { motion } from "framer-motion";
import React from "react";

// props:
// - detail: oggetto dettagliato (normalizeDetailItem)
// - onClose: funzione per chiudere la modal

export default function DetailModal({ detail, onClose }) {
  //Se non c'è dettaglio, nulla da mostrare
  if (!detail) return null;

  return (
    //Backdrop cliccabile per chiudere la modal
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      {/* contenitore animato: stop propagation per evitare chiusura quando si clicca all'interno */}
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        style={{
          background: "var(--modal-bg, #fff)",
          borderRadius: 8,
          padding: 20,
          maxWidth: 800,
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <div style={{ display: "flex", gap: 16 }}>
          {detail.poster && (
            <img src={detail.poster} alt={detail.title} width="220" />
          )}
          <div>
            <h2>
              {detail.title} ({detail.year})
            </h2>
            <p>
              <b>Generi:</b> {detail.genres.join(", ")}
            </p>
            {/* summaryHTML è HTML — uso dangerouslySetInnerHTML perché TVMaze fornisce markup */}
            <div dangerouslySetInnerHTML={{ __html: detail.summaryHTML }} />
            <p>
              <b>Runtime:</b> {detail.runtime} min - <b>Status:</b>{" "}
              {detail.status}
            </p>
            <p>
              <a href={detail.officialSite} target="_blank" rel="noreferrer">
                Sito ufficiale
              </a>
            </p>
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button onClick={onClose}>Chiudi</button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
