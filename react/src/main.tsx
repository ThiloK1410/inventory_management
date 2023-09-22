import "@fortawesome/fontawesome-free/css/fontawesome.css";
import "@fortawesome/fontawesome-free/css/solid.css";
import axios from "axios";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/viva-light/theme.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app/app.tsx";
import "./index.css";

axios.defaults.headers.common["X-CSRFToken"] = document.cookie
  .split("; ")
  .filter(cookie => cookie.startsWith("csrftoken="))
  .map(cookie => cookie.split("=")[1])[0];

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
