const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema ({
    userID: String,
    serverID: String,
    level: Number,
    xp: Number, 
})

module.exports = mongoose.model("Player", playerSchema);