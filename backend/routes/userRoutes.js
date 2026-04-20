const express = require("express");
const { getUserProfile, updateUserProfile } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Apply protect middleware to the profile route
router.get("/", protect, getUserProfile);
router.put("/", protect, updateUserProfile);

module.exports = router;
