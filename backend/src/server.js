
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

require("dotenv").config();
const express = require("express");
const db = require("./config/db");
const authRoutes = require("./routes/authRoutes"); 
const deckRoutes = require("./routes/deckRoutes");
const setRoutes = require("./routes/setRoutes");
const flashcardRoutes = require("./routes/flashcardRoutes");
const quizRoutes = require("./routes/quizRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes

app.use('/api/users', userRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/decks", deckRoutes);
app.use("/api/sets", setRoutes);
app.use("/api/flashcards", flashcardRoutes);
app.use("/api/quizzes", quizRoutes);


// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});