const mongoose = require("mongoose");

const transportSchema = new mongoose.Schema(
  {
    source: {
      type: String,
      required: true,
      trim: true
    },
    destination: {
      type: String,
      required: true,
      trim: true
    },
    mode: {
      type: String,
      required: true,
      enum: ["train", "bus", "flight", "cab"]
    },
    providerName: {
      type: String,
      required: true,
      trim: true
    },
    vehicleNo: {
      type: String,
      default: "",
      trim: true
    },
    classType: {
      type: String,
      default: "",
      trim: true
    },
    price: {
      type: Number,
      required: true
    },
    distance: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transport", transportSchema);