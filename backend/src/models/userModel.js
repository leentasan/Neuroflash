const db = require('../config/db');

const userModel = {
  async findByEmail(email) {
    const query = 'SELECT * FROM "User" WHERE email = $1';
    const result = await db.query(query, [email]);
    return result.rows[0];
  },

  async create(email, passwordHash) {
    const query = `
      INSERT INTO "User" (email, password_hash, created_at)
      VALUES ($1, $2, NOW())
      RETURNING id, email, created_at
    `;
    const result = await db.query(query, [email, passwordHash]);
    return result.rows[0];
  },

  async updateLastLogin(userId) {
    const query = 'UPDATE "User" SET last_login = NOW() WHERE id = $1 RETURNING *';
    const result = await db.query(query, [userId]);
    return result.rows[0];
  },

  async getPreferences(userId) {
    const query = 'SELECT * FROM "UserPreferences" WHERE user_id = $1';
    const result = await db.query(query, [userId]);
    return result.rows[0];
  },

  async createPreferences(userId, preferences) {
    const query = `
      INSERT INTO "UserPreferences" (
        user_id,
        default_visibility,
        cards_per_session,
        review_interval,
        notifications_enabled,
        created_at,
        updated_at
      )
      VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
      RETURNING *
    `;
    const values = [
      userId,
      preferences.default_visibility || 'private',
      preferences.cards_per_session || 20,
      preferences.review_interval || 24,
      preferences.notifications_enabled ?? true
    ];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  async updatePreferences(userId, preferences) {
    const query = `
      UPDATE "UserPreferences"
      SET 
        default_visibility = COALESCE($2, default_visibility),
        cards_per_session = COALESCE($3, cards_per_session),
        review_interval = COALESCE($4, review_interval),
        notifications_enabled = COALESCE($5, notifications_enabled),
        updated_at = NOW()
      WHERE user_id = $1
      RETURNING *
    `;
    const values = [
      userId,
      preferences.default_visibility,
      preferences.cards_per_session,
      preferences.review_interval,
      preferences.notifications_enabled
    ];
    const result = await db.query(query, values);
    return result.rows[0];
  }
};

module.exports = userModel;