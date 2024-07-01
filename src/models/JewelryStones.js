const mongoose = require("mongoose");

const jewelryStonesSchema = new mongoose.Schema({
  jewelry: {
    type: Number,
    ref: "Jewelry",
    required: true,
  },
  stoneType: {
    type: Number,
    ref: "StoneType",
    required: true,
  },
  stoneColor: {
    type: Number,
    ref: "StoneColor",
    required: true,
  },
  caratWeight: {
    type: mongoose.Decimal128,
    required: false,
  },
});

const jewelryStones = mongoose.model("JewelryStones", jewelryStonesSchema);

module.exports = jewelryStones;
