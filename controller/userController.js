const UserRepo = require('../repository/user');
const ReservationRepo = require('../repository/reservation');
const bcrypt = require("bcrypt");
const JwtUtilities = require("./jwtUtilities");

const Api400Error = require('../errors/api400Response');
const Api409Error = require('../errors/api409Response');

/**
 * login a user.
 * @param {*} req the request.
 * @param {*} res the response. 
 * @returns the logged user.
 */
exports.login = async (req, res, next) => {

    try {
        const { email, password } = req.body;

        const user = await UserRepo.findUserByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Api400Error('Invalid credentials');
        }

        user.token = JwtUtilities.createJWToken(user._id, email, user.roles);

        res.status(200).json(userToDto(user));
        return res.end();

    } catch (err) {
        next(err);
    }
}

/**
 * register a user.
 * @param {*} req the request.
 * @param {*} res the response.
 * @returns the created and logged in user.
 */
exports.register = async (req, res) => {

    try {

        const { firstName, lastName, email, password } = req.body;

        // chek if the user already exist.
        if (await UserRepo.findUserByEmail(email)) {
            throw new Api409Error();
        }

        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);

        const user = await UserRepo.createUser(firstName, lastName, email, encryptedPassword, [process.env.BASE_USER_ROLE]);

        user.token = JwtUtilities.createJWToken(user._id, email, user.roles);;

        res.status(201).json(userToDto(user));
        return res.end();
    } catch (err) {
        next(err);
    }
}

/**
 * @param {*} userID the user id.
 * @returns the number of active user reservations.
 */
exports.getActiveUserReservation = async (userID) => {
    return ReservationRepo.getActiveUserReservation(userID);
}

/**
 * @param {*} user the repository user.
 * @returns the essentials user information.
 */
function userToDto(user) {
    return {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        roles: user.roles,
        token: user.token
    }
}