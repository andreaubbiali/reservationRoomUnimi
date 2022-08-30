
const express = require('express');
const router = express.Router();

const authenticationController = require('../controller/userController');
const validator = require('../validator/userValidator');
const validationMiddleware = require('../middleware/validationMiddleware');

// login user
router.post('/login',
    validator.loginValidation,
    validationMiddleware,
    authenticationController.login
);

// register user
router.post('/register', 
    validator.registerValidation,
    validationMiddleware,
    authenticationController.register
);

module.exports = router;