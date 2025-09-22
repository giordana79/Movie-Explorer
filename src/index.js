// Entry point standard Create React App — monta il componente App sull'elemento root
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; //Per aggiungere stili globali (ad es. variabili per light/dark)

//Render dell'app in React.StrictMode per aiutare a intercettare potenziali problemi
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
