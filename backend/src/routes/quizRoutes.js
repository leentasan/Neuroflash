const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// ✅ CREATE a new Quiz
router.post("/", async (req, res) => {
  try {
    const { deckId, question, correctAnswer, options } = req.body;
    const newQuiz = await prisma.quiz.create({
      data: { deckId, question, correctAnswer, options },
    });
    res.json(newQuiz);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ READ all Quizzes
router.get("/", async (req, res) => {
  try {
    const quizzes = await prisma.quiz.findMany();
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ READ one Quiz by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const quiz = await prisma.quiz.findUnique({
      where: { id: parseInt(id) },
    });
    if (!quiz) return res.status(404).json({ error: "Quiz not found" });
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ UPDATE a Quiz
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { question, correctAnswer, options } = req.body;
    const updatedQuiz = await prisma.quiz.update({
      where: { id: parseInt(id) },
      data: { question, correctAnswer, options },
    });
    res.json(updatedQuiz);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ DELETE a Quiz
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.quiz.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Quiz deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
