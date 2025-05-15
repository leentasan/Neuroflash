const express = require('express');
const router = express.Router();
const FlashcardController = require('../controllers/flashcardController');

// Get all flashcards for a specific deck
router.get('/deck/:deckId', FlashcardController.getAllByDeck);

// Create a new flashcard
router.post('/', FlashcardController.create);

// Update an existing flashcard
router.put('/:id', FlashcardController.update);

// Delete a flashcard
router.delete('/:id', FlashcardController.delete);

module.exports = router;