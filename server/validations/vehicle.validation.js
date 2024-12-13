const joi = require('joi');

const createVehicleSchema = {
    body: joi.object().keys({
        name: joi.string().required().trim(),
        brand: joi.string().required().trim(),
        model: joi.string().required().trim(),
        year: joi.number().integer().required(),
        engineCapacity: joi.number().required(),
        fuelType: joi.string().required().trim(),
        transmission: joi.string().required().trim(),
        color: joi.string().trim().optional(),
        price: joi.number().required(),
    })
};

module.exports = {
    createVehicleSchema
};