const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const birdController = require('../controller/birdController');

// define the home page route
router.get('/', auth, birdController.function_name);

module.exports = router;