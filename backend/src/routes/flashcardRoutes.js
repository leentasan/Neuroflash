const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// ✅ CREATE a new Flashcard
router.post("/", async (req, res) => {
  try {
    const { question, answer, setId } = req.body;
    const flashcard = await prisma.flashcard.create({
      data: {
        question,
        answer,
        setId,
        userId: "temporary-user-id" // Using temporary user until auth is implemented
      }
    });
    res.status(201).json(flashcard);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ READ all Flashcards
router.get("/", async (req, res) => {
  try {
    const flashcards = await prisma.flashcard.findMany();
    res.json(flashcards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ READ one Flashcard by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const flashcard = await prisma.flashcard.findUnique({
      where: { id: parseInt(id) },
    });
    if (!flashcard) return res.status(404).json({ error: "Flashcard not found" });
    res.json(flashcard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ UPDATE a Flashcard
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { question, answer } = req.body;
    const flashcard = await prisma.flashcard.update({
      where: { id },
      data: { question, answer }
    });
    res.json(flashcard);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ DELETE a Flashcard
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.flashcard.delete({
      where: { id }
    });
    res.json({ message: 'Flashcard deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all flashcards in a set
router.get('/set/:setId', async (req, res) => {
  try {
    const { setId } = req.params;
    const flashcards = await prisma.flashcard.findMany({
      where: { setId },
      orderBy: { createdAt: 'desc' }
    });
    res.json(flashcards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
