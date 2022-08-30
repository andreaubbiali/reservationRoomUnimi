const mongoose = require("mongoose");
const constant = require("../constants");


const reservationSchema = new mongoose.Schema({
    roomID: { 
        type: String,
        required: true 
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
    // startDate: {
    //     type: Date, 
    //     required: true,
    // },
    // endDate: { 
    //     type: Date, 
    //     required: function() {
    //         return 
    //     } 
    // }
},{ versionKey: false });

module.exports = mongoose.model("reservation", reservationSchema);