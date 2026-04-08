const Hotel = require("../models/hotel");

async function getHotelOptions(destination, days = 1) {
  if (!destination) return [];

  const hotels = await Hotel.find({
    destination: new RegExp(`^${destination}$`, "i")
  }).lean();

  return hotels.map((hotel) => ({
    name: hotel.name,
    pricePerNight: hotel.pricePerNight,
    rating: hotel.rating,
    type: hotel.type,
    roomType: hotel.roomType,
    totalCost: hotel.pricePerNight * days
  }));
}

module.exports = { getHotelOptions };