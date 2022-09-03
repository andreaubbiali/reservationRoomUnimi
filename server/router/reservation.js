const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const validationMiddleware = require('../middleware/validationMiddleware');
const reservationController = require('../controller/reservationController');
const validator = require('../validator/reservationValidator');

// user reservations.
router.get('/user',
    auth.verifyToken,
    reservationController.getUserReservations
);

// user reservations filtered.
router.post('/userFiltered',
    auth.verifyToken,
    validator.userReservationFiltered,
    validationMiddleware,
    reservationController.getUserReservationsFiltered
);

// book a room.
router.post('/reserveRoom', 
    auth.verifyToken, 
    validator.reserveRoomValidation,
    validationMiddleware,
    reservationController.reserveRoom
);

// delete a reservation
router.delete('/:reservationID', 
    auth.verifyToken,
    reservationController.deleteReservation
);

module.exports = router;