const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// ✅ CREATE a new Deck
router.post("/", async (req, res) => {
  try {
    const { userId, name, description } = req.body;
    const newDeck = await prisma.deck.create({
      data: { userId, name, description },
    });
    res.json(newDeck);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ READ all Decks
router.get("/", async (req, res) => {
  try {
    const decks = await prisma.deck.findMany();
    res.json(decks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ READ one Deck by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deck = await prisma.deck.findUnique({
      where: { id: parseInt(id) },
    });
    if (!deck) return res.status(404).json({ error: "Deck not found" });
    res.json(deck);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ UPDATE a Deck
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const updatedDeck = await prisma.deck.update({
      where: { id: parseInt(id) },
      data: { name, description },
    });
    res.json(updatedDeck);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ DELETE a Deck
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.deck.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Deck deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
