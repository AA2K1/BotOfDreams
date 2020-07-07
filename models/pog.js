const mongoose = require('mongoose');

const pogSchema = new mongoose.Schema ({
    userID: String,
    username: String,
    achievements: [String],
    pogs: Number,
    poggers: Number,
    weirdchamps: Number,
    sans: Number,
    ez: Number
})

module.exports = mongoose.model("Pog", pogSchema);