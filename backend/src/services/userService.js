const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const userService = {
  async register(email, password) {
    // Check if user exists
    const userExists = await db.query(
      'SELECT * FROM "User" WHERE email = $1',
      [email]
    );

    if (userExists.rows.length > 0) {
      throw new Error('Email already registered');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create user
    const result = await db.query(
      'INSERT INTO "User" (email, password_hash, created_at) VALUES ($1, $2, NOW()) RETURNING id, email, created_at',
      [email, passwordHash]
    );

    const user = result.rows[0];

    // Create default preferences
    await db.query(
      'INSERT INTO "UserPreferences" (user_id) VALUES ($1)',
      [user.id]
    );

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    // Create user session
    await db.query(
      'INSERT INTO "UserSession" (user_id, token, expires_at) VALUES ($1, $2, NOW() + INTERVAL \'7 days\')',
      [user.id, token]
    );

    return { user, token };
  },

  async login(email, password) {
    // Find user
    const result = await db.query(
      'SELECT * FROM "User" WHERE email = $1',
      [email]
    );

    const user = result.rows[0];
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      throw new Error('Invalid credentials');
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    // Create user session
    await db.query(
      'INSERT INTO "UserSession" (user_id, token, expires_at) VALUES ($1, $2, NOW() + INTERVAL \'7 days\')',
      [user.id, token]
    );

    // Update last login
    await db.query(
      'UPDATE "User" SET last_login = NOW() WHERE id = $1',
      [user.id]
    );

    return {
      user: {
        id: user.id,
        email: user.email,
        created_at: user.created_at
      },
      token
    };
  },

  async logout(token) {
    // Invalidate session
    await db.query(
      'UPDATE "UserSession" SET expires_at = NOW() WHERE token = $1',
      [token]
    );
  }
};

module.exports = userService;