const mongoose = require("mongoose");
const constant = require("../constants");
const { Schema } = mongoose;

const reservationSchema = new mongoose.Schema({
    roomID: { 
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'room' 
    },
    usersID: { 
        type: [String], 
        required: true 
    },
    date: {
        type: Date,
        required: true
    },
    slot: {
        type: String,
        enum: constant.slots,
        retuired: true
    }
},{ versionKey: false });

module.exports = mongoose.model("reservation", reservationSchema);