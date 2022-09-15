const axios = require('../utils/axiosInstance');
const roomCtrl = require('./room');

exports.reserveRoom = async (req, res) => {

    const request = {
        'isAdmin': req.session.user.isAdmin,
        'roomID': req.body.roomID,
        'date':  req.body.date,
        'slot': req.body.slot
    }

    const axiosReq = axios.axiosRequest(req, res);

    await axiosReq.post('/reservation/reserveRoom',request)
    .then(response => {
        roomCtrl.showErrorGetRoomByID(req, res, 'ROOM BOOKED');
    })
    .catch(error => {
        roomCtrl.showErrorGetRoomByID(req, res, error.response.data);
    });

}

exports.getReservations = async (req, res) => {

    return await reservationRequest(req, res, 'allReservations');  
}  

exports.getFilteredReservations = async (req, res) => {

    return await reservationRequest(req, res, req.body.filter);
}

exports.deleteReservation = async (req, res) => {

    const reservationID = req.body.reservationID;
    
    const axiosReq = axios.axiosRequest(req, res);

    await axiosReq.delete('/reservation/' + reservationID)
    .then(response => {
        res.redirect('/reservations'); 
    })
    .catch(error => {
        roomCtrl.showErrorGetRoomByID(req, res, error.response.data);
    });
}  

async function reservationRequest(req, res, filter) {

    let {reservations:jsonObj} = require('../model/model');
    jsonObj.reservations = [];
    jsonObj.error = null;
    jsonObj.isAdmin = req.session.user.isAdmin

    const axiosReq = axios.axiosRequest(req, res);

    let response = null;

    try{
        switch (filter) {
            case 'allReservations':
                response = await axiosReq.get('/reservation/user');
                break;
            case 'activeReservations':
                response = await axiosReq.post('/reservation/userFiltered', {
                    'active': true
                });
                break;
            case 'passedReservations':
                response = await axiosReq.post('/reservation/userFiltered', {
                    'active': false
                });
                break;
            default:
                console.log(`Sorry, something wrong`);
                return;
        }
    
        for( let i = 0; i < response.data.length; i++){
            const date = response.data[i].date.split("T");
            jsonObj.reservations.push({
                'reservationID': response.data[i]._id,
                'roomName': response.data[i].roomID.name,
                'roomManager': response.data[i].roomID.roomManager,
                'date': date[0],
                'slot': response.data[i].slot,
            })
        }
    } catch (error) {
        jsonObj.error = error.response.data
    }
    
    return res.render('reservations', jsonObj);
}