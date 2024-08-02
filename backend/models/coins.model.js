const mongoose = require('mongoose');
const { Schema } = mongoose;

const coin = new Schema({
    code: String, 
    rate: Number,
    volume: Number,
    delta: { 
        hour: Number, 
        day: Number,
        week: Number,
        month: Number,
        quarter: Number,
        year: Number 
    }
}, { timestamps: true });

const Coins = mongoose.model('coins', coin);

module.exports.Coins = Coins;