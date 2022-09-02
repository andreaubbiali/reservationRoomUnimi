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

        let errResponse = "";
        errors.array().forEach(function (err) {
            errResponse += err.msg + " ";
        })

        res.status(400).json(errResponse);
        return res.end();
    }
    
    return next();
}


module.exports = validationMiddleware;