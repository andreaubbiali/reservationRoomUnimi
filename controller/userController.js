const UserRepo = require('../repository/user');
const ReservationRepo = require('../repository/reservation');

/**
 * @param {*} userID the user id.
 * @returns the number of active user reservations.
 */
exports.getActiveUserReservation = async (userID) => {
    return ReservationRepo.getActiveUserReservation(userID);
}