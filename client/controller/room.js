const axios = require('../utils/axiosInstance');

exports.getRoom = async (req, res) => {

    let jsonOutput = {
        'rooms': [],
        'error': null
    }


    const axiosReq = axios.axiosRequest(req, res);

    await axiosReq.get('/rooms')
    .then(response => {
        jsonOutput.rooms = response.data;
    })
    .catch(error => {
        jsonOutput.error = error.response.data;
    });

    return res.render('rooms', jsonOutput);
}

exports.getRoomByID = async (req, res) => {

    let jsonOutput = {
        'room': null,
        'error': null
    }

    const axiosReq = axios.axiosRequest(req, res);

    await axiosReq.get('/rooms/' + req.params.id)
    .then(response => {
        jsonOutput.room = response.data;
    })
    .catch(error => {
        jsonOutput.error = error.response.data;
    });

    console.log(jsonOutput);

    return res.render('room', jsonOutput);
}