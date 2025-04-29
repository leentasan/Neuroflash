require("dotenv").config();
const express = require("express");
const db = require("./config/db"); // Kalau tidak dipakai, bisa dihapus
const authRoutes = require("./routes/authRoutes"); 
const deckRoutes = require("./routes/deckRoutes");
const setRoutes = require("./routes/setRoutes");
const flashcardRoutes = require("./routes/flashcardRoutes");
const quizRoutes = require("./routes/quizRoutes");

const app = express();
app.use(express.json()); 

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/decks", deckRoutes);
app.use("/api/sets", setRoutes);
app.use("/api/flashcards", flashcardRoutes);
app.use("/api/quizzes", quizRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
