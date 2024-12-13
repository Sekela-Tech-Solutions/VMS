const express = require('express');
const router = express.Router();
const { userValidation } = require('../validations');
const validate = require('../middlewares/validate');
const { authController } = require('../controller');
const authenticateToken = require('../middlewares/authenticateToken');

// Route to get all users
router.get('/auth/user', authenticateToken, authController.getUsers);

// Route to create a user with validation middleware
router.post('/auth/user', validate(userValidation.createUserSchema), authController.createUser);

module.exports = router;