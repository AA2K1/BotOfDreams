const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema ({
    items: Array
})

module.exports = mongoose.model("Shop", shopSchema);