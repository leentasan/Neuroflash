const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Debug middleware for this route
router.use((req, res, next) => {
  console.log(`[Sets Route] ${req.method} ${req.path}`);
  next();
});

// ✅ CREATE a new Set
router.post("/", async (req, res) => {
  try {
    const { name, description, classId } = req.body;
    
    // Verify class exists before creating set
    const classExists = await prisma.class.findUnique({
      where: {
        id: classId
      }
    });

    if (!classExists) {
      return res.status(404).json({ error: 'Class not found' });
    }

    const newSet = await prisma.set.create({
      data: {
        name,
        description,
        classId,
        userId: "temporary-user-id"
      }
    });
    res.status(201).json(newSet);
  } catch (error) {
    console.error('Error creating set:', error);
    res.status(400).json({ error: 'Failed to create set', details: error.message });
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

// Get all sets for a specific class
router.get('/class/:classId', async (req, res) => {
  try {
    const { classId } = req.params;
    console.log(`Attempting to fetch sets for class: ${classId}`);

    // First verify if the class exists
    const classExists = await prisma.class.findUnique({
      where: {
        id: classId
      }
    });

    if (!classExists) {
      console.log(`Class not found with ID: ${classId}`);
      return res.status(404).json({ 
        error: 'Class not found',
        classId: classId
      });
    }

    const sets = await prisma.set.findMany({
      where: {
        classId: classId
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    console.log(`Found ${sets.length} sets for class ${classId}`);
    return res.json(sets);
  } catch (error) {
    console.error('Error fetching sets:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch sets',
      details: error.message,
      classId: req.params.classId
    });
  }
});

module.exports = router;
