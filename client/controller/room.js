const axios = require('../utils/axiosInstance');

let jsonOutput = {
    'rooms': [],
    'error': null
}

exports.getRoom = async (req, res) => {

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

    // const axiosReq = axios.axiosRequest(req, res);

    // await axiosReq.get('/rooms/' + req.params.id)
    // .then(response => {
    //     console.log('entraaaaaaaa');
    // })
    // .catch(error => {
    //     jsonOutput.error = error.response.data;
    // });
    console.log(jsonOutput);

    return res.render('rooms', jsonOutput);
}