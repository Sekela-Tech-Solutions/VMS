const express = require('express');
const router = express.Router();
const { userValidation, authValidation } = require('../validations');
const validate = require('../middlewares/validate');
const { authController } = require('../controller');

/**
 * @swagger
 * /auth/signup:
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
router.post('/auth/signup', validate(userValidation.createUserSchema), authController.signUp);

/**
 * @swagger
 * /auth/signin:
 *   post:
 *     summary: Sign in to the application
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 example: "StrongP@ssword123"
 *     responses:
 *       200:
 *         description: Sign-in successful.
 *       401:
 *         description: Invalid email or password.
 *     security: [] # This ensures no authorization is required for this endpoint
 */
router.post('/auth/signin', validate(authValidation.signInSchema), authController.signIn);

module.exports = router;
