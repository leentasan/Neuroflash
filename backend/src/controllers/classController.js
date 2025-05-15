const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const classController = {
  // Create a new class
  async create(req, res) {
    try {
      const { name, description } = req.body;
      const userId = req.user.id; // From auth middleware

      const newClass = await prisma.class.create({
        data: {
          name,
          description,
          userId,
        },
        include: {
          sets: true, // Include related sets
        },
      });

      res.status(201).json(newClass);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get all classes for a user
  async getUserClasses(req, res) {
    try {
      const userId = req.user.id;

      const classes = await prisma.class.findMany({
        where: {
          userId,
        },
        include: {
          sets: {
            include: {
              decks: {
                include: {
                  flashcards: true,
                },
              },
            },
          },
        },
      });

      // Calculate progress for each class
      const classesWithProgress = classes.map(cls => {
        const totalFlashcards = cls.sets.reduce((total, set) => 
          total + set.decks.reduce((deckTotal, deck) => 
            deckTotal + deck.flashcards.length, 0), 0);

        return {
          ...cls,
          flashcardCount: totalFlashcards,
          progress: 0, // You can calculate this based on StudyProgress
        };
      });

      res.json(classesWithProgress);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Update a class
  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
      const userId = req.user.id;

      const updatedClass = await prisma.class.update({
        where: {
          id,
          userId, // Ensure user owns the class
        },
        data: {
          name,
          description,
        },
      });

      res.json(updatedClass);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Delete a class
  async delete(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      await prisma.class.delete({
        where: {
          id,
          userId, // Ensure user owns the class
        },
      });

      res.json({ message: 'Class deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = classController;