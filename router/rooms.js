const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const roomController = require('../controller/roomsController');

// define the home page route
router.get('/', auth, roomController.getRoomsByUserRoles);

module.exports = router;