// TODO look at the starred page on chrome, save the session into mongoDB not in local storage

const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {

    // console.log(req.body);

    // // Capture the input fields
    // let username = req.body.username;
    // let password = req.body.password;

    // console.log(username + "  " + password);

    // // Ensure the input fields exists and are not empty
    // if ((username && password)) {

    //   if (username === "admin" && password === "password") {
    //     req.session.loggedin = true;
    //     res.redirect('/birds');
    //   } else {

    //     res.status(401).send("Incorrect Username/Password!");
    //     // let resp = {
    //     //   "response": "Incorrect Username and/or Password!"
    //     // }

    //     // res.render('login', resp);
    //   }
    //   res.end();

    // } else {
    //   res.status(401).send('Please enter Username and Password!');
    //   res.end();
    // }

    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );

            // save user token
            user.token = token;

            // user
            res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }
}

exports.register = async (req, res) => {

    try {

        const { firstName, lastName, email, password } = req.body;

        // Validate user input
        if (!(email && password && firstName && lastName)) {
            res.status(400).send("All input is required");
        }

        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await User.create({
            firstName,
            lastName,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
        });

        // Create token
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );
        // save user token
        user.token = token;

        // return new user
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }

}