const Room = require("../model/room");

/**
 * @param {*} roles the user roles.
 * @returns rooms by the user roles.
 */
exports.findByUserRoles = (roles) => {
    return Room.find({rolesAllowed: { $in: roles }});
}

/**
 * @param {*} id the id.
 * @returns the room.
 */
exports.findById = (id) => {
    return Room.findById(id);
}

/**
 * create a new room.
 * @param {*} room the room.
 */
exports.createRoom = (room) => {
    return Room.create({
        'name': room.name,
        'rolesAllowed': room.rolesAllowed,
        'capacity': room.capacity,
        'roomManager': room.roomManager,
    });
}