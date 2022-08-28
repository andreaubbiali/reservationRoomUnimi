const Reservation = require("../model/reservation");

/**
 * @param {*} date the date.
 * @param {*} slot the slot.
 * @returns the number of reserved place in a specific date and slot.
 */
exports.getNumberReservationByRoomID = async (roomID, date, slot) => {
    const reservation = await Reservation.findOne({ roomID, date, slot });

    if (!reservation || reservation.length == 0) {
        return 0;
    }

    return reservation.usersID.length;
}

/**
 * @param {*} userID the user id.
 * @returns the number of reservations active for the user.
 */
exports.getActiveUserReservation = (userID) => {
// TODO add where date>today
    return Reservation
        .countDocuments({ usersID: userID });
}

/**
 * @param {*} roomID the roomID.
 * @param {*} userID the userID.
 * @param {*} date the date.
 * @param {*} slot the slot.
 * @returns the created/updated reservation. 
 */
exports.createReservation = async (roomID, userID, date, slot) => {
    
    const reservation = await Reservation.findOne({ roomID });

    if (!reservation){
        
        return Reservation.create({
            roomID,
            usersID: [userID],
            date,
            slot
        });

    } else {
        
        return Reservation.updateOne(
            { roomID },
            { $push: {usersID: userID} }
        )

    }



}