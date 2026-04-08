const mongoose = require("mongoose");

const routeLegSchema = new mongoose.Schema(
  {
    from: {
      type: String,
      required: true,
      trim: true
    },
    to: {
      type: String,
      required: true,
      trim: true
    },
    order: {
      type: Number,
      required: true
    }
  },
  { _id: false }
);

const routePlanSchema = new mongoose.Schema(
  {
    source: {
      type: String,
      required: true,
      trim: true
    },
    destination: {
      type: String,
      required: true,
      trim: true
    },
    onwardLegs: {
      type: [routeLegSchema],
      default: []
    },
    returnLegs: {
      type: [routeLegSchema],
      default: []
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("RoutePlan", routePlanSchema);