const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema ({
  userID: String,
  serverID: String,
  level: {type: Number, default: 1},
  xp: {type: Number, default: 0},
  class: String,
  stats: {
    type: Map,
    of: Number
  }
})

module.exports = mongoose.model("Player", playerSchema);