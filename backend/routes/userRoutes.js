const express = require("express");
const { getUserProfile } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Apply protect middleware to the profile route
router.get("/", protect, getUserProfile);

module.exports = router;
