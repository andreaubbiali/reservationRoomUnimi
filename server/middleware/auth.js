const jwt = require("jsonwebtoken");

const Api401Error = require('../errors/api401Response');

/**
 * Authentication middleware, verify jwt token and continue with the request.
 * @param {*} req the request.
 * @param {*} res the response.
 * @param {*} next.
 */
const verifyToken = (req, res, next) => {
    try{

        const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

        if (!token) {
            throw new Api401Error('Token not found.');
        }

        try {
            const decoded = jwt.verify(token, process.env.TOKEN_KEY);
            req.user = decoded;
        } catch (err) {
            throw new Api401Error('Invalid Token');
        }
        return next();

    } catch (err) {
        next(err);
    }
}

const verifyAdminToken = (req, res, next) => {

    try{
        const user = req.user;

        if(!(user.isAdmin)){
            throw new Api401Error('User is not an admin.');
        }
        return next();

    }catch (err) {
        next(err);
    }

}

module.exports = {
    verifyToken,
    verifyAdminToken
};