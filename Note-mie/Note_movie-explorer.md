- npx create-react-app movie-explorer
- cd movie-explorer

All'interno della directory src ho creato altre 3 directory rispettivamente chiamate:

- api
- components
- hooks

All'interno della cartella API ho creato un file js chiamato tvmazeAdapter in cui ho inserito l'Adapter (con le funzioni per searchTitles e getTitleById) fornito dal docente, dentro la cartella components ci sono 4 file js rispettivamente chiamati: DetailModal, ResultCard, ResultsList,SearchBar, dentro la cartella hooks ci sono 3 file js chiamati useDebounce, useLocalStorage.
Si potrebbero cancellare tutti file che non servono tranne index.js, App.js ed index.css.

Nel file tvmazeAdapter.js è stata aggiunta questa istruzione (dichiarazione) poichè normalized non è definito altrimenti const totalResults = normalized.length non funziona.

//Normalizza i risultati
- const normalized = data.map((d) => normalizeSearchItem(d.show));

**Obiettivi Didattici:**

1. useState e useEffect
2. React_MovieExplorer_TVMaze
3. Chiamate API con fetch (via adapter)
4. React_MovieExplorer_TVMaze_Adapter
5. Barra di ricerca con debounce (useDebounce)
6. Lista risultati con titoli e poster
7. Dettaglio con trama e generi (DetailModal)
8. Gestione preferiti in localStorage (useLocalStorage)

Per avviare il progetto:

- npm start

**Per sviluppare gli Extra (Opzionali)**

- Paginazione dei risultati (client-side). - Filtri per genere. - Toggle dark/light mode. - Animazioni con libreria `framer-motion`.

Installare frame-motion:

- npm install framer-motion
- npm start

Ho creato all'interno della cartella hooks il file js chiamato useTheme ed in components ho aggiunto il file js ThemeToggle.

1. Paginazione client-side: ResultsList + calcolo visible in App.js + controlli Prev/Next.
2. Filtri per genere: SearchBar include ```<select>``` con tutti i generi rilevati dalla ricerca; App.js filtra rawResults.
3. Theme dark/light: useTheme hook, ThemeToggle componente, stili CSS con variabili; tema persistente in localStorage.
4. Animazioni: con libreria 'frame-motion' usato in ResultCard, ResultsList (AnimatePresence) e DetailModal.

Una volta eseguito con ```npm start``` si dovrebbero vedere i risultati (fino a 10) e potere navigare tra le pagine con Prev/Next.Nel ```<select>```del genere, si può scegliere un genere per filtrare i risultati. Si può  cliccare su un titolo e appare il modal animato con i dettagli, è possibile inoltre cliccare su ❤ per aggiungere ai preferiti e verificare che compaia nella sezione Preferiti.Infine si può cambiare tema con il bottone (🌞/🌙) e ricaricare la pagina: il tema dovrebbe persistere.

____



**Test(api/tvmazeAdapter.test.js)**



- npm test
- npm test -- --watchAll

  
``` npm test -- --watchAll```Esegue manualmente tutti i test senza watch mode,si utlizza questo comando quando Jest da errore. Jest gira in modalità watch mode e poichè per impostazione predefinita, esegue solo i test che riguardano i file modificati rispetto all’ultimo commit e se non sono stati modificati i file con test associati, Jest restituisce “No tests found” perché non trova test “collegati” alle modifiche.

Il test chiama [TVMaze](https://api.tvmaze.com). Ciò significa che controlla se l’adapter (searchTitles, getTitleById) funziona.
Utile per capire se ci sono errori di fetch, normalizzazione o se l’API ha cambiato risposta. Se l’API non risponde (es. offline, server giù), Jest (framework di testing per JS già integrato di default in create React App)segnala un errore in rosso; se l'API cambia formato (es. rimuove un campo) i test falliscono, altrimenti se è tutto ok segnala in verde.
