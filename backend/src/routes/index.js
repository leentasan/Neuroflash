const express = require("express");
const router = express.Router();

// Import route
const exampleRoute = require("./exampleRoute");

// Gunakan route
router.use("/example", exampleRoute);
router.use("/auth", authRoutes);

module.exports = router;