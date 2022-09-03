const Reservation = require("../model/reservation");

/**
 * @param {*} reservationID 
 * @returns 
 */
exports.getReservationByID = async (reservationID) => {
    return Reservation.findOne({ '_id': reservationID });
}

/**
 * @param {*} roomID the roomID.
 * @param {*} date the date.
 * @param {*} slot the slot.
 * @returns the reservation of a specific room in a date and slot.
 */
exports.getReservation = async (roomID, date, slot) => {
    return await Reservation.findOne({ roomID, date, slot });
}

/**
 * @param {*} userID the userID.
 * @returns the reservations of the user.
 */
exports.getReservationsByUserID = async (userID) => {
    return Reservation.find({ usersID: userID }).sort('date').populate('roomID');
}

/**
 * @param {*} roomID the roomID.
 * @param {*} userID the userID.
 * @param {*} date the date.
 * @param {*} slot the slot.
 * @returns the created/updated reservation. 
 */
exports.createReservation = async (roomID, userID, date, slot) => {

    const reservation = await Reservation.findOne({ roomID, date, slot });

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

/**
 * @param {*} reservationID the reservationID.
 * @param {*} userID the userID.
 */
exports.deleteUserReservation = async (reservationID, userID) => {

    res = await Reservation.updateOne(
        {'_id': reservationID},
        { $pull: {usersID: userID}}
    )
    
    const reservation = await this.getReservationByID(reservationID);
    if (reservation.usersID.length === 0){
        return Reservation.remove({'_id': reservationID});
    }
    
    return
}