const express = require('express');
const router = express.Router();
const { vehicleValidation } = require('../validations');
const validate = require('../middlewares/validate');
const { vehicleController } = require('../controller');
const authenticateToken = require('../middlewares/authenticateToken');

/**
 * @swagger
 * /vehicle:
 *   get:
 *     summary: Retrieve all vehicles
 *     tags: [Vehicle]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of vehicles retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   brand:
 *                     type: string
 *                   price:
 *                     type: number
 *       401:
 *         description: Unauthorized access.
 */
router.get('/vehicle', authenticateToken, vehicleController.getVehicles);

/**
 * @swagger
 * /vehicle:
 *   post:
 *     summary: Create a new vehicle
 *     tags: [Vehicle]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Model S
 *               brand:
 *                 type: string
 *                 example: Tesla
 *               year:
 *                 type: integer
 *                 example: 2024
 *               price:
 *                 type: number
 *                 example: 79999
 *     responses:
 *       201:
 *         description: Vehicle created successfully.
 *       400:
 *         description: Validation error.
 */
router.post('/vehicle', authenticateToken, validate(vehicleValidation.createVehicleSchema), vehicleController.createVehicle);

module.exports = router;