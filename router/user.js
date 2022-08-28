
const express = require('express');
const router = express.Router();

const authenticationController = require('../controller/authenticationController');

// login user
router.post('/login', authenticationController.login);

// register user
router.post('/register', authenticationController.register);

module.exports = router;