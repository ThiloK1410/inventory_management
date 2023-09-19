import "@fortawesome/fontawesome-free/css/fontawesome.css";
import "@fortawesome/fontawesome-free/css/solid.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/viva-light/theme.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app/app.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
