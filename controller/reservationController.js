const RoomCtrl = require('./roomsController');
const UserCtrl = require('./userController');
const ReservationRepo = require('../repository/reservation');

const Api400Error = require('../errors/api400Response');

/**
 * @param {*} req the request.
 * @param {*} res the response.
 * @returns 204 if the reservation is done, errors otherwise.
 */
exports.reserveRoom = async (req, res, next) => {
    try{

        const { roomID, date, slot } = req.body;
        const user = req.user;
    
        // check number of reservation
        if ( (await UserCtrl.getActiveUserReservation(user.userID)) >= process.env.MAX_ACTIVE_RESERVATION) {
            throw new Api400Error('Maximum number of reservation reached');
        }
    
        // check user role with room role
        if (!(await RoomCtrl.isRoomReservable(roomID, user.roles, user.userID, date, slot))) {
            throw new Api400Error('The room is full.');
        }
    
        await ReservationRepo.createReservation(roomID, user.userID, date, slot);
    
        res.status(204);
        return res.end();

    } catch(err) {
        next(err);
    }

}