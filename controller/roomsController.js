const Room = require("../model/room");

/**
 * @param {*} req the request.
 * @param {*} res the response.
 * @returns the rooms by the logged user roles
 */
exports.getRoomsByUserRoles = async (req, res) => {

    const rooms = await Room.find({rolesAllowed: { $in: req.user.roles }});
   
    res.status(200).json(rooms);
    return res.end();
}