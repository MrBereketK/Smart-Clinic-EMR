import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { initKeycloak } from "./services/keycloak.js";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

// We wait for the Gasha Mapper to initialize before rendering the app
initKeycloak((authenticated) => {
  if (authenticated) {
    // If Keycloak says we are good, render the full application
    root.render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
  } else {
    // If not authenticated, Keycloak's 'login-required' setting will automatically
    // redirect the user. We just show a quick loading state while that happens.
    root.render(
      <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
        <h1 className="text-xl font-semibold text-primary-600">
          Securing session via Gasha Mapper...
        </h1>
      </div>,
    );
  }
});
