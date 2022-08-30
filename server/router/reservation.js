const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const validationMiddleware = require('../middleware/validationMiddleware');
const reservationController = require('../controller/reservationController');
const validator = require('../validator/reservationValidator');

// user reservations.
router.get('/user',
    auth,
    reservationController.getUserReservations
);

// user reservations filtered.
router.post('/userFiltered',
    auth,
    validator.userReservationFiltered,
    validationMiddleware,
    reservationController.getUserReservationsFiltered
);

// book a room.
router.post('/book', 
    auth, 
    validator.reserveRoomValidation,
    validationMiddleware,
    reservationController.reserveRoom
);

module.exports = router;