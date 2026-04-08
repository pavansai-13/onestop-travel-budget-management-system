const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    amount: {
      type: Number,
      required: true,
      min: 0
    },
    category: {
      type: String,
      default: "Other",
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { _id: true }
);

const tripSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    tripName: {
      type: String,
      required: true,
      trim: true
    },
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
    startDate: Date,
    endDate: Date,
    estimatedBudget: {
      type: Number,
      default: 0
    },
    expenses: {
      type: [expenseSchema],
      default: []
    },
    spentAmount: {
      type: Number,
      default: 0
    },
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trip", tripSchema);