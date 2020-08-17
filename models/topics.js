const mongoose = require('mongoose');

const topicsSchema = new mongoose.Schema ({
  ID: Number,
  topicsArr: [String]
})

module.exports = mongoose.model("Topics", topicsSchema);