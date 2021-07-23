const mongoose = require("mongoose")
const { Schema } = mongoose
const CommentSchema = new Schema({
    _id: Schema.Types.ObjectId,
    postId: {
        type: String,
    },
    profilePic: {
        type: String,
    },
    commentId: {
        type: Number,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    userId: {
        type: String,
    },
    commentText: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Comment', CommentSchema)