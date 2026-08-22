require("dotenv").config(); // Load environment variables first
const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 3000;

// Connect to the database, THEN start the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Smart Clinic API is running on port ${PORT}`);
    console.log(
      `Health check available at http://localhost:${PORT}/api/health`,
    );
  });
});
