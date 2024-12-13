const catchAsync = require('../utils/catchAsync');
const { vehicleService } = require('../services');
const httpStatus = require('http-status');

const createVehicle = catchAsync(async (req, res) => {
  const vehicle = await vehicleService.createVehicle(req.body);
  res
    .status(httpStatus.CREATED)
    .send({ success: true, message: 'Vehicle created successfully', data: vehicle });
});

const getVehicles = catchAsync(async (req, res) => {
  const vehicles = await vehicleService.getVehicles();
  res
    .status(httpStatus.OK)
    .json(vehicles);
});

module.exports = {
  createVehicle,
  getVehicles,
};