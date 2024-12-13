const express = require('express');
const router = express.Router();
const { vehicleValidation } = require('../validations');
const validate = require('../middlewares/validate');
const { vehicleController } = require('../controller');
const authenticateToken = require('../middlewares/authenticateToken');

// Route to get all vehicles
router.get('/vehicle', authenticateToken, vehicleController.getVehicles);

// Route to create a vehicle with validation middleware
router.post('/vehicle', authenticateToken, validate(vehicleValidation.createVehicleSchema), vehicleController.createVehicle);

module.exports = router;