const axios = require('axios');

exports.loginUser = async (req, res) => {

    if (req.session.user){
        return res.redirect('rooms');
    }

    let jsonOutput = {
        'isAdmin': false,
        error: null,
    }

    if (req.body.email && req.body.password){

        await axios.post(process.env.API_BASE_URL + 'user/login', {
            email: req.body.email,
            password: req.body.password
        })
        .then(response => {
            req.session.user = response.data;
            return res.redirect('rooms');
        })
        .catch(error => {
            console.log(error.response.data);
            jsonOutput.error = error.response.data;
        })
   
    }

    return res.render('login', jsonOutput);
}

exports.logoutUser = (req, res) => {

    req.session.destroy();

    return res.redirect('/login');
}