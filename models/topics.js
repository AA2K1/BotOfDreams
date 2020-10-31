const mongoose = require('mongoose');

const topicsSchema = new mongoose.Schema ({
  id: Number,
  topicsArr: [String]
})

module.exports = mongoose.model("Topics", topicsSchema);