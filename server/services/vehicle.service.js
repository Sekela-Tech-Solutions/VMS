const { vehicleModel } = require('../models');

const createVehicle = async (body) => {
   const vehicle = await vehicleModel.create(body);
   return vehicle;
};

const getVehicles = async () => {
    const vehicles = await vehicleModel.find({});
    return vehicles;
};

/**
 * Update all attributes of a vehicle by ID
 */
const updateVehicle = async (vehicleId, body) => {
    const updatedVehicle = await vehicleModel.findByIdAndUpdate(
        vehicleId,
        body,
        { new: true, runValidators: true } // `new: true` returns the updated document, `runValidators` ensures validation
    );
    return updatedVehicle;
};

/**
 * Update only the status of a vehicle by ID
 */
const updateVehicleStatus = async (vehicleId, status) => {
    const updatedVehicle = await vehicleModel.findByIdAndUpdate(
        vehicleId,
        { status },
        { new: true, runValidators: true }
    );
    return updatedVehicle;
};

module.exports = {
    createVehicle,
    getVehicles,
    updateVehicle,
    updateVehicleStatus,
};