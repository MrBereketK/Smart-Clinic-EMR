const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // We will define this URI in our .env file
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

// Optional but highly recommended: Listen for connection drops
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected!");
});

module.exports = connectDB;
