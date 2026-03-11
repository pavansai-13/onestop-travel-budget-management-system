// services/foodservices.js

const foodDB = {
  Goa: {
    perDayEstimate: 600,
    restaurants: [
      { name: "Ritz Classic", mealType: "Seafood", price: 300 },
      { name: "Mum's Kitchen", mealType: "Goan Thali", price: 350 },
      { name: "Navtara Veg", mealType: "Veg Meals", price: 200 }
    ]
  },

  Manali: {
    perDayEstimate: 500,
    restaurants: [
      { name: "Johnson's Cafe", mealType: "North Indian", price: 300 },
      { name: "Cafe 1947", mealType: "Italian", price: 400 },
      { name: "Local Dhaba", mealType: "Budget Meals", price: 200 }
    ]
  },

  Delhi: {
    perDayEstimate: 400,
    restaurants: [
      { name: "Saravana Bhavan", mealType: "South Indian", price: 250 },
      { name: "Haldiram's", mealType: "North Indian", price: 200 }
    ]
  }
};

/**
 * Get food options
 * @param {string} destination
 * @param {number} days
 * @returns {object}
 */
function getFoodOptions(destination, days = 1) {
  if (!destination || days <= 0) {
    return {
      success: false,
      perDayEstimate: 0,
      restaurants: []
    };
  }

  // Normalize destination (manali → Manali)
  const cityKey =
    destination.charAt(0).toUpperCase() +
    destination.slice(1).toLowerCase();

  const cityFood = foodDB[cityKey];

  if (!cityFood) {
    return {
      success: false,
      perDayEstimate: 0,
      restaurants: []
    };
  }

  return {
    success: true,
    city: cityKey,
    perDayEstimate: cityFood.perDayEstimate,
    restaurants: cityFood.restaurants.map(r => ({
      name: r.name,
      mealType: r.mealType,
      price: r.price
    }))
  };
}

module.exports = { getFoodOptions };