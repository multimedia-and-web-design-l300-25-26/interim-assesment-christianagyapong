const express = require("express");
const {
  getCryptos,
  getGainers,
  getNewListings,
  addCrypto,
} = require("../controllers/cryptoController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getCryptos);
router.get("/gainers", getGainers);
router.get("/new", getNewListings);

// Applying protection to adding crypto - optional but a good practice
router.post("/", protect, addCrypto);

module.exports = router;
