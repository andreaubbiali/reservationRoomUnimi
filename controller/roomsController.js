const RoomRepo = require('../repository/room');
const ReservationRepo = require('../repository/reservation');

const Api404Error = require('../errors/api404Response');
const Api400Error = require('../errors/api400Response');

/**
 * @param {*} req the request.
 * @param {*} res the response.
 * @returns the rooms by the logged user roles
 */
exports.getRoomsByUserRoles = async (req, res) => {

    const rooms = await RoomRepo.findByUserRoles(req.user.roles);
    if (!rooms){
        throw new Api404Error('No rooms found for the role of the user');
    }

    res.status(200).json(rooms);
    return res.end();
}

/**
 * Check if a room is reservable by the userRole, the date and the slot.
 * @param {*} userRoles the array of user roles
 * @returns true if the room is reservable, false otherwise.
 */
exports.isRoomReservable = async (roomID, userRoles, userID, date, slot) => {

    const room = await RoomRepo.findById(roomID);
    
    if (!room){
        throw new Api404Error('No rooms found with the given id');
    }

    if (!userRoles.some(r => room.rolesAllowed.includes(r))){
        throw new Api400Error('User has no the right role to reserve the room.');
    }

    const reservation = await ReservationRepo.getReservation(roomID, date, slot);
    if (reservation) {

        // check occupied places.
        if (reservation.usersID.length >= room.capacity){
            return false;
        }
        
        if (reservation.usersID.includes(userID)){
            throw new Api400Error('User has already reserved this room.')
        }

    }

    return true;
}