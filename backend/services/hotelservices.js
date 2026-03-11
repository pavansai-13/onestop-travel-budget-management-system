// services/hotelservices.js

const hotelDB = {
  Manali: [
    {
      name: "Hotel Snow Valley",
      pricePerNight: 1800,
      rating: 4.2,
      type: "Budget",
      roomType: "Non-AC"
    },
    {
      name: "Himalayan Heights",
      pricePerNight: 3200,
      rating: 4.5,
      type: "Mid Range",
      roomType: "Non-AC"
    },
    {
      name: "Span Resort & Spa",
      pricePerNight: 6500,
      rating: 4.8,
      type: "Premium",
      roomType: "Non-AC"
    }
  ],

  Goa: [
    {
      name: "Goa Beach Resort",
      pricePerNight: 1500,
      rating: 4.1,
      type: "Budget",
      roomType: "Non-AC"
    },
  
    {
      name: "The Baga Marina",
      pricePerNight: 3000,
      rating: 4.4,
      type: "Mid Range",
      roomType: "AC"
    },
    {
      name: "Taj Exotica Resort",
      pricePerNight: 9000,
      rating: 4.9,
      type: "Luxury",
      roomType: "AC"
    }
  ],

  Delhi: [
    {
      name: "Hotel Ajanta",
      pricePerNight: 1500,
      rating: 4.0,
      type: "Budget",
      roomType: "Non-AC"
    },
    {
      name: "Hotel Ajanta",
      pricePerNight: 2200, // +700 for AC
      rating: 4.0,
      type: "Budget",
      roomType: "AC"
    },
    {
      name: "The Lalit New Delhi",
      pricePerNight: 7200,
      rating: 4.6,
      type: "Premium",
      roomType: "AC"
    }
  ]
};

/**
 * Get hotel options with TOTAL COST calculated dynamically
 */
function getHotelOptions(destination, days = 1) {
  if (!destination || days <= 0) return [];

  const cityKey =
    destination.charAt(0).toUpperCase() +
    destination.slice(1).toLowerCase();

  const hotels = hotelDB[cityKey] || [];

  return hotels.map(hotel => ({
    name: hotel.name,
    pricePerNight: hotel.pricePerNight,
    rating: hotel.rating,
    type: hotel.type,
    roomType: hotel.roomType,
    totalCost: hotel.pricePerNight * days
  }));
}

module.exports = { getHotelOptions };