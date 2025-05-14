const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// ✅ CREATE a new Set
router.post("/", async (req, res) => {
  try {
    const { userId, name } = req.body;
    const newSet = await prisma.set.create({
      data: { userId, name },
    });
    res.json(newSet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ READ all Sets
router.get("/", async (req, res) => {
  try {
    const sets = await prisma.set.findMany();
    res.json(sets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ READ one Set by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const set = await prisma.set.findUnique({
      where: { id: parseInt(id) },
    });
    if (!set) return res.status(404).json({ error: "Set not found" });
    res.json(set);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ UPDATE a Set
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedSet = await prisma.set.update({
      where: { id: parseInt(id) },
      data: { name },
    });
    res.json(updatedSet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ DELETE a Set
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.set.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Set deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
