//Hook per gestire tema (light/dark) e salvarlo in localStorage
import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

export default function useTheme() {
  //SavedTheme è 'light' o 'dark'; di default è "light"
  const [theme, setTheme] = useLocalStorage("theme", "light");

  //Effetto che applica classe CSS all'elemento root (HTML) quando cambia il tema
  useEffect(() => {
    //Rimuove eventuali classi precedenti
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme); //Aggiunge la classe corretta
  }, [theme]);

  //Toggle rapido, funzione per alternare il tema
  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  //Esporta il tema ed il toggle
  return { theme, toggleTheme, setTheme };
}
