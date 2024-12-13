const catchAsync = require('../utils/catchAsync');
const { vehicleService } = require('../services');
const httpStatus = require('http-status');

/**
 * Create a new vehicle
 */
const createVehicle = catchAsync(async (req, res) => {
  const vehicle = await vehicleService.createVehicle(req.body);
  res
    .status(httpStatus.CREATED)
    .send({ success: true, message: 'Vehicle created successfully', data: vehicle });
});

/**
 * Get all vehicles
 */
const getVehicles = catchAsync(async (req, res) => {
  const vehicles = await vehicleService.getVehicles();
  res
    .status(httpStatus.OK)
    .json(vehicles);
});

/**
 * Update all attributes of a vehicle by ID
 */
const updateVehicle = catchAsync(async (req, res) => {
  const updatedVehicle = await vehicleService.updateVehicle(req.params.id, req.body);
  if (!updatedVehicle) {
    return res
      .status(httpStatus.NOT_FOUND)
      .send({ success: false, message: 'Vehicle not found' });
  }
  res
    .status(httpStatus.OK)
    .send({ success: true, message: 'Vehicle updated successfully', data: updatedVehicle });
});

/**
 * Update only the status of a vehicle by ID
 */
const updateVehicleStatus = catchAsync(async (req, res) => {
  const updatedVehicle = await vehicleService.updateVehicleStatus(req.params.id, req.body.status);
  if (!updatedVehicle) {
    return res
      .status(httpStatus.NOT_FOUND)
      .send({ success: false, message: 'Vehicle not found' });
  }
  res
    .status(httpStatus.OK)
    .send({ success: true, message: 'Vehicle status updated successfully', data: updatedVehicle });
});

module.exports = {
  createVehicle,
  getVehicles,
  updateVehicle,
  updateVehicleStatus,
};
