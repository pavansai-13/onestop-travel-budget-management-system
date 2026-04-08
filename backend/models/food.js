const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
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
    mealType: {
      type: String,
      default: "General",
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    perDayEstimate: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Food", foodSchema);