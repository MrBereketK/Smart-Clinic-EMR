const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    // --- 1. Core Demographics ---
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Date of birth is required"],
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other", "Prefer not to say"],
      required: true,
    },

    // --- 2. Contact & Location ---
    contactInfo: {
      phone: {
        type: String,
        required: [true, "Primary phone number is required"],
      },
      email: {
        type: String,
        lowercase: true,
        trim: true,
      },
    },
    address: {
      street: String,
      city: String,
      region: String,
    },

    // --- 3. Emergency Support ---
    emergencyContact: {
      name: String,
      relationship: String,
      phone: String,
    },

    // --- 4. Clinical Baseline (Flexible Arrays) ---
    allergies: [
      {
        type: String,
        trim: true,
      },
    ],
    bloodType: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Unknown"],
      default: "Unknown",
    },

    // We can link the Keycloak user ID of the doctor who registered them
    registeredBy: {
      type: String,
      required: true,
      select: false, // Hides this field from standard API responses by default
    },

    // --- 5. Medical History ---
    medicalNotes: [
      {
        date: { type: Date, default: Date.now },
        doctorName: { type: String, required: true },
        note: { type: String, required: true },
        prescription: { type: String },
      },
    ],
  },
  {
    // Automatically adds 'createdAt' and 'updatedAt' fields
    timestamps: true,
  },
);

// Virtual property for full name (doesn't get saved to DB, just computed on the fly)
patientSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Ensure virtuals are included when converting the document to JSON
patientSchema.set("toJSON", { virtuals: true });
patientSchema.set("toObject", { virtuals: true });

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
