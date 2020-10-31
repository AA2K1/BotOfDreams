const mongoose = require("mongoose");

const messagesSchema = new mongoose.Schema ({
    userID: String,
    messageCount: Number
})

module.exports = mongoose.model("Messages", messagesSchema);