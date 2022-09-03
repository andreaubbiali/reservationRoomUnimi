const axios = require('axios');

exports.axiosRequest = (req, res) =>{

    this.checkUserIsLogged(req, res);

    return axios.create({
        baseURL: process.env.API_BASE_URL,
        headers:{
            'x-access-token': req.session.user.token,
        }
    });
} 

exports.checkUserIsLogged = (req, res) => {
    if (!req.session.user){
        return res.redirect('login');
    }
}
