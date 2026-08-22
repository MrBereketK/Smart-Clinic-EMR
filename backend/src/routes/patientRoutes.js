const express = require("express");
const {
  createPatient,
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient,
  addMedicalNote, // <-- Add it to the import
} = require("../controllers/patientController");

const router = express.Router();

// Existing routes
router.post("/", createPatient);
router.get("/", getPatients);
router.get("/:id", getPatientById);
router.put("/:id", updatePatient);
router.delete("/:id", deletePatient);

// --> NEW ROUTE for Medical Notes
router.post("/:id/notes", addMedicalNote);

module.exports = router;
