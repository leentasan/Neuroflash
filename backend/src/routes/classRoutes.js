const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all classes
router.get('/', async (req, res) => {
  try {
    const classes = await prisma.class.findMany({
      include: {
        sets: {
          include: {
            decks: {
              include: {
                flashcards: true
              }
            }
          }
        }
      }
    });
    res.json(classes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create class
router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body;

    // First, ensure we have a test user
    let testUser = await prisma.user.findFirst({
      where: { email: 'test@example.com' }
    });

    if (!testUser) {
      testUser = await prisma.user.create({
        data: {
          email: 'test@example.com',
          password: 'test123' // In production, this should be hashed
        }
      });
    }

    // Create class with valid user ID
    const newClass = await prisma.class.create({
      data: {
        name,
        description,
        userId: testUser.id // Use the actual user ID
      },
      include: {
        sets: true
      }
    });

    res.status(201).json(newClass);
  } catch (error) {
    console.error('Create class error:', error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;