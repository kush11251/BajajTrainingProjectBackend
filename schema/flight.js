const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
    airline: String,
    flightNo: Number,
    departs: Date,
    arrival: Date,
    fromAirport : String,
    toAirport : String,
    price : Number,
}, { timestamps: true });

const Flight = mongoose.model("Flight", flightSchema);

module.exports = Flight;