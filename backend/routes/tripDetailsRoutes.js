const express = require("express");
const router = express.Router();
const authmiddleware = require("../middleware/authmiddleware");
const Trip = require("../models/Trip");

const { getTransportOptions } = require("../services/transportservice");
const { getHotelOptions } = require("../services/hotelservices");
const { getFoodOptions } = require("../services/foodservices");
const { getOtherCosts } = require("../services/othercostservices");

/* ================= GET TRIP DETAILS + ESTIMATION ================= */
router.get("/:tripId", authmiddleware, async (req, res) => {
  try {
    const trip = await Trip.findOne({
      _id: req.params.tripId,
      userId: req.user.id
    });

    if (!trip) {
      return res.status(404).json({ success: false });
    }

    const days =
      trip.startDate && trip.endDate
        ? Math.max(
            1,
            Math.ceil(
              (new Date(trip.endDate) - new Date(trip.startDate)) /
                (1000 * 60 * 60 * 24)
            )
          )
        : 1;

    res.json({
      success: true,
      trip,
      totalDays: days,
      transport: getTransportOptions(trip.source, trip.destination),
      hotels: getHotelOptions(trip.destination, days),
      food: getFoodOptions(trip.destination, days),
      otherCosts: getOtherCosts(trip.destination)
    });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

/* ================= ADD EXPENSE ================= */
router.post("/:tripId/add-expense", authmiddleware, async (req, res) => {
  try {
    const { title, amount, category } = req.body;

    if (!title || !amount) {
      return res.status(400).json({
        success: false,
        message: "Invalid expense data"
      });
    }

    const trip = await Trip.findOne({
      _id: req.params.tripId,
      userId: req.user.id
    });

    if (!trip) {
      return res.status(404).json({ success: false });
    }

    const expense = {
      title,
      amount: Number(amount),
      category: category || "Other"
    };

    trip.expenses.push(expense);
    trip.spentAmount += Number(amount);

    await trip.save();

    res.json({
      success: true,
      expenses: trip.expenses,
      spentAmount: trip.spentAmount
    });

  } catch (err) {
    res.status(500).json({ success: false });
  }
});

/* ================= GET EXPENSES ================= */
router.get("/:tripId/expenses", authmiddleware, async (req, res) => {
  try {
    const trip = await Trip.findOne({
      _id: req.params.tripId,
      userId: req.user.id
    });

    if (!trip) {
      return res.status(404).json({ success: false });
    }

    res.json({
      success: true,
      expenses: trip.expenses,
      spentAmount: trip.spentAmount,
      estimatedBudget: trip.estimatedBudget
    });

  } catch (err) {
    res.status(500).json({ success: false });
  }
});

module.exports = router;