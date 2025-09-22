//Test Jest per tvmazeAdapter per verificare che l'adapter
//interagisca correttamente con l'API
import { searchTitles, getTitleById } from "./tvmazeAdapter";

//Aumento il timeout perché fetch verso API esterne può essere lento
jest.setTimeout(15000);

//Gruppo di test per l'adapter
describe("tvmazeAdapter (API reale)", () => {
  //Test: searchTitles con query 'matrix' deve restituire risultati validi
  test("searchTitles('matrix') ritorna almeno 1 risultato valido", async () => {
    //Chiama la funzione che usa fetch verso TVMaze
    const res = await searchTitles("matrix");

    //expect() serve per verificare i valori
    expect(res.items.length).toBeGreaterThan(0);

    //Controlla che ci siano risultati almeno un item nell'array items
    //Controlla che i campi principali siano presenti
    const first = res.items[0];
    expect(first).toHaveProperty("id");
    expect(first).toHaveProperty("title");
    expect(first).toHaveProperty("year");
    expect(first).toHaveProperty("rating");
  });

  //Test: getTitleById(1) deve restituire un oggetto dettaglio con campi essenziali
  test("getTitleById(1) ritorna dettagli corretti per uno show", async () => {
    const detail = await getTitleById(1);

    //L'id deve essere proprio 1
    expect(detail.id).toBe(1);

    //Controllo che risultino i campi principali
    expect(detail).toHaveProperty("title");
    expect(detail).toHaveProperty("summaryHTML");
    expect(Array.isArray(detail.genres)).toBe(true);
  });
});
