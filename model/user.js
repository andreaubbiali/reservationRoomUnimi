const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: { type: String, trim: true, required:true },
    lastName: { type: String, default: null, trim: true, required:true },
    email: { type: String, unique: true, lowercase: true, trim: true, required:true },
    password: { type: String, required:true },
    roles: { type: [String], required:true },
},
{versionKey: false});

module.exports = mongoose.model("user", userSchema);