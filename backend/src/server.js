require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db');  // Import the db pool

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Test database connection endpoint
app.get('/api/db-test', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW() as current_time');
    res.json({
      message: 'Database connection successful!',
      timestamp: result.rows[0].current_time
    });
  } catch (error) {
    console.error('Database test error:', error);
    res.status(500).json({
      message: 'Database connection failed',
      error: error.message
    });
  }
});

// Basic test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Test database queries
app.get('/api/db-test/tables', async (req, res) => {
  try {
    // Test query for each table
    const results = {};

    // Test User table
    const userTableTest = await db.query('SELECT COUNT(*) FROM "User"');
    results.userCount = userTableTest.rows[0].count;

    // Test UserPreferences table
    const prefsTableTest = await db.query('SELECT COUNT(*) FROM "UserPreferences"');
    results.preferencesCount = prefsTableTest.rows[0].count;

    // Test UserSession table
    const sessionTableTest = await db.query('SELECT COUNT(*) FROM "UserSession"');
    results.sessionCount = sessionTableTest.rows[0].count;

    // Test FlashcardSet table
    const setTableTest = await db.query('SELECT COUNT(*) FROM "FlashcardSet"');
    results.flashcardSetCount = setTableTest.rows[0].count;

    // Test Flashcard table
    const cardTableTest = await db.query('SELECT COUNT(*) FROM "Flashcard"');
    results.flashcardCount = cardTableTest.rows[0].count;

    // Test StudyProgress table
    const progressTableTest = await db.query('SELECT COUNT(*) FROM "StudyProgress"');
    results.studyProgressCount = progressTableTest.rows[0].count;

    // Test table structure
    const tableStructure = await db.query(`
      SELECT table_name, column_name, data_type 
      FROM information_schema.columns 
      WHERE table_schema = 'public'
      ORDER BY table_name, ordinal_position
    `);

    res.json({
      message: 'All database tables accessible',
      counts: results,
      structure: tableStructure.rows
    });

  } catch (error) {
    console.error('Database test error:', error);
    res.status(500).json({
      message: 'Database test failed',
      error: error.message
    });
  }
});

// Test insert and select
app.post('/api/db-test/user', async (req, res) => {
  try {
    // Insert test user
    const insertResult = await db.query(
      'INSERT INTO "User" (email, password_hash) VALUES ($1, $2) RETURNING id, email, created_at',
      ['test@example.com', 'test_hash']
    );

    // Select inserted user
    const selectResult = await db.query(
      'SELECT * FROM "User" WHERE id = $1',
      [insertResult.rows[0].id]
    );

    res.json({
      message: 'Test user created and retrieved successfully',
      inserted: insertResult.rows[0],
      selected: selectResult.rows[0]
    });

  } catch (error) {
    console.error('Test user creation error:', error);
    res.status(500).json({
      message: 'Test user creation failed',
      error: error.message
    });
  }
});

// Clean up test data
app.delete('/api/db-test/cleanup', async (req, res) => {
  try {
    await db.query('DELETE FROM "User" WHERE email = $1', ['test@example.com']);
    res.json({ message: 'Test data cleaned up successfully' });
  } catch (error) {
    console.error('Cleanup error:', error);
    res.status(500).json({
      message: 'Cleanup failed',
      error: error.message
    });
  }
});

// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: err.message || 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});