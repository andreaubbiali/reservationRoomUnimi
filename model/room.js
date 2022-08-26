const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    name: { type: String, default: null },
    rolesAllowed: { type: [String] },
});

module.exports = mongoose.model("room", roomSchema);