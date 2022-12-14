const RoomRepo = require('../repository/room');
const ReservationRepo = require('../repository/reservation');

const Api404Error = require('../errors/api404Response');
const Api400Error = require('../errors/api400Response');

/**
 * @param {*} req the request.
 * @param {*} res the response.
 * @returns the room by the id.
 */
 exports.getRoomByID = async (req, res, next) => {
    
    try{

        const id = req.params.id;
        const room = await RoomRepo.findById(id);
        if (!room){
            throw new Api404Error('No rooms found for the role of the user');
        }
    
        if (!req.user.roles.some(r => room.rolesAllowed.includes(r))){
            throw new Api400Error('User has no the right role for the room.');
        }
    
        res.status(200).json(room);
        return res.end();

    } catch (err) {
        next(err);
    }
}

/**
 * @param {*} req the request.
 * @param {*} res the response.
 * @returns the rooms by the logged user roles
 */
exports.getRoomsByUserRoles = async (req, res, next) => {
    try{

        const rooms = await RoomRepo.findByUserRoles(req.user.roles);
        if (!rooms || rooms.length === 0){
            throw new Api404Error('No rooms found for the role of the user');
        }
    
        res.status(200).json(rooms);
        return res.end();

    } catch (err) {
        next(err);
    }

}

/**
 * @param {*} req the request.
 * @param {*} res the response.
 */
exports.createRoom = async (req, res, next) => {
    
    try{
        await RoomRepo.createRoom(req.body);
    
        res.status(204);
        return res.end();

    } catch (err) {
        next(err);
    }

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