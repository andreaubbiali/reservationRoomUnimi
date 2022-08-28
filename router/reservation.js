const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const reservationController = require('../controller/reservationController');

// book a room.
router.post('/book', auth, reservationController.reserveRoom);

module.exports = router;