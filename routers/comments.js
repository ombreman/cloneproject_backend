const express = require("express")
const router = express.Router()
const Comment = require("../schemas/comments");

// CREATE comments ---------------------------------------
// router.post('/', async (req, res) => {
//     // comments writer info get from token
//     const user = new User(req.body);
//     try {
//         await user.save();
//         await res.status(201).send(user);
//     } catch (err) {
//         res.status(400).send(err);
//     }
// });

router.post('/', async (req, res) => {
    // comments writer info get from token


    const { commentText, postId } = req.body
    const allComments = await Comment.find({})
    const commentId = allComments.length + 1
    // first name and last name get it from db that searched by userId in the token
    const firstName = "skyler"
    const lastName = "Bang"
    try {
        await User.create({ postId, commentId, commentText, firstName, lastName });
        await res.status(201).send(" comment  successfully written ");
    } catch (err) {
        res.status(400).send(err);
    }
});


// UPDATE comments ---------------------------------------
router.put('/:commentId', (req, res, next) => {
    Comment.update({ commentId: req.params.commentid }, { comment: req.body.comment })
        .then((result) => {
            res.json(result)
        })
        .catch((err) => {
            console.error(err)
            next(err)
        })
})

// delete comments ---------------------------------------
router.delete('/:commentId', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.commentId); // find one and delete
        if (!user) res.status(404).send(); // if user is not received
        res.send(user);
    } catch (err) { // if error occurs
        res.status(500).send(); // internal server error messege
    }

});
module.exports = router