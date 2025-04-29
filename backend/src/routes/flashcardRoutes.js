const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// ✅ CREATE a new Flashcard
router.post("/", async (req, res) => {
  try {
    const { deckId, question, answer, sourceText } = req.body;
    const newFlashcard = await prisma.flashcard.create({
      data: { deckId, question, answer, sourceText },
    });
    res.json(newFlashcard);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    const { question, answer, sourceText } = req.body;
    const updatedFlashcard = await prisma.flashcard.update({
      where: { id: parseInt(id) },
      data: { question, answer, sourceText },
    });
    res.json(updatedFlashcard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ DELETE a Flashcard
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.flashcard.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Flashcard deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
