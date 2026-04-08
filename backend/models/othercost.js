const mongoose = require("mongoose");

const otherCostSchema = new mongoose.Schema(
  {
    destination: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true
    },
    guide: {
      type: Number,
      default: 0
    },
    localTravel: {
      type: Number,
      default: 0
    },
    entryFees: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("OtherCost", otherCostSchema);