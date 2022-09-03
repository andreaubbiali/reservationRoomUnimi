const axios = require('../utils/axiosInstance');
const roomCtrl = require('./room');

exports.reserveRoom = async (req, res, next) => {

    const request = {
        'roomID': req.body.roomID,
        'date':  req.body.date,
        'slot': req.body.slot
    }

    const axiosReq = axios.axiosRequest(req, res);

    await axiosReq.post('/reservation/book',request)
    .then(response => {

        return roomCtrl.showErrorGetRoomByID(res, 'PRENOTAZIONE ANDATA A BUON FINE');
    })
    .catch(error => {
        return roomCtrl.showErrorGetRoomByID(res, error.response.data);
    });

}