const axios = require('axios');

exports.loginUser = async (req, res) => {

    if (req.session.user){
        return res.redirect('rooms');
    }

    if (req.body.email && req.body.password){

        const response = await axios.post(process.env.API_BASE_URL + 'user/login', {
            email: req.body.email,
            password: req.body.password
        });

        req.session.user = response.data;

        return res.redirect('rooms');
    }

    return res.render('login');
}