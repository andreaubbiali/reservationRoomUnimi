const bcrypt = require("bcrypt");
const JwtUtilities = require("./jwtUtilities");
const UserRepo = require("../repository/user");

/**
 * login a user.
 * @param {*} req the request.
 * @param {*} res the response. 
 * @returns the logged user.
 */
exports.login = async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).send("All input is required");
            return res.end();
        }
        
        const user = await UserRepo.findUserByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            res.status(400).send("Invalid credentials");
            return res.end();
        }

        user.token = JwtUtilities.createJWToken(user._id, email, user.roles);


        res.status(200).json(userToDto(user));
        return res.end();

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
        return res.end();
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

        if (!email || !password || !firstName || !lastName) {
            res.status(400).send("All input is required");
            return res.end();
        }

        // chek if the user already exist.
        if (await UserRepo.findUserByEmail(email)) {
            res.status(409).send("User Already Exist. Please Login");
            return res.end();
        }

        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);

        const user = await UserRepo.createUser(firstName, lastName, email, encryptedPassword, [process.env.BASE_USER_ROLE]);

        user.token = JwtUtilities.createJWToken(user._id, email, user.roles);;

        res.status(201).json(userToDto(user));
        return res.end();
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
        return res.end();
    }
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