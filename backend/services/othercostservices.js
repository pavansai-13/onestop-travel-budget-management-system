const OtherCost = require("../models/othercost");

async function getOtherCosts(destination) {
  if (!destination) {
    return {
      guide: 0,
      localTravel: 0,
      entryFees: 0,
      total: 0
    };
  }

  const cost = await OtherCost.findOne({
    destination: new RegExp(`^${destination}$`, "i")
  }).lean();

  if (!cost) {
    return {
      guide: 0,
      localTravel: 0,
      entryFees: 0,
      total: 0
    };
  }

  const total = (cost.guide || 0) + (cost.localTravel || 0) + (cost.entryFees || 0);

  return {
    guide: cost.guide || 0,
    localTravel: cost.localTravel || 0,
    entryFees: cost.entryFees || 0,
    total
  };
}

module.exports = { getOtherCosts };