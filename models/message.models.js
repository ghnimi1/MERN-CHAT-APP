const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    user_id: {
        type: String,
    },
    text: {
        type: String,
    },
    room_id: {
        type: String,
    },
},
    {
        timestamps: true,
    });
module.exports = mongoose.model("Message", MessageSchema);
