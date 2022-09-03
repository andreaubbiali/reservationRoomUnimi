const axios = require('../utils/axiosInstance');
const roomCtrl = require('./room');

exports.reserveRoom = async (req, res) => {

    const request = {
        'roomID': req.body.roomID,
        'date':  req.body.date,
        'slot': req.body.slot
    }

    const axiosReq = axios.axiosRequest(req, res);

    await axiosReq.post('/reservation/book',request)
    .then(response => {

        return roomCtrl.showErrorGetRoomByID(res, 'ROOM BOOKED');
    })
    .catch(error => {
        return roomCtrl.showErrorGetRoomByID(res, error.response.data);
    });

}

exports.getReservations = async (req, res) => {

    let jsonObj = {
        'reservations': [], 
        'error': null
    }

    const axiosReq = axios.axiosRequest(req, res);

    await axiosReq.get('/reservation/user')
    .then(response => {
        
        for( let i = 0; i < response.data.length; i++){
            const date = response.data[i].date.split("T");
            jsonObj.reservations.push({
                'reservationID': response.data[i]._id,
                'roomName': response.data[i].roomID.name,
                'date': date[0],
            });
        }
    })
    .catch(error => {
        return roomCtrl.showErrorGetRoomByID(res, error.response.data);
    });

    return res.render('reservations', jsonObj);    
}  