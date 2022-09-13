const axios = require('axios');

let {basicModel:jsonOutput} = require('../model/model');

exports.getLoginPage = (req, res) => {
    jsonOutput.isAdmin = false;
    jsonOutput.error = null;
    
    return res.render('login', jsonOutput);
}

exports.getRegistrationPage = (req, res) => {
    jsonOutput.isAdmin = false;
    jsonOutput.error = null;
    
    return res.render('register', jsonOutput);
}

exports.loginUser = async (req, res) => {
    jsonOutput.error = null;

    if (req.session.user){
        return res.redirect('rooms');
    }

    if (req.body.email && req.body.password){

        await axios.post(process.env.API_BASE_URL + 'user/login', {
            email: req.body.email,
            password: req.body.password
        })
        .then(response => {
            req.session.user = response.data;
            res.redirect('rooms');
        })
        .catch(error => {
            jsonOutput.error = error.response.data;
            res.render('login', jsonOutput);
        })
   
    } else {
        jsonOutput.error = 'email or password missing';
        res.render('login', jsonOutput);
    }
}

exports.registerUser = async (req, res) => {
    jsonOutput.error = null;

    if (req.body.password != req.body.repPassword) {
        jsonOutput.error = 'Passwords does not match';
        return res.render('register', jsonOutput);
    }

    await axios.post(process.env.API_BASE_URL + 'user/register', {
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    })
    .then(response => {
        req.session.user = response.data;
        return res.redirect('rooms');
    })
    .catch(error => {
        jsonOutput.error = error.response.data;
        res.render('register', jsonOutput);
    })
}

exports.logoutUser = (req, res) => {

    req.session.destroy();

    return res.redirect('/login');
}