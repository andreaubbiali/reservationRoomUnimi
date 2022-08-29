const RoomCtrl = require('./roomsController');
const UserCtrl = require('./userController');
const ReservationRepo = require('../repository/reservation');

const Api400Error = require('../errors/api400Response');
const Api404Error = require('../errors/api404Response');

/**
 * @param {*} req the request.
 * @param {*} res the response.
 * @returns reservations of the user.
 */
exports.getUserReservations = async (req, res, next) => {
    try{

        const user = req.user;

        let reservations = await ReservationRepo.GetReservationsByUserID(user.userID);
        if (!reservations || reservations.length == 0){
            throw new Api404Error('No reservation found for the user.');
        }
        
        res.status(200).json(reservations);
        return res.end();

    } catch(err) {
        next(err);
    }
}

/**
 * @param {*} req the request.
 * @param {*} res the response.
 * @returns reservations of the user filtered.
 */
 exports.getUserReservationsFiltered = async (req, res, next) => {
    try{

        const {active} = req.body;
        const user = req.user;

        let reservations = await ReservationRepo.GetReservationsByUserID(user.userID);
        if (!reservations || reservations.length === 0){
            throw new Api404Error('No reservation found for the user.');
        }

        reservations = filterReservations(reservations, active);
        
        res.status(200).json(reservations);
        return res.end();

    } catch(err) {
        next(err);
    }
}

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
        // todo fixa questa chiamata
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

/**
 * @param {*} reservations the reservations.
 * @param {*} active the param used to filter.
 */
function filterReservations(reservations, active) {
    let res = null;
    if (active){
        res = reservations.filter(r => r.date >= new Date());
    } else {
        res = reservations.filter(r => r.date < new Date());
    }

    if (!res || res.length === 0){
        throw new Api404Error('No reservation found for the user.');
    }
    return res
}