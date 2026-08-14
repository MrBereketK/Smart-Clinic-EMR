import Keycloak from "keycloak-js";

// Configuration for your local Gasha Mapper instance
const keycloakConfig = {
  url: "http://localhost:8080", // The AI-driven Keycloak backend
  realm: "smart-clinic", // Update this if your Keycloak realm is named differently
  clientId: "emr-frontend", // Update this to match your Keycloak Client ID
};

const keycloak = new Keycloak(keycloakConfig);

/**
 * Initializes the Keycloak instance.
 * We will call this in main.jsx to wrap the application in our Zero-Trust auth layer.
 */
export const initKeycloak = (onAuthenticatedCallback) => {
  keycloak
    .init({
      onLoad: "login-required", // Forces redirect to Keycloak if no valid token exists
      pkceMethod: "S256", // Best practice for SPA security
      checkLoginIframe: false, // Disabling for local development simplicity
    })
    .then((authenticated) => {
      if (authenticated) {
        console.log(
          "Authenticated with Gasha Mapper. Contextual token received.",
        );
      } else {
        console.warn("User is not authenticated.");
      }
      onAuthenticatedCallback(authenticated);
    })
    .catch((error) => {
      console.error("Gasha Mapper initialization failed:", error);
    });
};

export default keycloak;
