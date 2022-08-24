const { response } = require("express");

// TODO look at the starred page on chrome, save the session into mongoDB not in local storage

exports.auth = (req, res) => {
    // Capture the input fields
	let username = req.body.username;
	let password = req.body.password;

	// Ensure the input fields exists and are not empty
	if (username && password) {

        if (username === "admin" && password === "password"){
            req.session.loggedin = true;
            res.redirect('/birds');
        } else {
            res.send('Incorrect Username and/or Password!');
        }
        res.end();
        
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
}