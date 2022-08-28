const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const roomController = require('../controller/roomsController');

// get rooms by user roles.
router.get('/', auth, roomController.getRoomsByUserRoles);

module.exports = router;