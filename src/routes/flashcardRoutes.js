// src/routes/flashcardRoutes.js
const express = require('express');
const router = express.Router();
const { supabase } = require('../config/supabaseClient'); // Only need 'supabase' client for data access (RLS-enabled)
const { protectRoute } = require('../middleware/authMiddleware');

// Route to get all flashcard sets for the authenticated user
router.get('/', protectRoute, async (req, res) => {
  try {
    // req.user.id is available from the protectRoute middleware
    const { data, error } = await supabase
      .from('flashcardset')
      .select('*')
      .eq('owner_id', req.user.id); // Filter by the authenticated user's ID

    if (error) {
      console.error('Error fetching flashcard sets:', error.message);
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error('Unexpected error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to create a new flashcard set
router.post('/', protectRoute, async (req, res) => {
  const { title, description, visibility } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required for a flashcard set.' });
  }

  // --- Start of added debugging ---
  console.log('Attempting to create FlashcardSet:');
  console.log('  req.user.id:', req.user ? req.user.id : 'User ID not available'); // Check if user ID is present
  console.log('  Title:', title);
  console.log('  Description:', description);
  console.log('  Visibility:', visibility);
  // --- End of added debugging ---

  try {
    const { data, error } = await supabase
      .from('flashcardset')
      .insert([{
        owner_id: req.user.id, // Assign the authenticated user as the owner
        title,
        description,
        visibility
      }])
      .select(); // Return the inserted data

    if (error) {
      // --- IMPORTANT: Log the FULL error object here ---
      console.error('Supabase error creating flashcard set:', error);
      // Return the full error object or a more specific message if available
      return res.status(500).json({
          error: error.message || 'Failed to create flashcard set.',
          details: error // Include full error object for debugging
      });
    }

    res.status(201).json(data[0]); // Return the created set
  } catch (err) {
    console.error('Unexpected error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add more routes for getting a specific set, updating, deleting, adding cards, etc.
// Example: Get a specific flashcard set by ID
router.get('/:setId', protectRoute, async (req, res) => {
    const { setId } = req.params;
    try {
        const { data, error } = await supabase
            .from('flashcardset')
            .select('*')
            .eq('id', setId)
            .eq('owner_id', req.user.id) // Ensure only owner can fetch (or adjust based on RLS)
            .single();

        if (error) {
            console.error('Error fetching flashcard set:', error.message);
            if (error.code === 'PGRST116') { // No rows found
                return res.status(404).json({ error: 'Flashcard set not found or not accessible.' });
            }
            return res.status(500).json({ error: error.message });
        }
        res.status(200).json(data);
    } catch (err) {
        console.error('Unexpected error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;