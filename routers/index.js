const express = require("express")
const router = express.Router()
const User = require("../schemas/users");
const hash = require("object-hash")
const jwt = require("jsonwebtoken")
const authMiddleware = require("../middlewares/auth-middleware")

router.post("/login", async (req, res) => {
    console.log(" login API ")

    const { userId } = req.body
    const password = hash(req.body.password)
    const user = await User.findOne({ email: userId, password })

    if (user) {
        const tokenId = user.userId
        console.log(tokenId, " here her hereherh 17 from index.js")
        const token = jwt.sign({ user: tokenId }, "walaby")

        const userInfo = {
            fistName: user.firstName,
            lastName: user.lastName,
            profilePic: user.profilePic
        }
        return res.status(200).send({ token, userInfo })
    }
    res.status(400).send("Wrong Id or Password")
})

router.post("/signup", async (req, res) => {
    console.log("Sign Up API")
    const { email } = req.body
    const isExist = await User.findOne({ email: email })
    if (isExist) {
        res.status(400).send("email already registered")
        return
    }
    const password = hash(req.body.password)

    const { firstName, lastName, gender, profilePic } = req.body
    console.log(profilePic)
    const allUser = await User.find({})
    const userId = allUser.length + 1
    await User.create({ firstName, lastName, email, gender, profilePic, password, userId })
    res.status(201).send(" signup successful ")

})


router.get("/me", authMiddleware, async (req, res) => {
    const user = res.locals.user
    const userInfo = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        profilePic: user.profilePic,
        userId: user.userId
    }
    res.send({ userInfo })
})

module.exports = router