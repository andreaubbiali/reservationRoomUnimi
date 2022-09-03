const Reservation = require("../model/reservation");

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
exports.GetReservationsByUserID = async (userID) => {
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