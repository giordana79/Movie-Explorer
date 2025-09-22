//Bottone che cambia tema; usa useTheme dall'App
import React from "react";

// props: theme (string) e toggleTheme (funzione)
export default function ThemeToggle({ theme, toggleTheme }) {
  return (
    <button
      onClick={toggleTheme}
      style={{ marginLeft: "auto" }}
      aria-label="Toggle tema"
    >
      {theme === "light" ? "🌞 Light" : "🌙 Dark"}
    </button>
  );
}
