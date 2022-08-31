const axios = require('axios');

exports.axiosRequest = (req, res) =>{

    if (!req.session.user){
        res.render('login');
    }

    return axios.create({
        baseURL: process.env.API_BASE_URL,
        headers:{
            'x-access-token': req.session.user.token,
        }
    });
} 


// function setTokenHeaders(token) { 

//     const apiBaseUrl = process.env.API_BASE_URL;

//     const headers = {
//         'x-access-token': token,
//     };

//     axiosRequest = axios.create({
//         baseURL: apiBaseUrl,
//         headers,
//     });

//     console.log('FINE TOKEN');

// }

// module.exports = { 
//     axiosRequest,
//     setTokenHeaders
// }