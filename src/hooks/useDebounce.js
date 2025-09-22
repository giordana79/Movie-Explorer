//Hook per "debounce" di un valore: utile per ricerca (attende la digitazione, cosi evita
//la chiamata API per ogni lettera digitata)
import { useState, useEffect } from "react";

//Value è il valore da debouncizzare con un delay di 500 ms
export default function useDebounce(value, delay = 500) {
  //Memorizza la versione debounced del valore di value
  const [debounced, setDebounced] = useState(value);

  //UseEffect si attiva ogni volta che value o delay cambiano, imposto il timer per aggiornare debounced
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay); //Aggiorna dopo delay
    return () => clearTimeout(handler); //Pulizia: cancella timeout se value cambia prima
  }, [value, delay]);

  //Ritorna il valore "debounced"
  return debounced;
}
