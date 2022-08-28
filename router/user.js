
const express = require('express');
const router = express.Router();

const authenticationController = require('./controller/authenticationController');

// login user
app.post('/login', authenticationController.login);

// register user
app.post('/register', authenticationController.register);

module.exports = router;