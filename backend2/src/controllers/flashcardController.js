const Flashcard = require('../models/flashcardModel');

// Controller for handling flashcard operations
const FlashcardController = {
  // Get all flashcards for a specific deck
  getAllByDeck: async (req, res) => {
    try {
      const deckId = parseInt(req.params.deckId);
      
      if (isNaN(deckId)) {
        return res.status(400).json({ message: 'Invalid deck ID' });
      }

      const flashcards = await Flashcard.getAllByDeckId(deckId);
      return res.status(200).json(flashcards);
    } catch (error) {
      console.error('Error getting flashcards:', error);
      return res.status(500).json({ message: 'Server error while retrieving flashcards' });
    }
  },

  // Create a new flashcard
  create: async (req, res) => {
    try {
      const { deckId, question, answer, sourceText } = req.body;

      // Validate required fields
      if (!deckId || !question || !answer) {
        return res.status(400).json({ message: 'Deck ID, question, and answer are required' });
      }

      // Ensure deckId is a number
      if (isNaN(parseInt(deckId))) {
        return res.status(400).json({ message: 'Invalid deck ID' });
      }

      const flashcardData = {
        deckId: parseInt(deckId),
        question,
        answer,
        sourceText: sourceText || null
      };

      const newFlashcard = await Flashcard.create(flashcardData);
      return res.status(201).json(newFlashcard);
    } catch (error) {
      console.error('Error creating flashcard:', error);
      return res.status(500).json({ message: 'Server error while creating flashcard' });
    }
  },

  // Update an existing flashcard
  update: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { question, answer, sourceText } = req.body;

      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid flashcard ID' });
      }

      // Validate required fields
      if (!question || !answer) {
        return res.status(400).json({ message: 'Question and answer are required' });
      }

      // Check if flashcard exists
      const existingFlashcard = await Flashcard.getById(id);
      if (!existingFlashcard) {
        return res.status(404).json({ message: 'Flashcard not found' });
      }

      const flashcardData = {
        question,
        answer,
        sourceText: sourceText || null
      };

      const updatedFlashcard = await Flashcard.update(id, flashcardData);
      return res.status(200).json(updatedFlashcard);
    } catch (error) {
      console.error('Error updating flashcard:', error);
      return res.status(500).json({ message: 'Server error while updating flashcard' });
    }
  },

  // Delete a flashcard
  delete: async (req, res) => {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid flashcard ID' });
      }

      // Check if flashcard exists
      const existingFlashcard = await Flashcard.getById(id);
      if (!existingFlashcard) {
        return res.status(404).json({ message: 'Flashcard not found' });
      }

      const deletedFlashcard = await Flashcard.delete(id);
      return res.status(200).json({ message: 'Flashcard deleted successfully', flashcard: deletedFlashcard });
    } catch (error) {
      console.error('Error deleting flashcard:', error);
      return res.status(500).json({ message: 'Server error while deleting flashcard' });
    }
  }
};

module.exports = FlashcardController;