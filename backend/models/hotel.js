const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
  {
    destination: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    pricePerNight: {
      type: Number,
      required: true,
      min: 0
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    type: {
      type: String,
      default: "Budget",
      trim: true
    },
    roomType: {
      type: String,
      default: "Non-AC",
      trim: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hotel", hotelSchema);