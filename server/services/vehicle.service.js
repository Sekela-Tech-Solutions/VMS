const { vehicleModel } = require('../models');

const createVehicle = async (body) => {
    console.log('body', body)
   const vehicle = await vehicleModel.create(body);
   return vehicle;
};

const getVehicles = async () => {
    const vehicles = await vehicleModel.find({});
    return vehicles;
};

module.exports = {
    createVehicle,
    getVehicles,
};
