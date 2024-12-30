const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
        min: 5,
        max: 255,
    },
    userName: {
        type: String,
        required: true,
        min: 5,
        max: 255,
    },
    password: {
        type: String,
        required: true,
        min: 5,
        max: 255,
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
    },
}, {timestamps: true});

const User = mongoose.model("user_list", userSchema);
module.exports = User;