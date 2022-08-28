const RoomCtrl = require('./roomsController');
const UserCtrl = require('./userController');
const ReservationRepo = require('../repository/reservation');

/**
 * @param {*} req the request.
 * @param {*} res the response.
 * @returns 204 if the reservation is done, errors otherwise.
 */
exports.reserveRoom = async (req, res) => {

    const { roomID, date, slot } = req.body;
    const user = req.user;

    // check number of reservation
    if ( (await UserCtrl.getActiveUserReservation(user.userID)) >= process.env.MAX_ACTIVE_RESERVATION) {
        res.status(400).send('Maximum number of reservation reached');
        return res.end();
    }

    // check user role with room role
    if (!(await RoomCtrl.isRoomReservable(roomID, user.roles, date, slot))) {
        res.status(400).send('User has not the right role or the room is full.');
        return res.end();
    }

    await ReservationRepo.createReservation(roomID, user.userID, date, slot);

    res.status(204);
    return res.end();
}