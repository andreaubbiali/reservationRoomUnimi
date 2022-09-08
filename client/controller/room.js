const axios = require('../utils/axiosInstance');
const adminCtrl = require('./admin');

exports.getRoom = async (req, res) => {

    let jsonOutput = {
        'isAdmin': req.session.user.isAdmin,
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

let roomOutput = {
    'isAdmin': false,
    'room': null,
    'error': null
}

exports.getRoomByID = async (req, res) => {
    roomOutput.isAdmin = req.session.user.isAdmin;

    const axiosReq = axios.axiosRequest(req, res);

    await axiosReq.get('/rooms/' + req.params.id)
    .then(response => {
        roomOutput.room = response.data;
    })
    .catch(error => {
        roomOutput.error = error.response.data;
    });  

    return res.render('room', roomOutput);
}

exports.showErrorGetRoomByID = async (res, err) => {
    roomOutput.isAdmin = req.session.user.isAdmin;
    roomOutput.error = err;

    return res.render('room', roomOutput);
}

exports.createRoom = async (req, res) => {
    const axiosReq = axios.axiosRequest(req, res);

    await axiosReq.post('/rooms', req.body)
    .catch(error => {
        return adminCtrl.showErrorAdminConsole(res, error.response.data);
    });  

    return res.redirect('adminConsole');
}