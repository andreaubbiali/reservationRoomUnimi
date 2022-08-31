const axios = require('../utils/axiosInstance');

exports.getRoom = async (req, res) => {

    
    const prova = axios.axiosRequest(req, res);

    const response = await prova.get('/rooms');
    console.log(response.data);
    

    res.render('room');
}
