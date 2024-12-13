const mongoose = require('mongoose');

const vehicleSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    brand: {
        type: String,
        required: true,
        trim: true,
    },
    model: {
        type: String,
        required: true,
        trim: true,
    },
    year: {
        type: Number,
        required: true,
    },
    engineCapacity: {
        type: Number, // in cc (cubic centimeters)
        required: true,
    },
    fuelType: {
        type: String, // e.g., "Petrol", "Diesel", "Electric"
        required: true,
        trim: true,
    },
    transmission: {
        type: String, // e.g., "Manual", "Automatic"
        required: true,
        trim: true,
    },
    color: {
        type: String,
        trim: true,
    },
    price: {
        type: Number, // price in relevant currency
        required: true,
    },
    status: {
        type: String, // NEW, SOLD
        trim: true,
    }
}, {
    timestamps: true
});

const vehicleModel = mongoose.model('Vehicle', vehicleSchema);
module.exports = vehicleModel;
