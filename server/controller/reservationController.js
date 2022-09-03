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

        reservations = filterReservations(reservations, active);

        if (!reservations || reservations.length === 0){
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
 * @returns 204 if the reservation is done, errors otherwise.
 */
exports.reserveRoom = async (req, res, next) => {
    try{

        const { roomID, date, slot } = req.body;
        const user = req.user;
    
        // check number of reservation
        let userReservations = await ReservationRepo.getReservationsByUserID(user.userID);
        if (activeUserReservations(userReservations) >= process.env.MAX_ACTIVE_RESERVATION){
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
 * @param {*} req the request.
 * @param {*} res the response.
 * @returns 204 if the reservation has been deleted, errors otherwise.
 */
exports.deleteReservation = async (req, res, next) => {
    try{

        const reservationID = req.params.reservationID;
        const user = req.user;

        const reservation = await ReservationRepo.getReservationByID(reservationID);
        if (!reservation){
            throw new Api400Error('No reservation found with the given id');
        }

        if (!(reservation.usersID.includes(user.userID))){
            throw new Api400Error('There is no reservation with this id for the user');
        }

        await ReservationRepo.deleteUserReservation(reservationID, user.userID);
    
        res.status(204);
        return res.end();

    } catch(err) {
        next(err);
    }
}

/**
 * @param {*} reservations the reservations.
 * @param {*} active the param used to filter.
 * @returns reservations filtered by the active param.
 */
function filterReservations(reservations, active) {
    if (!reservations){
        return null;
    }

    if (active){
        return reservations.filter(r => r.date >= new Date());
    } else {
        return reservations.filter(r => r.date < new Date());
    }
}

/**
 * @param {*} reservations the reservations.
 * @returns the number of active reservation.
 */
function activeUserReservations(reservations) {
    let res = filterReservations(reservations, true);
    if (!res) {
        return 0;
    }

    return res.length;
}