const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    name: { 
        type: String,
        trim: true, 
        required: true 
    },
    rolesAllowed: { 
        type: [String], 
        required: true 
    },
    capacity: { 
        type: Number,
        required: true,
        min: 1
    },
    roomManager: {
        type: String,
        required: true
    }
},
{versionKey: false});

module.exports = mongoose.model("room", roomSchema);