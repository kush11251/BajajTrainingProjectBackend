const jwt = require("jsonwebtoken");
const User = require("../schema/user");

const adminMiddleware = async (req, res, next) => {
    const dbUser = await User.findById(req.user.sub)
    console.log(dbUser)
    if (dbUser.isAdmin) {
        next();
    } else {
        res.status(401).json({ message: "You are not an admin" });
    }        
};

module.exports = adminMiddleware;