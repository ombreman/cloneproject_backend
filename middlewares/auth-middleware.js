const jwt = require("jsonwebtoken");
const User = require("../schemas/users");

module.exports = (req, res, next) => {
    //console.log("this is test for the middleware");

    const { authorization } = req.headers;
    //console.log(authorization);
    const [tokenType, tokenValue] = authorization.split(" ");

    // console.log(tokenValue, "from middleware token value ");
    // console.log(tokenType, "from middleware token type ");
    if (tokenType !== "Bearer") {
        res.status(401).send({
            errorMessage: "Login please ",
        });
        return;
    }

    try {
        /* jwt보낸거로가져와 */
        const { user } = jwt.verify(tokenValue, "walaby");
        User.findOne({ userId: user }) // id 에서 user차저
            .exec()
            .then((user) => {
                res.locals.user = user;

                next();
            });
    } catch (error) {
        res.status(401).send({
            errorMessage: "Login pelase ",
        });
        return;
    }
};