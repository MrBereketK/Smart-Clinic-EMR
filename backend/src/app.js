const express = require("express");
const cors = require("cors");
const session = require("express-session");
const Keycloak = require("keycloak-connect");

const app = express();

// Basic Middleware
app.use(cors());
app.use(express.json());

// Set up Keycloak memory store
const memoryStore = new session.MemoryStore();
app.use(
  session({
    secret: "smart-clinic-super-secret",
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
  }),
);

// Initialize Keycloak using the config file
// Note: We point it to the config folder now!
const keycloak = new Keycloak(
  { store: memoryStore },
  "./src/config/keycloak.json",
);
app.use(keycloak.middleware());

// --- SECURE ROUTE TEST ---
app.get("/api/health", keycloak.protect(), (req, res) => {
  // Extract custom Gasha AI Risk Data
  const token = req.kauth.grant.access_token.content;
  const riskLevel = token.risk_level || "UNKNOWN";

  if (riskLevel === "HIGH") {
    return res
      .status(403)
      .json({ error: "Access denied due to HIGH risk evaluation." });
  }

  res.json({
    message: "Secure connection successful!",
    user: token.preferred_username,
    risk_level: riskLevel,
  });
});


// --- PATIENT ROUTES ---
const patientRoutes = require("./routes/patientRoutes");

// Protect the entire /api/patients route group and require the 'receptionist' or 'doctor' role
app.use(
  "/api/patients",
  keycloak.protect(["realm:receptionist", "realm:doctor"]),
  patientRoutes,
);

module.exports = app;
