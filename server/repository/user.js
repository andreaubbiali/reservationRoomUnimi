const User = require("../model/user");

/**
 * @param {*} email the email.
 * @returns the user by email, if exist.
 */
exports.findUserByEmail = (email) => {
    return User.findOne({ email });
}

/**
 * @param {*} firstName the firstName.
 * @param {*} lastName the lastName.
 * @param {*} email the email.
 * @param {*} encryptedPassword the enctypted password. 
 * @param {*} roles the array of roles.
 * @returns the created user.
 */
exports.createUser = (firstName, lastName, email, encryptedPassword, roles) => {

    return User.create({
        firstName,
        lastName,
        email: email,
        password: encryptedPassword,
        roles: roles,
    });
}