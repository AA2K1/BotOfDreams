const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema ({
  id: String,
  inventory: Object
})

module.exports = mongoose.model("Inventory", inventorySchema);