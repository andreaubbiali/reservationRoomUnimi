const jwt = require("jsonwebtoken");

/**
 * @param {*} userEmail the user email.
 * @param {*} userRoles the user roles.
 * @returns the jwt token.
 */
exports.createJWToken = (userID, userEmail, userRoles) => {
    return jwt.sign(
        { userID, userEmail, roles: userRoles },
        process.env.TOKEN_KEY,
        {
            expiresIn: "2h",
        }
    );
}

