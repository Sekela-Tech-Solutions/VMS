const express = require('express');
const router = express.Router();
const { userValidation } = require('../validations');
const validate = require('../middlewares/validate');
const { authController } = require('../controller');
const authenticateToken = require('../middlewares/authenticateToken');

/**
 * @swagger
 * /auth/user:
 *   get:
 *     summary: Retrieve all users
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   fullName:
 *                     type: string
 *                   email:
 *                     type: string
 *       401:
 *         description: Unauthorized access.
 */
router.get('/auth/user', authenticateToken, authController.getUsers);
/**
 * @swagger
 * /auth/user:
 *   post:
 *     summary: Create a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 example: "StrongP@ssword123"
 *     responses:
 *       201:
 *         description: User created successfully.
 *       400:
 *         description: Validation error.
 *     security: [] # This ensures no authorization is required for this endpoint
 */
router.post('/auth/user', validate(userValidation.createUserSchema), authController.createUser);

module.exports = router;