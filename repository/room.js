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