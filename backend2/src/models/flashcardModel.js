const pool = require('../config/db');

// Flashcard model with database operations
const Flashcard = {
  // Get all flashcards for a specific deck
  getAllByDeckId: async (deckId) => {
    try {
      const query = 'SELECT * FROM "Flashcard" WHERE "deckId" = $1 ORDER BY "createdAt" DESC';
      const result = await pool.query(query, [deckId]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  // Get a single flashcard by ID
  getById: async (id) => {
    try {
      const query = 'SELECT * FROM "Flashcard" WHERE "id" = $1';
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Create a new flashcard
  create: async (flashcardData) => {
    const { deckId, question, answer, sourceText } = flashcardData;

    try {
      const query = `
        INSERT INTO "Flashcard" ("deckId", "question", "answer", "sourceText", "createdAt")
        VALUES ($1, $2, $3, $4, NOW())
        RETURNING *`;

      const values = [deckId, question, answer, sourceText];
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Update an existing flashcard
  update: async (id, flashcardData) => {
    const { question, answer, sourceText } = flashcardData;

    try {
      const query = `
        UPDATE "Flashcard"
        SET "question" = $1, "answer" = $2, "sourceText" = $3
        WHERE "id" = $4
        RETURNING *`;

      const values = [question, answer, sourceText, id];
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Delete a flashcard
  delete: async (id) => {
    try {
      const query = 'DELETE FROM "Flashcard" WHERE "id" = $1 RETURNING *';
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
};

module.exports = Flashcard;