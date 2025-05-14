const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// Auth routes
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout);

module.exports = router;