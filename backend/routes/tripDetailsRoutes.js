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
      return res.status(404).json({
        success: false,
        message: "Trip not found"
      });
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

    const transport = await getTransportOptions(trip.source, trip.destination);
    const hotels = await getHotelOptions(trip.destination, days);
    const food = await getFoodOptions(trip.destination, days);
    const otherCosts = await getOtherCosts(trip.destination);

    res.json({
      success: true,
      trip,
      totalDays: days,
      transport,
      hotels,
      food,
      otherCosts
    });
  } catch (err) {
    console.error("Trip details error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch trip details"
    });
  }
});

/* ================= ADD EXPENSE ================= */
router.post("/:tripId/add-expense", authmiddleware, async (req, res) => {
  try {
    const { title, amount, category } = req.body;

    if (!title || !amount || Number(amount) <= 0) {
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
      return res.status(404).json({
        success: false,
        message: "Trip not found"
      });
    }

    trip.expenses.push({
      title: title.trim(),
      amount: Number(amount),
      category: category || "Other"
    });

    trip.spentAmount = trip.expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);

    await trip.save();

    res.json({
      success: true,
      expenses: trip.expenses,
      spentAmount: trip.spentAmount
    });
  } catch (err) {
    console.error("Add expense error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to add expense"
    });
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
      return res.status(404).json({
        success: false,
        message: "Trip not found"
      });
    }

    res.json({
      success: true,
      expenses: trip.expenses,
      spentAmount: trip.spentAmount,
      estimatedBudget: trip.estimatedBudget
    });
  } catch (err) {
    console.error("Get expenses error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch expenses"
    });
  }
});

/* ================= UPDATE EXPENSE ================= */
router.put("/:tripId/expense/:expenseId", authmiddleware, async (req, res) => {
  try {
    const { title, amount, category } = req.body;

    const trip = await Trip.findOne({
      _id: req.params.tripId,
      userId: req.user.id
    });

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found"
      });
    }

    const expense = trip.expenses.id(req.params.expenseId);

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found"
      });
    }

    if (title) expense.title = title.trim();
    if (amount !== undefined && Number(amount) > 0) expense.amount = Number(amount);
    if (category) expense.category = category;

    trip.spentAmount = trip.expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);

    await trip.save();

    res.json({
      success: true,
      expenses: trip.expenses,
      spentAmount: trip.spentAmount
    });
  } catch (err) {
    console.error("Update expense error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to update expense"
    });
  }
});

/* ================= DELETE EXPENSE ================= */
router.delete("/:tripId/expense/:expenseId", authmiddleware, async (req, res) => {
  try {
    const trip = await Trip.findOne({
      _id: req.params.tripId,
      userId: req.user.id
    });

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found"
      });
    }

    const expense = trip.expenses.id(req.params.expenseId);

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found"
      });
    }

    expense.deleteOne();

    trip.spentAmount = trip.expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);

    await trip.save();

    res.json({
      success: true,
      expenses: trip.expenses,
      spentAmount: trip.spentAmount
    });
  } catch (err) {
    console.error("Delete expense error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to delete expense"
    });
  }
});

module.exports = router;