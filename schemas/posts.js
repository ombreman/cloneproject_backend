
const mongoose = require("mongoose");
const { Schema } = mongoose
const getCurrentDate = require("../utils/moment")
const PostSchema = new Schema({

    _id: Schema.Types.ObjectId,
    postId: Number,
    userInfo: {

        firstName: String,
        lastName: String,
        profilePic: String,
        userId: String,
    },
    content: {
        text: String,
        picture: String,
        createdAt: { type: Date, default: Date.now }
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'

    }],

    like: {

        likeCnt: { type: Number, default: 0 },
        userList: { type: Array }
    },


})

module.exports = mongoose.model('Post', PostSchema);

