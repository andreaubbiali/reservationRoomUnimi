const axios = require('../utils/axiosInstance');
const adminCtrl = require('./admin');

exports.getRoom = async (req, res) => {

    let {rooms:jsonOutput} = require('../model/model');
    jsonOutput.isAdmin = req.session.user.isAdmin;
    jsonOutput.rooms = [];
    jsonOutput.error = null;

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
    let {room:roomOutput} = require('../model/model');

    roomOutput.isAdmin = req.session.user.isAdmin;
    roomOutput.room = null; 
    roomOutput.error = null;

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

exports.showErrorGetRoomByID = async (req, res, err) => {
    let {room:roomOutput} = require('../model/model');

    roomOutput.isAdmin = req.session.user.isAdmin;
    roomOutput.error = err;

    return res.render('room', roomOutput);
}

exports.createRoom = async (req, res) => {
    const axiosReq = axios.axiosRequest(req, res);

    await axiosReq.post('/rooms', req.body)
    .then(response => {
        res.redirect('adminConsole');
    })
    .catch(error => {
        adminCtrl.showErrorAdminConsole(req, res, error.response.data);
    }); 
}