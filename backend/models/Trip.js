const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  tripName: String,
  source: String,
  destination: String,
  startDate: Date,
  endDate: Date,

  estimatedBudget: {
    type: Number,
    default: 0
  },

  // 🔥 SELECTION FIELDS
  selectedTransport: {
    type: Object,
    default: {}
  },

  selectedHotel: {
    type: Number,
    default: 0
  },

  selectedFood: {
    type: Number,
    default: 0
  },

  selectedOther: {
    type: Number,
    default: 0
  },

  totalDays: {
    type: Number,
    default: 1
  },

  totalPersons: {
    type: Number,
    default: 1
  }

}, { timestamps: true });

module.exports = mongoose.model("Trip", tripSchema);