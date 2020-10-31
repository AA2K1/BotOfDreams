const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema ({
  id: String,
  items: Object
})

module.exports = mongoose.model("Items", itemSchema);