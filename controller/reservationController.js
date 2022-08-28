const RoomCtrl = require('./roomsController');
const constant = require('../constants');

/**
 * @param {*} req the request.
 * @param {*} res the response.
 * @returns 204 if the reservation is done, errors otherwise.
 */
exports.reserveRoom = async (req, res) => {

    const { roomID, date, slot } = req.body;
    const user = req.user;

    if (!roomID || !date || !slot || !user) {
        res.status(400).send('Some param missing');
        return res.end();
    }

    if ((date <= (new Date())) || !(constant.slots.contains(slot)) ){
        res.status(400).send('Date or slot wrong');
        return res.end();
    }

    // check user role with room role
    if (!(await RoomCtrl.isRoomReservableByUserRoles(roomID, user.roles))) {
        res.status(400).send('User has not the right role to book this room');
        return res.end();
    }

    // check number of reservation
    if ( (await UserCtrl.getActiveUserReservation(user.userID)) >= process.env.MAX_ACTIVE_RESERVATION) {
        res.status(400).send('Maximum number of reservation reached');
        return res.end();
    }

    res.status(204);
    return res.end();
}

// roomID: { 
//     type: String,
//     required: true 
// },
// userID: { 
//     type: [String], 
//     required: true 
// },
// date: {
//     type: Date,
//     required: true
// },
// slot: {
//     type: String,
//     enum: [constant.slot.MORNING, constant.slot.AFTERNOON],
//     retuired: true
// }