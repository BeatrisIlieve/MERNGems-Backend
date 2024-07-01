const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  jewelry: {
    type: Number,
    ref: "Jewelry",
    required: true,
  },
  size: {
    type: Number,
    ref: "Size",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const inventory = mongoose.model("Inventory", inventorySchema);

module.exports = inventory;
