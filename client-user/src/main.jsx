import React from "react";
import ReactDOM from "react-dom/client";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import App from "./App";
import { Toaster } from "react-hot-toast";

import "./index.css";

import { AuthProvider }
from "./context/AuthContext";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>

    <AuthProvider>

      <App />
      <Toaster position="top-center" />

    </AuthProvider>

  </React.StrictMode>
);