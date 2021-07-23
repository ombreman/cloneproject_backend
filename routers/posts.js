const express = require("express")
const router = express.Router()
const Post = require("../schemas/posts")
const Comment = require("../schemas/comments")
const mongoose = require("mongoose")
const authMiddleware = require("../middlewares/auth-middleware")


router.get("/", async (req, res) => {
    console.log(" Getting all the post API")
    const list = await Post.find({}).sort({ postId: -1 }).populate('comments')
    res.status(200).json(list)
})
router.post("/", authMiddleware, async (req, res) => {
    console.log("Writing post API")
    const posts = await Post.find({})
    const postId = posts.length + 1
    const user = res.locals.user
    const firstName = user.firstName
    const lastName = user.lastName
    const profilePic = user.profilePic
    const userId = user.userId

    const userInfo = { firstName, lastName, profilePic, userId }
    const { content, like } = req.body
    const _id = new mongoose.Types.ObjectId()
    const potato = { postId: _id, userId }
    await Post.create({ postId, content, userInfo, like, _id })
    res.status(201).send({ potato })
})
router.delete("/:postId", authMiddleware, async (req, res) => {
    console.log("delete post API")
    const user = res.locals.user
    const { postId } = req.params
    console.log(postId)
    await Post.findOneAndRemove({ _id: postId })
    res.status(201).send("Post successfully deleted")
})
router.put("/:postId", authMiddleware, async (req, res) => {
    console.log("delete post API")
    const user = res.locals.user
    const { postId } = req.params
    console.log(postId)
    const { content } = req.body
    console.log(content, "here line 5000000")
    await Post.findOneAndUpdate({ _id: postId }, { content })
    res.status(201).send("Post successfully updated")
})

router.put("/:postId/like", authMiddleware, async (req, res) => {
    console.log("like API")
    const { postId } = req.params
    console.log(postId, "herherehrherhehrehrehr")
    const user = res.locals.user
    const firstName = user.firstName
    const lastName = user.lastName
    const profilePic = user.profilePic
    const userId = user.userId
    const userInfo = { firstName, lastName, profilePic, userId }
    const post = await Post.findOne({ _id: postId })
    let likeCnt = post.like.likeCnt
    let userList = post.like.userList
    const isExist = userList.find(a => a.userId === userId)
    if (isExist) {
        for (let i = 0; i < userList.length; i++) {
            const targetId = (userList[i].userId)
            if (targetId === userId) {
                userList.splice(i, 1)
                post.save()
            }
        }
        likeCnt = likeCnt - 1
        post.like.likeCnt = likeCnt
        return res.status(200).send("successfully unlike")
    } else {
        userList.push(userInfo)
        likeCnt = likeCnt + 1
        post.like.likeCnt = likeCnt
        post.save()
    }
    res.status(201).send("like successfully updated")
})

module.exports = router