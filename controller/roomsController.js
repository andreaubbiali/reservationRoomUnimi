const RoomRepo = require("../repository/room");

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