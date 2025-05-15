const jwt = require('jsonwebtoken');
const pool = require('../config/db');

// Authentication middleware to protect routes
const protect = async (req, res, next) => {
  let token;

  // Check if token exists in headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token
      const query = 'SELECT id, name, email FROM "User" WHERE id = $1';
      const { rows } = await pool.query(query, [decoded.id]);

      if (rows.length === 0) {
        res.status(401);
        throw new Error('Not authorized, user not found');
      }

      // Set user information in request
      req.user = rows[0];
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, invalid token');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token provided');
  }
};

// Authorization middleware to check if user owns the resource
const authorizeFlashcardAccess = async (req, res, next) => {
  try {
    const flashcardId = req.params.id;
    const userId = req.user.id;

    // Check if the flashcard is in a deck owned by the user
    const query = `
      SELECT f.id
      FROM "Flashcard" f
      JOIN "Deck" d ON f."deckId" = d.id 
      WHERE f.id = $1 AND d."userId" = $2
    `;
    
    const { rows } = await pool.query(query, [flashcardId, userId]);
    
    if (rows.length === 0) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to access this flashcard'
      });
    }
    
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error during authorization check'
    });
  }
};

module.exports = { protect, authorizeFlashcardAccess };