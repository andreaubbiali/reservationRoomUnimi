const jwt = require("jsonwebtoken");

/**
 * @param {*} userEmail the user email.
 * @param {*} userRoles the user roles.
 * @returns the jwt token.
 */
exports.createJWToken = (userID, userEmail, userRoles, isAdmin) => {
    return jwt.sign(
        { userID, userEmail, roles: userRoles, isAdmin: isAdmin },
        process.env.TOKEN_KEY,
        {
            expiresIn: "2h",
        }
    );
}

