const mongoose = require("mongoose");

const cryptoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a cryptocurrency name"],
      trim: true,
    },
    symbol: {
      type: String,
      required: [true, "Please provide a symbol"],
      uppercase: true,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Please provide a price"],
      min: [0, "Price cannot be negative"],
    },
    image: {
      type: String,
      required: [true, "Please provide an image URL"],
    },
    change24h: {
      type: Number,
      required: [true, "Please provide 24h change percentage"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Crypto", cryptoSchema);
