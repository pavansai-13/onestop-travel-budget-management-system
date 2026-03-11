const transportDB = {
  "Vizag-Delhi": {
    train: [
      { trainNo: "AP Express", class: "Sleeper", price: 900 },
      { trainNo: "AP Express", class: "3A", price: 2200 }
    ],
    flight: [
      { flightNo: "Indigo 6E-234", price: 6500 },
      { flightNo: "Air India AI-887", price: 7200 }
    ]
  },

  "Delhi-Manali": {
    bus: [
      { operator: "HRTC Volvo", price: 700 },
      { operator: "Private AC Bus", price: 1500 }
    ]
  },

  "Vizag-Madgaon": {
    train: [
      { trainNo: "Konark Express", class: "Sleeper", price: 600 },
      { trainNo: "Konark Express", class: "3A", price: 1600 }
    ],
    flight: [
      { flightNo: "Indigo 6E-712", price: 6000 }
    ]
  },

  "Madgaon-Goa": {
    bus: [
      { operator: "Local Bus", price: 80, distance: "30 km" }
    ]
  },

  "Goa-Airport-Goa": {
    bus: [
      { operator: "Airport Bus", price: 150, distance: "50 km" }
    ]
  }
};

/* 🔹 Helper: Normalize user input */
function normalize(text) {
  return text ? text.trim().toLowerCase() : "";
}

function getTransportOptions(source, destination) {
  source = source.toLowerCase();
  destination = destination.toLowerCase();

  let result = { onward: [], return: [] };

  if (source === "vizag" && destination === "manali") {
    result.onward = [
      {
        leg: "Vizag → Delhi",
        options: transportDB["Vizag-Delhi"]
      },
      {
        leg: "Delhi → Manali",
        options: transportDB["Delhi-Manali"]
      }
    ];

    result.return = [
      {
        leg: "Manali → Delhi",
        options: transportDB["Delhi-Manali"]
      },
      {
        leg: "Delhi → Vizag",
        options: transportDB["Vizag-Delhi"]
      }
    ];
  }

  else if (source === "vizag" && destination === "goa") {
    result.onward = [
      {
        leg: "Vizag → Madgaon",
        options: transportDB["Vizag-Madgaon"]
      },
      {
        leg: "Madgaon → Goa",
        options: transportDB["Madgaon-Goa"]
      }
    ];

    result.return = [
      {
        leg: "Goa → Madgaon",
        options: transportDB["Madgaon-Goa"]
      },
      {
        leg: "Madgaon → Vizag",
        options: transportDB["Vizag-Madgaon"]
      }
    ];
  }

  return result;
}

module.exports = { getTransportOptions, transportDB };
