// TODO look at the starred page on chrome, save the session into mongoDB not in local storage


exports.auth = (req, res) => {

    // Capture the input fields
	let username = req.body.username;
	let password = req.body.password;

    console.log(username + "  " + password);

	// Ensure the input fields exists and are not empty
	if (username && password) {

        if (username === "admin" && password === "password"){
            req.session.loggedin = true;
            res.redirect('/birds');
        } else {

            let resp = {
                "response": "Incorrect Username and/or Password!"
            }

            res.render('login', resp);
        }
        res.end();
        
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
}