const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    saveData: {
        gameDate: Number,
        country: String,
        startingTileX: Number,
        startingTileY: Number
    }
}, 
    {
        //adds Date fields createdAt and UpdatedAt 
        timestamps: true
    }
);

module.exports = userSchema;