//Hook per sincronizzare uno stato React con localStorage del browser
import { useState, useEffect } from "react";

export default function useLocalStorage(key, initialValue) {
  //Stato iniziale: cerca in localStorage, altrimenti usa initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key); //Legge da localStorage
      return item ? JSON.parse(item) : initialValue; //Se esiste, parse; altrimenti valore iniziale
    } catch {
      return initialValue; //Fallback in caso di errore
    }
  });

  //Ogni volta che storedValue cambia, aggiorna e salva su localStorage
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch {
      //Ignora in caso di errore di scrittura
    }
  }, [key, storedValue]);

  //Ritorna coppia [valore, setter] simile a useState
  return [storedValue, setStoredValue];
}
