const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authcontroller');

// ✅ Import the validation middleware
const validateUser = require('../middleware/validationMiddleware');

// ✅ Use validation middleware for registration route
router.post('/register', validateUser, register);

router.post('/login', login);

module.exports = router;
