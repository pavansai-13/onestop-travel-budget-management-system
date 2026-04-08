const Food = require("../models/food");

async function getFoodOptions(destination, days = 1) {
  if (!destination) {
    return {
      success: false,
      perDayEstimate: 0,
      totalEstimate: 0,
      restaurants: []
    };
  }

  const foods = await Food.find({
    destination: new RegExp(`^${destination}$`, "i")
  }).lean();

  if (!foods.length) {
    return {
      success: false,
      perDayEstimate: 0,
      totalEstimate: 0,
      restaurants: []
    };
  }

  const perDayEstimate = Math.max(...foods.map((item) => item.perDayEstimate || 0));

  return {
    success: true,
    city: destination,
    perDayEstimate,
    totalEstimate: perDayEstimate * days,
    restaurants: foods.map((item) => ({
      name: item.name,
      mealType: item.mealType,
      price: item.price
    }))
  };
}

module.exports = { getFoodOptions };