require("dotenv").config();
const express = require("express");
const db = require("./config/db");
const authRoutes = require("./routes/authRoutes"); 

const app = express();
app.use(express.json()); 

// Routes
app.use("/api/auth", authRoutes); 

// Test Route
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
