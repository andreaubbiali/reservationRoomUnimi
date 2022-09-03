const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const roomController = require('../controller/roomsController');

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

module.exports = router;