const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const userService = {
  async register(email, password) {
    // Check if user exists
    const existingUser = await userModel.findByEmail(email);
    if (existingUser) {
      throw new Error('Email already registered');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create user
    const user = await userModel.create(email, passwordHash);

    // Create default preferences
    await userModel.createPreferences(user.id, {});

    // Generate token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return { user, token };
  },

  async login(email, password) {
    // Find user
    const user = await userModel.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      throw new Error('Invalid credentials');
    }

    // Update last login
    await userModel.updateLastLogin(user.id);

    // Generate token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return { user, token };
  },

  async getUserPreferences(userId) {
    return await userModel.getPreferences(userId);
  },

  async updateUserPreferences(userId, preferences) {
    return await userModel.updatePreferences(userId, preferences);
  }
};

module.exports = userService;