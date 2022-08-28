// const RoomRepo = require("../repository/room");

/**
 * @param {*} req the request.
 * @param {*} res the response.
 * @returns 204 if the reservation is done, errors otherwise.
 */
exports.reserveRoom = async (req, res) => {

    const { roomID, date, slot } = req.body;

    const rooms = await RoomRepo.findByUserRoles(req.user.roles);
    if (!rooms){
        res.status(400).send("No rooms founded for the role: " + req.user.roles);
        return res.end();
    }

    res.status(200).json(rooms);
    return res.end();
}

// roomID: { 
//     type: String,
//     required: true 
// },
// userID: { 
//     type: [String], 
//     required: true 
// },
// date: {
//     type: Date,
//     required: true
// },
// slot: {
//     type: String,
//     enum: [constant.slot.MORNING, constant.slot.AFTERNOON],
//     retuired: true
// }