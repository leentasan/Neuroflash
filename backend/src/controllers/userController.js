const userService = require('../services/userService');

const userController = {
  async register(req, res) {
    try {
      const { email, password } = req.body;
      const { user, token } = await userService.register(email, password);
      
      res.status(201).json({
        user: {
          id: user.id,
          email: user.email,
          created_at: user.created_at
        },
        token
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const { user, token } = await userService.login(email, password);

      res.json({
        user: {
          id: user.id,
          email: user.email,
          created_at: user.created_at
        },
        token
      });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  },

  async getPreferences(req, res) {
    try {
      const preferences = await userService.getUserPreferences(req.userId);
      res.json(preferences);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async updatePreferences(req, res) {
    try {
      const preferences = await userService.updateUserPreferences(req.userId, req.body);
      res.json(preferences);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = userController;