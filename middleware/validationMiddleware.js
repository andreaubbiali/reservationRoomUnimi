const { validationResult } = require('express-validator');

/**
 * validation middleware, validate each fields.
 * @param {*} req the request.
 * @param {*} res the response.
 * @param {*} next.
 */
const validationMiddleware = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return res.end();
    }
    
    return next();
}


module.exports = validationMiddleware;