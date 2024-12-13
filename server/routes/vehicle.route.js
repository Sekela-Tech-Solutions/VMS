const express = require('express');
const router = express.Router();
const { vehicleValidation } = require('../validations');
const validate = require('../middlewares/validate');
const { vehicleController } = require('../controller');

// Route to get all vehicles
router.get('/vehicles', vehicleController.getVehicles);

// Route to create a vehicle with validation middleware
router.post('/vehicle', validate(vehicleValidation.createVehicleSchema), vehicleController.createVehicle);

module.exports = router;