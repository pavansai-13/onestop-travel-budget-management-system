const Transport = require("../models/transport");
const RoutePlan = require("../models/routeplan");

function groupByMode(records = []) {
  const grouped = {};

  for (const item of records) {
    if (!grouped[item.mode]) {
      grouped[item.mode] = [];
    }

    grouped[item.mode].push({
      providerName: item.providerName,
      vehicleNo: item.vehicleNo,
      classType: item.classType,
      price: item.price,
      distance: item.distance
    });
  }

  return grouped;
}

function hasOptions(groupedOptions = {}) {
  return Object.keys(groupedOptions).some(
    (mode) => Array.isArray(groupedOptions[mode]) && groupedOptions[mode].length > 0
  );
}

async function buildLegs(legs = []) {
  const result = [];
  const sortedLegs = [...legs].sort((a, b) => a.order - b.order);

  for (const leg of sortedLegs) {
    const options = await Transport.find({
      source: new RegExp(`^${leg.from.trim()}$`, "i"),
      destination: new RegExp(`^${leg.to.trim()}$`, "i")
    }).lean();

    const groupedOptions = groupByMode(options);

    if (hasOptions(groupedOptions)) {
      result.push({
        leg: `${leg.from} → ${leg.to}`,
        options: groupedOptions
      });
    }
  }

  return result;
}

async function getTransportOptions(source, destination) {
  try {
    if (!source || !destination) {
      return { onward: [], return: [] };
    }

    const cleanSource = source.trim();
    const cleanDestination = destination.trim();

    const routePlan = await RoutePlan.findOne({
      source: new RegExp(`^${cleanSource}$`, "i"),
      destination: new RegExp(`^${cleanDestination}$`, "i")
    }).lean();

    if (routePlan) {
      const onward = await buildLegs(routePlan.onwardLegs || []);
      const returnTrip = await buildLegs(routePlan.returnLegs || []);

      return {
        onward,
        return: returnTrip
      };
    }

    const directOnward = await Transport.find({
      source: new RegExp(`^${cleanSource}$`, "i"),
      destination: new RegExp(`^${cleanDestination}$`, "i")
    }).lean();

    const directReturn = await Transport.find({
      source: new RegExp(`^${cleanDestination}$`, "i"),
      destination: new RegExp(`^${cleanSource}$`, "i")
    }).lean();

    return {
      onward: directOnward.length
        ? [
            {
              leg: `${cleanSource} → ${cleanDestination}`,
              options: groupByMode(directOnward)
            }
          ]
        : [],
      return: directReturn.length
        ? [
            {
              leg: `${cleanDestination} → ${cleanSource}`,
              options: groupByMode(directReturn)
            }
          ]
        : []
    };
  } catch (error) {
    console.error("Transport service error:", error);
    return { onward: [], return: [] };
  }
}

module.exports = { getTransportOptions };