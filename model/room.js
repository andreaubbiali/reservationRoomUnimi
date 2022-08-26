const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    name: { type: String, default: null, trim: true, required:true },
    rolesAllowed: { type: [String], required:true },
},
{versionKey: false});

module.exports = mongoose.model("room", roomSchema);