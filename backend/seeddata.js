const mongoose = require("mongoose");
require("dotenv").config();

const Transport = require("./models/transport");
const RoutePlan = require("./models/routeplan");
const Hotel = require("./models/hotel");
const Food = require("./models/food");
const OtherCost = require("./models/othercost");

async function seedData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected ✅");

    await Transport.deleteMany({});
    await RoutePlan.deleteMany({});
    await Hotel.deleteMany({});
    await Food.deleteMany({});
    await OtherCost.deleteMany({});

    await Transport.insertMany([
      // ================= MANALI (VIA DELHI) =================
      {
        source: "Vizag",
        destination: "Delhi",
        mode: "train",
        providerName: "AP Express",
        vehicleNo: "22416",
        classType: "Sleeper",
        price: 900,
        distance: "1800 km"
      },
      {
        source: "Vizag",
        destination: "Delhi",
        mode: "train",
        providerName: "AP Express",
        vehicleNo: "22416",
        classType: "3A",
        price: 2200,
        distance: "1800 km"
      },
      {
        source: "Vizag",
        destination: "Delhi",
        mode: "flight",
        providerName: "Indigo",
        vehicleNo: "6E-234",
        classType: "Economy",
        price: 6500,
        distance: "1700 km"
      },
      {
        source: "Vizag",
        destination: "Delhi",
        mode: "flight",
        providerName: "Air India",
        vehicleNo: "AI-887",
        classType: "Economy",
        price: 7200,
        distance: "1700 km"
      },
      {
        source: "Delhi",
        destination: "Manali",
        mode: "bus",
        providerName: "HRTC Volvo",
        vehicleNo: "HP-01-1234",
        classType: "AC",
        price: 700,
        distance: "540 km"
      },
      {
        source: "Delhi",
        destination: "Manali",
        mode: "bus",
        providerName: "Private Volvo",
        vehicleNo: "DL-01-5678",
        classType: "AC Sleeper",
        price: 1500,
        distance: "540 km"
      },
      {
        source: "Manali",
        destination: "Delhi",
        mode: "bus",
        providerName: "HRTC Volvo",
        vehicleNo: "HP-01-4321",
        classType: "AC",
        price: 700,
        distance: "540 km"
      },
      {
        source: "Manali",
        destination: "Delhi",
        mode: "bus",
        providerName: "Private Volvo",
        vehicleNo: "DL-01-8765",
        classType: "AC Sleeper",
        price: 1500,
        distance: "540 km"
      },
      {
        source: "Delhi",
        destination: "Vizag",
        mode: "train",
        providerName: "AP Express",
        vehicleNo: "22415",
        classType: "Sleeper",
        price: 900,
        distance: "1800 km"
      },
      {
        source: "Delhi",
        destination: "Vizag",
        mode: "train",
        providerName: "AP Express",
        vehicleNo: "22415",
        classType: "3A",
        price: 2200,
        distance: "1800 km"
      },
      {
        source: "Delhi",
        destination: "Vizag",
        mode: "flight",
        providerName: "Indigo",
        vehicleNo: "6E-235",
        classType: "Economy",
        price: 6500,
        distance: "1700 km"
      },
      {
        source: "Delhi",
        destination: "Vizag",
        mode: "flight",
        providerName: "Air India",
        vehicleNo: "AI-888",
        classType: "Economy",
        price: 7200,
        distance: "1700 km"
      },

      // ================= HYDERABAD =================
      {
        source: "Vizag",
        destination: "Hyderabad",
        mode: "train",
        providerName: "Godavari Express",
        vehicleNo: "12727",
        classType: "Sleeper",
        price: 500,
        distance: "620 km"
      },
      {
        source: "Vizag",
        destination: "Hyderabad",
        mode: "train",
        providerName: "Godavari Express",
        vehicleNo: "12727",
        classType: "3A",
        price: 1400,
        distance: "620 km"
      },
      {
        source: "Vizag",
        destination: "Hyderabad",
        mode: "flight",
        providerName: "Indigo",
        vehicleNo: "6E-321",
        classType: "Economy",
        price: 4500,
        distance: "530 km"
      },
      {
        source: "Hyderabad",
        destination: "Vizag",
        mode: "train",
        providerName: "Godavari Express",
        vehicleNo: "12728",
        classType: "Sleeper",
        price: 500,
        distance: "620 km"
      },
      {
        source: "Hyderabad",
        destination: "Vizag",
        mode: "flight",
        providerName: "Indigo",
        vehicleNo: "6E-322",
        classType: "Economy",
        price: 4500,
        distance: "530 km"
      },

      // ================= BANGALORE =================
      {
        source: "Vizag",
        destination: "Bangalore",
        mode: "train",
        providerName: "Prashanti Express",
        vehicleNo: "18463",
        classType: "Sleeper",
        price: 650,
        distance: "1000 km"
      },
      {
        source: "Vizag",
        destination: "Bangalore",
        mode: "train",
        providerName: "Prashanti Express",
        vehicleNo: "18463",
        classType: "3A",
        price: 1800,
        distance: "1000 km"
      },
      {
        source: "Vizag",
        destination: "Bangalore",
        mode: "flight",
        providerName: "Indigo",
        vehicleNo: "6E-451",
        classType: "Economy",
        price: 5200,
        distance: "820 km"
      },
      {
        source: "Bangalore",
        destination: "Vizag",
        mode: "train",
        providerName: "Prashanti Express",
        vehicleNo: "18464",
        classType: "Sleeper",
        price: 650,
        distance: "1000 km"
      },
      {
        source: "Bangalore",
        destination: "Vizag",
        mode: "flight",
        providerName: "Indigo",
        vehicleNo: "6E-452",
        classType: "Economy",
        price: 5200,
        distance: "820 km"
      },

      // ================= CHENNAI =================
      {
        source: "Vizag",
        destination: "Chennai",
        mode: "train",
        providerName: "Coromandel Express",
        vehicleNo: "12841",
        classType: "Sleeper",
        price: 550,
        distance: "800 km"
      },
      {
        source: "Vizag",
        destination: "Chennai",
        mode: "train",
        providerName: "Coromandel Express",
        vehicleNo: "12841",
        classType: "3A",
        price: 1500,
        distance: "800 km"
      },
      {
        source: "Vizag",
        destination: "Chennai",
        mode: "flight",
        providerName: "Air India",
        vehicleNo: "AI-541",
        classType: "Economy",
        price: 4800,
        distance: "610 km"
      },
      {
        source: "Chennai",
        destination: "Vizag",
        mode: "train",
        providerName: "Coromandel Express",
        vehicleNo: "12842",
        classType: "Sleeper",
        price: 550,
        distance: "800 km"
      },
      {
        source: "Chennai",
        destination: "Vizag",
        mode: "flight",
        providerName: "Air India",
        vehicleNo: "AI-542",
        classType: "Economy",
        price: 4800,
        distance: "610 km"
      },

      // ================= OOTY (VIA COIMBATORE) =================
      {
        source: "Vizag",
        destination: "Coimbatore",
        mode: "train",
        providerName: "Coimbatore Express",
        vehicleNo: "18567",
        classType: "Sleeper",
        price: 780,
        distance: "1200 km"
      },
      {
        source: "Vizag",
        destination: "Coimbatore",
        mode: "flight",
        providerName: "Indigo",
        vehicleNo: "6E-611",
        classType: "Economy",
        price: 6200,
        distance: "1050 km"
      },
      {
        source: "Coimbatore",
        destination: "Ooty",
        mode: "bus",
        providerName: "TNSTC",
        vehicleNo: "TN-38-1101",
        classType: "Non-AC",
        price: 120,
        distance: "90 km"
      },
      {
        source: "Coimbatore",
        destination: "Ooty",
        mode: "cab",
        providerName: "Private Taxi",
        vehicleNo: "TN-38-2202",
        classType: "Sedan",
        price: 1800,
        distance: "90 km"
      },
      {
        source: "Ooty",
        destination: "Coimbatore",
        mode: "bus",
        providerName: "TNSTC",
        vehicleNo: "TN-38-1102",
        classType: "Non-AC",
        price: 120,
        distance: "90 km"
      },
      {
        source: "Ooty",
        destination: "Coimbatore",
        mode: "cab",
        providerName: "Private Taxi",
        vehicleNo: "TN-38-2203",
        classType: "Sedan",
        price: 1800,
        distance: "90 km"
      },
      {
        source: "Coimbatore",
        destination: "Vizag",
        mode: "train",
        providerName: "Coimbatore Express",
        vehicleNo: "18568",
        classType: "Sleeper",
        price: 780,
        distance: "1200 km"
      },
      {
        source: "Coimbatore",
        destination: "Vizag",
        mode: "flight",
        providerName: "Indigo",
        vehicleNo: "6E-612",
        classType: "Economy",
        price: 6200,
        distance: "1050 km"
      },

      // ================= MYSORE (VIA BANGALORE) =================
      {
        source: "Bangalore",
        destination: "Mysore",
        mode: "train",
        providerName: "Mysore Express",
        vehicleNo: "16219",
        classType: "Chair Car",
        price: 180,
        distance: "145 km"
      },
      {
        source: "Bangalore",
        destination: "Mysore",
        mode: "bus",
        providerName: "KSRTC Airavat",
        vehicleNo: "KA-09-4501",
        classType: "AC",
        price: 350,
        distance: "145 km"
      },
      {
        source: "Mysore",
        destination: "Bangalore",
        mode: "train",
        providerName: "Mysore Express",
        vehicleNo: "16220",
        classType: "Chair Car",
        price: 180,
        distance: "145 km"
      },
      {
        source: "Mysore",
        destination: "Bangalore",
        mode: "bus",
        providerName: "KSRTC Airavat",
        vehicleNo: "KA-09-4502",
        classType: "AC",
        price: 350,
        distance: "145 km"
      },

      // ================= JAIPUR (VIA DELHI) =================
      {
        source: "Delhi",
        destination: "Jaipur",
        mode: "train",
        providerName: "Ajmer Shatabdi",
        vehicleNo: "12015",
        classType: "Chair Car",
        price: 450,
        distance: "280 km"
      },
      {
        source: "Delhi",
        destination: "Jaipur",
        mode: "bus",
        providerName: "RSRTC Volvo",
        vehicleNo: "RJ-14-7788",
        classType: "AC",
        price: 600,
        distance: "280 km"
      },
      {
        source: "Jaipur",
        destination: "Delhi",
        mode: "train",
        providerName: "Ajmer Shatabdi",
        vehicleNo: "12016",
        classType: "Chair Car",
        price: 450,
        distance: "280 km"
      },
      {
        source: "Jaipur",
        destination: "Delhi",
        mode: "bus",
        providerName: "RSRTC Volvo",
        vehicleNo: "RJ-14-7799",
        classType: "AC",
        price: 600,
        distance: "280 km"
      },

      // ================= MUMBAI =================
      {
        source: "Vizag",
        destination: "Mumbai",
        mode: "train",
        providerName: "Konark Express",
        vehicleNo: "11020",
        classType: "Sleeper",
        price: 850,
        distance: "1500 km"
      },
      {
        source: "Vizag",
        destination: "Mumbai",
        mode: "train",
        providerName: "Konark Express",
        vehicleNo: "11020",
        classType: "3A",
        price: 2100,
        distance: "1500 km"
      },
      {
        source: "Vizag",
        destination: "Mumbai",
        mode: "flight",
        providerName: "Indigo",
        vehicleNo: "6E-701",
        classType: "Economy",
        price: 6800,
        distance: "1150 km"
      },
      {
        source: "Mumbai",
        destination: "Vizag",
        mode: "train",
        providerName: "Konark Express",
        vehicleNo: "11019",
        classType: "Sleeper",
        price: 850,
        distance: "1500 km"
      },
      {
        source: "Mumbai",
        destination: "Vizag",
        mode: "flight",
        providerName: "Indigo",
        vehicleNo: "6E-702",
        classType: "Economy",
        price: 6800,
        distance: "1150 km"
      },

      // ================= TIRUPATI =================
      {
        source: "Vizag",
        destination: "Tirupati",
        mode: "train",
        providerName: "Tirumala Express",
        vehicleNo: "17487",
        classType: "Sleeper",
        price: 600,
        distance: "800 km"
      },
      {
        source: "Vizag",
        destination: "Tirupati",
        mode: "train",
        providerName: "Tirumala Express",
        vehicleNo: "17487",
        classType: "3A",
        price: 1650,
        distance: "800 km"
      },
      {
        source: "Vizag",
        destination: "Tirupati",
        mode: "bus",
        providerName: "APSRTC Super Luxury",
        vehicleNo: "AP-28-8899",
        classType: "AC Sleeper",
        price: 1400,
        distance: "780 km"
      },
      {
        source: "Tirupati",
        destination: "Vizag",
        mode: "train",
        providerName: "Tirumala Express",
        vehicleNo: "17488",
        classType: "Sleeper",
        price: 600,
        distance: "800 km"
      },
      {
        source: "Tirupati",
        destination: "Vizag",
        mode: "bus",
        providerName: "APSRTC Super Luxury",
        vehicleNo: "AP-28-8800",
        classType: "AC Sleeper",
        price: 1400,
        distance: "780 km"
      },

      // ================= KERALA =================
      {
        source: "Vizag",
        destination: "Kerala",
        mode: "train",
        providerName: "Kerala Express",
        vehicleNo: "12626",
        classType: "Sleeper",
        price: 950,
        distance: "1450 km"
      },
      {
        source: "Vizag",
        destination: "Kerala",
        mode: "flight",
        providerName: "Air India Express",
        vehicleNo: "IX-310",
        classType: "Economy",
        price: 7200,
        distance: "1250 km"
      },
      {
        source: "Kerala",
        destination: "Vizag",
        mode: "train",
        providerName: "Kerala Express",
        vehicleNo: "12625",
        classType: "Sleeper",
        price: 950,
        distance: "1450 km"
      },
      {
        source: "Kerala",
        destination: "Vizag",
        mode: "flight",
        providerName: "Air India Express",
        vehicleNo: "IX-311",
        classType: "Economy",
        price: 7200,
        distance: "1250 km"
      },

      // ================= KOLKATA =================
      {
        source: "Vizag",
        destination: "Kolkata",
        mode: "train",
        providerName: "Howrah Mail",
        vehicleNo: "12839",
        classType: "Sleeper",
        price: 700,
        distance: "900 km"
      },
      {
        source: "Vizag",
        destination: "Kolkata",
        mode: "train",
        providerName: "Howrah Mail",
        vehicleNo: "12839",
        classType: "3A",
        price: 1850,
        distance: "900 km"
      },
      {
        source: "Vizag",
        destination: "Kolkata",
        mode: "flight",
        providerName: "Indigo",
        vehicleNo: "6E-808",
        classType: "Economy",
        price: 5600,
        distance: "760 km"
      },
      {
        source: "Kolkata",
        destination: "Vizag",
        mode: "train",
        providerName: "Howrah Mail",
        vehicleNo: "12840",
        classType: "Sleeper",
        price: 700,
        distance: "900 km"
      },
      {
        source: "Kolkata",
        destination: "Vizag",
        mode: "flight",
        providerName: "Indigo",
        vehicleNo: "6E-809",
        classType: "Economy",
        price: 5600,
        distance: "760 km"
      }
    ]);

    await RoutePlan.insertMany([
      {
        source: "Vizag",
        destination: "Manali",
        onwardLegs: [
          { from: "Vizag", to: "Delhi", order: 1 },
          { from: "Delhi", to: "Manali", order: 2 }
        ],
        returnLegs: [
          { from: "Manali", to: "Delhi", order: 1 },
          { from: "Delhi", to: "Vizag", order: 2 }
        ]
      },
      {
        source: "Vizag",
        destination: "Hyderabad",
        onwardLegs: [
          { from: "Vizag", to: "Hyderabad", order: 1 }
        ],
        returnLegs: [
          { from: "Hyderabad", to: "Vizag", order: 1 }
        ]
      },
      {
        source: "Vizag",
        destination: "Bangalore",
        onwardLegs: [
          { from: "Vizag", to: "Bangalore", order: 1 }
        ],
        returnLegs: [
          { from: "Bangalore", to: "Vizag", order: 1 }
        ]
      },
      {
        source: "Vizag",
        destination: "Chennai",
        onwardLegs: [
          { from: "Vizag", to: "Chennai", order: 1 }
        ],
        returnLegs: [
          { from: "Chennai", to: "Vizag", order: 1 }
        ]
      },
      {
        source: "Vizag",
        destination: "Ooty",
        onwardLegs: [
          { from: "Vizag", to: "Coimbatore", order: 1 },
          { from: "Coimbatore", to: "Ooty", order: 2 }
        ],
        returnLegs: [
          { from: "Ooty", to: "Coimbatore", order: 1 },
          { from: "Coimbatore", to: "Vizag", order: 2 }
        ]
      },
      {
        source: "Vizag",
        destination: "Mysore",
        onwardLegs: [
          { from: "Vizag", to: "Bangalore", order: 1 },
          { from: "Bangalore", to: "Mysore", order: 2 }
        ],
        returnLegs: [
          { from: "Mysore", to: "Bangalore", order: 1 },
          { from: "Bangalore", to: "Vizag", order: 2 }
        ]
      },
      {
        source: "Vizag",
        destination: "Jaipur",
        onwardLegs: [
          { from: "Vizag", to: "Delhi", order: 1 },
          { from: "Delhi", to: "Jaipur", order: 2 }
        ],
        returnLegs: [
          { from: "Jaipur", to: "Delhi", order: 1 },
          { from: "Delhi", to: "Vizag", order: 2 }
        ]
      },
      {
        source: "Vizag",
        destination: "Mumbai",
        onwardLegs: [
          { from: "Vizag", to: "Mumbai", order: 1 }
        ],
        returnLegs: [
          { from: "Mumbai", to: "Vizag", order: 1 }
        ]
      },
      {
        source: "Vizag",
        destination: "Tirupati",
        onwardLegs: [
          { from: "Vizag", to: "Tirupati", order: 1 }
        ],
        returnLegs: [
          { from: "Tirupati", to: "Vizag", order: 1 }
        ]
      },
      {
        source: "Vizag",
        destination: "Kerala",
        onwardLegs: [
          { from: "Vizag", to: "Kerala", order: 1 }
        ],
        returnLegs: [
          { from: "Kerala", to: "Vizag", order: 1 }
        ]
      },
      {
        source: "Vizag",
        destination: "Kolkata",
        onwardLegs: [
          { from: "Vizag", to: "Kolkata", order: 1 }
        ],
        returnLegs: [
          { from: "Kolkata", to: "Vizag", order: 1 }
        ]
      }
    ]);

    await Hotel.insertMany([
      {
        destination: "Manali",
        name: "Hotel Snow Valley",
        pricePerNight: 1800,
        rating: 4.2,
        type: "Budget",
        roomType: "Non-AC"
      },
      {
        destination: "Manali",
        name: "Himalayan Heights",
        pricePerNight: 3200,
        rating: 4.5,
        type: "Mid Range",
        roomType: "Non-AC"
      },
      {
        destination: "Manali",
        name: "Span Resort & Spa",
        pricePerNight: 6500,
        rating: 4.8,
        type: "Premium",
        roomType: "Non-AC"
      },

      {
        destination: "Hyderabad",
        name: "Hotel Abode",
        pricePerNight: 1600,
        rating: 4.1,
        type: "Budget",
        roomType: "AC"
      },
      {
        destination: "Hyderabad",
        name: "Lemon Tree Hotel",
        pricePerNight: 3500,
        rating: 4.4,
        type: "Mid Range",
        roomType: "AC"
      },
      {
        destination: "Hyderabad",
        name: "Taj Krishna",
        pricePerNight: 8500,
        rating: 4.8,
        type: "Luxury",
        roomType: "AC"
      },

      {
        destination: "Bangalore",
        name: "Treebo Edge",
        pricePerNight: 1800,
        rating: 4.0,
        type: "Budget",
        roomType: "AC"
      },
      {
        destination: "Bangalore",
        name: "The Fern Residency",
        pricePerNight: 4200,
        rating: 4.3,
        type: "Mid Range",
        roomType: "AC"
      },
      {
        destination: "Bangalore",
        name: "The Leela Palace",
        pricePerNight: 10500,
        rating: 4.9,
        type: "Luxury",
        roomType: "AC"
      },

      {
        destination: "Chennai",
        name: "Hotel Pandian",
        pricePerNight: 1500,
        rating: 4.0,
        type: "Budget",
        roomType: "Non-AC"
      },
      {
        destination: "Chennai",
        name: "Clarion Hotel",
        pricePerNight: 3800,
        rating: 4.3,
        type: "Mid Range",
        roomType: "AC"
      },
      {
        destination: "Chennai",
        name: "Taj Coromandel",
        pricePerNight: 9800,
        rating: 4.8,
        type: "Luxury",
        roomType: "AC"
      },

      {
        destination: "Ooty",
        name: "Hill View Residency",
        pricePerNight: 1700,
        rating: 4.1,
        type: "Budget",
        roomType: "Non-AC"
      },
      {
        destination: "Ooty",
        name: "Lake Side Resort",
        pricePerNight: 3600,
        rating: 4.4,
        type: "Mid Range",
        roomType: "AC"
      },
      {
        destination: "Ooty",
        name: "Sterling Ooty Fern Hill",
        pricePerNight: 7600,
        rating: 4.7,
        type: "Luxury",
        roomType: "AC"
      },

      {
        destination: "Mysore",
        name: "Mysore Comfort Inn",
        pricePerNight: 1500,
        rating: 4.0,
        type: "Budget",
        roomType: "Non-AC"
      },
      {
        destination: "Mysore",
        name: "Sandesh The Prince",
        pricePerNight: 3900,
        rating: 4.3,
        type: "Mid Range",
        roomType: "AC"
      },
      {
        destination: "Mysore",
        name: "Radisson Blu Plaza",
        pricePerNight: 8200,
        rating: 4.7,
        type: "Luxury",
        roomType: "AC"
      },

      {
        destination: "Jaipur",
        name: "Hotel Pearl Palace",
        pricePerNight: 1700,
        rating: 4.2,
        type: "Budget",
        roomType: "AC"
      },
      {
        destination: "Jaipur",
        name: "Alsisar Haveli",
        pricePerNight: 4300,
        rating: 4.5,
        type: "Mid Range",
        roomType: "AC"
      },
      {
        destination: "Jaipur",
        name: "Rambagh Palace",
        pricePerNight: 14000,
        rating: 4.9,
        type: "Luxury",
        roomType: "AC"
      },

      {
        destination: "Mumbai",
        name: "Hotel Suba Palace",
        pricePerNight: 2200,
        rating: 4.1,
        type: "Budget",
        roomType: "AC"
      },
      {
        destination: "Mumbai",
        name: "The Ambassador",
        pricePerNight: 4800,
        rating: 4.4,
        type: "Mid Range",
        roomType: "AC"
      },
      {
        destination: "Mumbai",
        name: "The Taj Mahal Palace",
        pricePerNight: 13000,
        rating: 4.9,
        type: "Luxury",
        roomType: "AC"
      },

      {
        destination: "Tirupati",
        name: "Hotel Bliss",
        pricePerNight: 1400,
        rating: 4.0,
        type: "Budget",
        roomType: "AC"
      },
      {
        destination: "Tirupati",
        name: "Marasa Sarovar Premiere",
        pricePerNight: 4200,
        rating: 4.4,
        type: "Mid Range",
        roomType: "AC"
      },
      {
        destination: "Tirupati",
        name: "Fortune Select Grand Ridge",
        pricePerNight: 7800,
        rating: 4.7,
        type: "Luxury",
        roomType: "AC"
      },

      {
        destination: "Kerala",
        name: "Green Leaf Stay",
        pricePerNight: 1800,
        rating: 4.1,
        type: "Budget",
        roomType: "Non-AC"
      },
      {
        destination: "Kerala",
        name: "Coconut Lagoon Resort",
        pricePerNight: 4500,
        rating: 4.5,
        type: "Mid Range",
        roomType: "AC"
      },
      {
        destination: "Kerala",
        name: "Kumarakom Lake Resort",
        pricePerNight: 11500,
        rating: 4.9,
        type: "Luxury",
        roomType: "AC"
      },

      {
        destination: "Kolkata",
        name: "Hotel Esteem",
        pricePerNight: 1600,
        rating: 4.0,
        type: "Budget",
        roomType: "AC"
      },
      {
        destination: "Kolkata",
        name: "Kenilworth Hotel",
        pricePerNight: 4100,
        rating: 4.4,
        type: "Mid Range",
        roomType: "AC"
      },
      {
        destination: "Kolkata",
        name: "The Oberoi Grand",
        pricePerNight: 9900,
        rating: 4.8,
        type: "Luxury",
        roomType: "AC"
      }
    ]);

    await Food.insertMany([
      {
        destination: "Manali",
        name: "Local Dhaba",
        mealType: "Budget Meals",
        price: 200,
        perDayEstimate: 500
      },
      {
        destination: "Manali",
        name: "Johnson's Cafe",
        mealType: "Standard North Indian",
        price: 300,
        perDayEstimate: 500
      },
      {
        destination: "Manali",
        name: "Cafe 1947",
        mealType: "Premium Dining",
        price: 400,
        perDayEstimate: 500
      },

      {
        destination: "Hyderabad",
        name: "Bawarchi",
        mealType: "Budget Biryani",
        price: 180,
        perDayEstimate: 500
      },
      {
        destination: "Hyderabad",
        name: "Paradise",
        mealType: "Standard Biryani",
        price: 300,
        perDayEstimate: 500
      },
      {
        destination: "Hyderabad",
        name: "Jewel of Nizam",
        mealType: "Premium Dining",
        price: 900,
        perDayEstimate: 500
      },

      {
        destination: "Bangalore",
        name: "Darshini",
        mealType: "Budget South Indian",
        price: 120,
        perDayEstimate: 550
      },
      {
        destination: "Bangalore",
        name: "Empire Restaurant",
        mealType: "Standard Meals",
        price: 280,
        perDayEstimate: 550
      },
      {
        destination: "Bangalore",
        name: "Karavalli",
        mealType: "Premium Coastal Dining",
        price: 950,
        perDayEstimate: 550
      },

      {
        destination: "Chennai",
        name: "Sangeetha Veg",
        mealType: "Budget Meals",
        price: 150,
        perDayEstimate: 500
      },
      {
        destination: "Chennai",
        name: "Murugan Idli Shop",
        mealType: "Standard South Indian",
        price: 250,
        perDayEstimate: 500
      },
      {
        destination: "Chennai",
        name: "Southern Spice",
        mealType: "Premium Dining",
        price: 850,
        perDayEstimate: 500
      },

      {
        destination: "Ooty",
        name: "Nahar's Sidewalk Cafe",
        mealType: "Budget Veg",
        price: 160,
        perDayEstimate: 450
      },
      {
        destination: "Ooty",
        name: "Shinkow's",
        mealType: "Standard Chinese",
        price: 300,
        perDayEstimate: 450
      },
      {
        destination: "Ooty",
        name: "Earl's Secret",
        mealType: "Premium Dining",
        price: 700,
        perDayEstimate: 450
      },

      {
        destination: "Mysore",
        name: "Mylari",
        mealType: "Budget Tiffin",
        price: 120,
        perDayEstimate: 450
      },
      {
        destination: "Mysore",
        name: "Vinayaka Mylari",
        mealType: "Standard Meals",
        price: 220,
        perDayEstimate: 450
      },
      {
        destination: "Mysore",
        name: "The Old House",
        mealType: "Premium Dining",
        price: 650,
        perDayEstimate: 450
      },

      {
        destination: "Jaipur",
        name: "Rawat Misthan Bhandar",
        mealType: "Budget Rajasthani",
        price: 150,
        perDayEstimate: 550
      },
      {
        destination: "Jaipur",
        name: "Laxmi Misthan Bhandar",
        mealType: "Standard Meals",
        price: 280,
        perDayEstimate: 550
      },
      {
        destination: "Jaipur",
        name: "1135 AD",
        mealType: "Premium Royal Dining",
        price: 1100,
        perDayEstimate: 550
      },

      {
        destination: "Mumbai",
        name: "Anand Stall",
        mealType: "Budget Street Food",
        price: 120,
        perDayEstimate: 650
      },
      {
        destination: "Mumbai",
        name: "Cafe Madras",
        mealType: "Standard Meals",
        price: 300,
        perDayEstimate: 650
      },
      {
        destination: "Mumbai",
        name: "Masala Library",
        mealType: "Premium Dining",
        price: 1200,
        perDayEstimate: 650
      },

      {
        destination: "Tirupati",
        name: "Local Tiffin Center",
        mealType: "Budget Meals",
        price: 100,
        perDayEstimate: 400
      },
      {
        destination: "Tirupati",
        name: "Bhimas Deluxe",
        mealType: "Standard Meals",
        price: 220,
        perDayEstimate: 400
      },
      {
        destination: "Tirupati",
        name: "Hotel Mayura",
        mealType: "Premium Dining",
        price: 600,
        perDayEstimate: 400
      },

      {
        destination: "Kerala",
        name: "Local Mess",
        mealType: "Budget Kerala Meals",
        price: 140,
        perDayEstimate: 550
      },
      {
        destination: "Kerala",
        name: "Paragon",
        mealType: "Standard Malabar Food",
        price: 280,
        perDayEstimate: 550
      },
      {
        destination: "Kerala",
        name: "Rice Boat",
        mealType: "Premium Seafood Dining",
        price: 950,
        perDayEstimate: 550
      },

      {
        destination: "Kolkata",
        name: "Mitra Cafe",
        mealType: "Budget Snacks",
        price: 120,
        perDayEstimate: 500
      },
      {
        destination: "Kolkata",
        name: "Arsalan",
        mealType: "Standard Biryani",
        price: 260,
        perDayEstimate: 500
      },
      {
        destination: "Kolkata",
        name: "6 Ballygunge Place",
        mealType: "Premium Bengali Dining",
        price: 850,
        perDayEstimate: 500
      }
    ]);

    await OtherCost.insertMany([
      {
        destination: "Manali",
        guide: 1200,
        localTravel: 1000,
        entryFees: 400
      },
      {
        destination: "Hyderabad",
        guide: 900,
        localTravel: 700,
        entryFees: 300
      },
      {
        destination: "Bangalore",
        guide: 1000,
        localTravel: 900,
        entryFees: 350
      },
      {
        destination: "Chennai",
        guide: 850,
        localTravel: 750,
        entryFees: 300
      },
      {
        destination: "Ooty",
        guide: 800,
        localTravel: 850,
        entryFees: 250
      },
      {
        destination: "Mysore",
        guide: 700,
        localTravel: 700,
        entryFees: 250
      },
      {
        destination: "Jaipur",
        guide: 1100,
        localTravel: 900,
        entryFees: 500
      },
      {
        destination: "Mumbai",
        guide: 1200,
        localTravel: 1000,
        entryFees: 450
      },
      {
        destination: "Tirupati",
        guide: 600,
        localTravel: 500,
        entryFees: 200
      },
      {
        destination: "Kerala",
        guide: 1000,
        localTravel: 950,
        entryFees: 400
      },
      {
        destination: "Kolkata",
        guide: 850,
        localTravel: 800,
        entryFees: 300
      }
    ]);

    console.log("All seed data inserted successfully ✅");
    process.exit();
  } catch (error) {
    console.error("Seed error ❌", error);
    process.exit(1);
  }
}

seedData();