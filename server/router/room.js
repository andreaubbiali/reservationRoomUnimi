const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const roomController = require('../controller/roomsController');
const validationMiddleware = require('../middleware/validationMiddleware');
const validator = require('../validator/roomValidator');

// get rooms by user roles.
router.get('/', 
    auth.verifyToken, 
    roomController.getRoomsByUserRoles
);

// get room by id.
router.get('/:id',
    auth.verifyToken,
    roomController.getRoomByID
)

// create a new room (admin)
router.post( '/',
    auth.verifyToken,
    auth.verifyAdminToken,
    validator.createRoomValidation,
    validationMiddleware,
    roomController.createRoom
)

module.exports = router;