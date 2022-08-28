const RoomRepo = require("../repository/room");
const ReservationRepo = require("../repository/reservation");

/**
 * @param {*} req the request.
 * @param {*} res the response.
 * @returns the rooms by the logged user roles
 */
exports.getRoomsByUserRoles = async (req, res) => {

    const rooms = await RoomRepo.findByUserRoles(req.user.roles);
    if (!rooms){
        res.status(400).send("No rooms founded for the role: " + req.user.roles);
        return res.end();
    }

    res.status(200).json(rooms);
    return res.end();
}

/**
 * Check if a room is reservable by the userRole, the date and the slot.
 * @param {*} userRoles the array of user roles
 * @returns true if the room is reservable, false otherwise.
 */
exports.isRoomReservable = async (roomID, userRoles, date, slot) => {

    const room = await RoomRepo.findById(roomID);
    
    if (!room){
        // todo throw error with new error method
        return false;
    }
    
    if (!userRoles.some(r => room.rolesAllowed.includes(r))){
        return false;
    }

    const occupiedPlaces = await ReservationRepo.getNumberReservationByRoomID(roomID, date, slot);

    return occupiedPlaces < room.capacity;
}