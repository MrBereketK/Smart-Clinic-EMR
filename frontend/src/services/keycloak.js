import Keycloak from "keycloak-js";

// Configuration for your local Gasha Mapper instance
const keycloakConfig = {
  url: "http://localhost:8080",
  realm: "smart-clinic",
  clientId: "emr-frontend",
};

const keycloak = new Keycloak(keycloakConfig);

export const initKeycloak = (onAuthenticatedCallback) => {
  keycloak
    .init({
      onLoad: "login-required",
      pkceMethod: "S256",
      checkLoginIframe: false,
    })
    .then((authenticated) => {
      if (authenticated) {
        console.log(
          "Authenticated with Gasha Mapper. Contextual token received.",
        );
        console.log("ACTUAL TOKEN:", keycloak.token);
      } else {
        console.warn("User is not authenticated.");
      }
      onAuthenticatedCallback(authenticated);
    })
    .catch((error) => {
      console.error("Gasha Mapper initialization failed:", error);
    });
};

// This is the line that went missing!
export default keycloak;
