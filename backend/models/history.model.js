const mongoose = require('mongoose');
const { Schema } = mongoose;

const history = new Schema({
    code: String,
    date: Number,
    rate: Number,
    volume: Number,
    cap: Number,
    liquidity: Number 
}, { timestamps: true });

const History = mongoose.model('history', history);

module.exports.History = History;