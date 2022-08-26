const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {

    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        res.redirect('http://localhost:3000/views/login.html');
        return res.end();
    }
    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;
    } catch (err) {
        res.status(401).send("Invalid Token");
        return res.end();
    }
    return next();
}

module.exports = verifyToken;