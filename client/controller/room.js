const axios = require('../utils/axiosInstance');

let jsonOutput = {
    'rooms': [],
    'capacity': null,
    'error': null
}

exports.getRoom = async (req, res) => {

    const prova = axios.axiosRequest(req, res);

    await prova.get('/rooms')
    .then(response => {
        jsonOutput.rooms = response.data;
    })
    .catch(error => {
        jsonOutput.error = error.response.data;
    });

    return res.render('room', jsonOutput);
}
