const axios = require('axios');

exports.loginUser = async (req, res) => {

    if (req.session.user){
        res.render('room');
    }

    if (req.body.email && req.body.password){

        const response = await axios.post(process.env.API_BASE_URL + 'user/login', {
            email: req.body.email,
            password: req.body.password
        }, {
            Headers: {
                'Content-Type': 'application/json'
            }
        });

        req.session.user = response.data;

        res.redirect('room');
    }

    res.render('login');
}