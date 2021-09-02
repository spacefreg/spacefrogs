const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    saveData: {
        gameDate: Number,
        country: String,
        startingTileX: Number,
        startingTileY: Number
    }
});

module.exports = userSchema;