const express = require("express");
const router = express.Router();
const authmiddleware = require("../middleware/authmiddleware");
const Trip = require("../models/Trip");


/* ================= CREATE A TRIP ================= */
router.post("/", authmiddleware, async (req, res) => {
  try {
    let {
      tripName,
      source,
      destination,
      startDate,
      endDate,
      estimatedBudget
    } = req.body;

    if (!tripName || !source || !destination) {
      return res.status(400).json({
        success: false,
        message: "Trip name, source and destination are required"
      });
    }

    const trip = new Trip({
      userId: req.user.id,
      tripName: tripName.trim(),
      source: source.trim(),
      destination: destination.trim(),
      startDate,
      endDate,
      estimatedBudget: estimatedBudget || 0,
      expenses: []   // ✅ initialize expenses
    });

    await trip.save();

    res.status(201).json({
      success: true,
      message: "Trip created successfully",
      trip
    });

  } catch (error) {
    console.error("❌ Create trip error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create trip"
    });
  }
});


/* ================= GET ALL USER TRIPS ================= */
router.get("/", authmiddleware, async (req, res) => {
  try {
    const trips = await Trip.find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      trips
    });

  } catch (error) {
    console.error("❌ Get trips error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch trips"
    });
  }
});


/* ================= GET SINGLE TRIP ================= */
router.get("/:id", authmiddleware, async (req, res) => {
  try {
    const trip = await Trip.findOne({
      _id: req.params.id,
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
      trip
    });

  } catch (error) {
    console.error("❌ Get trip error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch trip"
    });
  }
});


/* ================= ADD EXPENSE TO TRIP ================= */
router.post("/:id/expenses", authmiddleware, async (req, res) => {
  try {
    const { title, amount } = req.body;

    if (!title || !amount) {
      return res.status(400).json({
        success: false,
        message: "Expense title and amount required"
      });
    }

    const trip = await Trip.findOne({
      _id: req.params.id,
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
      amount: Number(amount)
    });

    await trip.save();

    res.json({
      success: true,
      message: "Expense added successfully",
      trip
    });

  } catch (error) {
    console.error("❌ Add expense error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add expense"
    });
  }
});


/* ================= DELETE EXPENSE ================= */
router.delete("/:tripId/expenses/:expenseId", authmiddleware, async (req, res) => {
  try {
    const { tripId, expenseId } = req.params;

    const trip = await Trip.findOne({
      _id: tripId,
      userId: req.user.id
    });

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found"
      });
    }

    trip.expenses = trip.expenses.filter(
      exp => exp._id.toString() !== expenseId
    );

    await trip.save();

    res.json({
      success: true,
      message: "Expense deleted successfully"
    });

  } catch (error) {
    console.error("❌ Delete expense error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete expense"
    });
  }
});


/* ================= EDIT TRIP ================= */
router.put("/:id", authmiddleware, async (req, res) => {
  try {
    const trip = await Trip.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found"
      });
    }

    const {
      tripName,
      source,
      destination,
      startDate,
      endDate,
      estimatedBudget
    } = req.body;

    if (tripName) trip.tripName = tripName.trim();
    if (source) trip.source = source.trim();
    if (destination) trip.destination = destination.trim();
    if (startDate) trip.startDate = startDate;
    if (endDate) trip.endDate = endDate;
    if (estimatedBudget !== undefined)
      trip.estimatedBudget = estimatedBudget;

    await trip.save();

    res.json({
      success: true,
      message: "Trip updated successfully",
      trip
    });

  } catch (error) {
    console.error("❌ Update trip error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update trip"
    });
  }
});


/* ================= DELETE TRIP ================= */
router.delete("/:id", authmiddleware, async (req, res) => {
  try {
    const trip = await Trip.findOneAndDelete({
      _id: req.params.id,
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
      message: "Trip deleted successfully"
    });

  } catch (error) {
    console.error("❌ Delete trip error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete trip"
    });
  }
});

/* ================= SAVE SELECTIONS ================= */
router.post("/:id/selections", authmiddleware, async (req, res) => {
  try {
    const {
      selectedTransport,
      selectedHotel,
      selectedFood,
      selectedOther,
      totalDays,
      totalPersons
    } = req.body;

    const trip = await Trip.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found"
      });
    }

    // ✅ Save selections
    trip.selectedTransport = selectedTransport || {};
    trip.selectedHotel = selectedHotel || 0;
    trip.selectedFood = selectedFood || 0;
    trip.selectedOther = selectedOther || 0;
    trip.totalDays = totalDays || 1;
    trip.totalPersons = totalPersons || 1;

    // 🔥 IMPORTANT FIX (BUDGET CALCULATION)
    const transportTotal = Object.values(selectedTransport || {}).reduce(
      (a, b) => a + b,
      0
    );

    trip.estimatedBudget =
      transportTotal +
      (selectedHotel || 0) +
      (selectedFood || 0) +
      (selectedOther || 0);

    await trip.save();

    res.json({
      success: true,
      message: "Selections saved successfully",
      estimatedBudget: trip.estimatedBudget   // optional (good for debug)
    });

  } catch (error) {
    console.error("❌ Save selection error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to save selections"
    });
  }
});

module.exports = router;