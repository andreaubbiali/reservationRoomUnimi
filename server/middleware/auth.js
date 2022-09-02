const jwt = require("jsonwebtoken");

/**
 * Authentication middleware, verify jwt token and continue with the request.
 * @param {*} req the request.
 * @param {*} res the response.
 * @param {*} next.
 */
const verifyToken = (req, res, next) => {

    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        res.status(401).send("Token not found.");
        return res.end();
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = decoded;
    } catch (err) {
        res.status(401).send("Invalid Token");
        return res.end();
    }
    return next();
}

module.exports = verifyToken;