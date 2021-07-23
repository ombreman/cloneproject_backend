const mongoose = require("mongoose")
const { Schema } = mongoose

const ChatSchema = new Schema({

    name: String,
    message: String,
    createdAt: {
        type: Date,
        default: Date.now
    },

})


module.exports = mongoose.model("Chat", ChatSchema);