const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const validationMiddleware = require('../middleware/validationMiddleware');
const reservationController = require('../controller/reservationController');
const validator = require('../validator/reservationValidator');

// book a room.
router.post('/book', 
    auth, 
    validator.reserveRoomValidation,
    validationMiddleware,
    reservationController.reserveRoom
);

module.exports = router;