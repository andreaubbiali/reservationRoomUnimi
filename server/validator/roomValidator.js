const constant = require('../constants');
const { check } = require('express-validator');


exports.createRoomValidation = [
    check('name', 'Name required').not().isEmpty(),
    check('rolesAllowed', 'roles required').not().isEmpty(),
    check('capacity', 'Capacity required greater than 1').isInt({gt: 1})
]