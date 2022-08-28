const constant = require('../constants');
const { check } = require('express-validator');


exports.reserveRoomValidation = [
    check('roomID', 'Room id required').not().isEmpty(),
    check('date', 'Date required after today').isAfter(),
    check('slot', 'Slot must be one of MORNING or AFTERNOON').isIn(constant.slots)
]
