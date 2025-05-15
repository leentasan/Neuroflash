const express = require("express");
const { register, login, logout } = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

// Temporary auth endpoint
router.get('/me', (req, res) => {
  res.json({
    id: "temporary-user-id",
    name: "Temporary User"
  });
});

module.exports = router;
