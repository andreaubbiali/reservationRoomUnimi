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

        return roomCtrl.showErrorGetRoomByID(res, 'ROOM BOOKED');
    })
    .catch(error => {
        return roomCtrl.showErrorGetRoomByID(res, error.response.data);
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
    .catch(error => {
        return roomCtrl.showErrorGetRoomByID(res, error.response.data);
    });

    return res.redirect('/reservations');   
}  

async function reservationRequest(req, res, filter) {

    let jsonObj = {
        'isAdmin': req.session.user.isAdmin,
        'reservations': [], 
        'error': null
    }

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
                'date': date[0],
                'slot': response.data[i].slot,
            })
        }
    } catch (error) {
        jsonObj.error = error.response.data
    }
    
    return res.render('reservations', jsonObj);
}