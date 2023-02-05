const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phoneNumber : String,
    profilePic : {type : String, default : "img1"},
    isAdmin : {type : Boolean, default : false},
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;