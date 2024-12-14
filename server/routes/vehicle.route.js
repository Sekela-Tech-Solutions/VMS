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
 *               name:
 *                 type: string
 *                 example: Model S
 *               brand:
 *                 type: string
 *                 example: Tesla
 *               model:
 *                 type: string
 *                 example: New
 *               price:
 *                 type: number
 *                 example: 79999
 *               status:
 *                 type: string
 *                 example: NEW
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
 *     security:
 *       - bearerAuth: []
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
 *               model:
 *                 type: string
 *                 example: New
 *               price:
 *                 type: number
 *                 example: 79999
 *               status:
 *                 type: string
 *                 example: NEW
 *     responses:
 *       201:
 *         description: Vehicle created successfully.
 *       400:
 *         description: Validation error.
 */
router.post(
  '/vehicle',
  authenticateToken,
  validate(vehicleValidation.createVehicleSchema),
  vehicleController.createVehicle
);

/**
 * @swagger
 * /vehicle/{id}:
 *   put:
 *     summary: Update all attributes of a vehicle by ID
 *     tags: [Vehicle]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the vehicle to update
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
 *               model:
 *                 type: string
 *                 example: New
 *               price:
 *                 type: number
 *                 example: 79999
 *               status:
 *                 type: string
 *                 example: NEW
 *     responses:
 *       200:
 *         description: Vehicle updated successfully.
 *       404:
 *         description: Vehicle not found.
 */
router.put('/vehicle/:id', authenticateToken, vehicleController.updateVehicle);

/**
 * @swagger
 * /vehicle/{id}/status:
 *   patch:
 *     summary: Update the status of a vehicle by ID
 *     tags: [Vehicle]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the vehicle to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: SOLD
 *     responses:
 *       200:
 *         description: Vehicle status updated successfully.
 *       404:
 *         description: Vehicle not found.
 */
router.patch('/vehicle/:id/status', authenticateToken, vehicleController.updateVehicleStatus);

module.exports = router;
