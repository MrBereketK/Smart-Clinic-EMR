const Patient = require("../models/Patient");

// @desc    Create a new patient
// @route   POST /api/patients
// @access  Protected
const createPatient = async (req, res) => {
  try {
    // 1. Extract the user ID (sub) from the Keycloak token
    // This ensures we always know exactly which staff member registered the patient
    const registeredBy = req.kauth.grant.access_token.content.sub;

    // 2. Create the patient document
    const newPatient = new Patient({
      ...req.body,
      registeredBy,
    });

    // 3. Save to MongoDB
    const savedPatient = await newPatient.save();

    res.status(201).json(savedPatient);
  } catch (error) {
    console.error("Error creating patient:", error.message);
    res.status(400).json({ error: error.message });
  }
};

// @desc    Get all patients
// @route   GET /api/patients
// @access  Protected
const getPatients = async (req, res) => {
  try {
    // Retrieve all patients, sorted by newest first
    const patients = await Patient.find().sort({ createdAt: -1 });
    res.status(200).json(patients);
  } catch (error) {
    console.error("Error fetching patients:", error.message);
    res
      .status(500)
      .json({ error: "Server Error: Could not retrieve patients" });
  }
};

// @desc    Get a single patient by ID
// @route   GET /api/patients/:id
// @access  Protected
const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    res.status(200).json(patient);
  } catch (error) {
    console.error("Error fetching patient:", error.message);
    res
      .status(500)
      .json({ error: "Server Error: Invalid ID or database issue" });
  }
};

// Update an existing patient
const updatePatient = async (req, res) => {
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true } // Returns the updated document and checks validation
    );
    
    if (!updatedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    
    res.status(200).json(updatedPatient);
  } catch (error) {
    res.status(400).json({ message: 'Error updating patient', error: error.message });
  }
};

// Delete a patient
const deletePatient = async (req, res) => {
  try {
    const deletedPatient = await Patient.findByIdAndDelete(req.params.id);
    
    if (!deletedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    
    res.status(200).json({ message: 'Patient successfully deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting patient', error: error.message });
  }
};

// Add a medical note to a patient's file
const addMedicalNote = async (req, res) => {
  try {
    // Extract the note details from the request body
    const { doctorName, note, prescription } = req.body;
    
    // Use $push to append the note to the medicalNotes array
    const updatedPatient = await Patient.findByIdAndUpdate(
      req.params.id,
      { 
        $push: { 
          medicalNotes: { doctorName, note, prescription } 
        } 
      },
      { new: true, runValidators: true } // Return the updated document
    );
    
    if (!updatedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    
    res.status(200).json(updatedPatient);
  } catch (error) {
    res.status(400).json({ message: 'Error adding medical note', error: error.message });
  }
};

module.exports = {
  createPatient,
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient,
  addMedicalNote // <-- Don't forget to export it!
};
