const { check } = require('express-validator');

exports.loginValidation = [
    check('email', 'Email required type email').isEmail(),
    check('password', 'Password must be at least long 8 char').isLength({ min:8 })
]

exports.registerValidation = [
    check('email', 'Email required type email').isEmail(),
    check('password', 'Password must be at least long 8 char').isLength({ min:8 }),
    check('firstName', 'FirstName required').not().isEmpty(),
    check('lastName', 'LastName required').not().isEmpty()
]
