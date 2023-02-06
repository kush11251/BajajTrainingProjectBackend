const bcrypt = require("bcrypt");
const User = require("../schema/user");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const { name, email, password: rawPassword, phoneNumber, profilePic, isAdmin } = req.body;

  const hashedPassword = bcrypt.hashSync(rawPassword, 10);

  const user = new User({
    name,
    email,
    password: hashedPassword,
    phoneNumber,
    profilePic,
    isAdmin
  });

  const savedUser = await user.save();
  savedUser.password = undefined;
  const token = jwt.sign({sub: savedUser._id}, process.env.TOKEN_SECRET, {expiresIn: "600m"})
  res.json({...savedUser.toJSON(), token})
};

const login = async (req, res) => {
    const { email, password: rawPassword } = req.body;

    const user = await User.findOne({ email });

    const isValid = bcrypt.compareSync(rawPassword, user.password);

    if (isValid) {
        user.password = undefined;
        const jwtToken = jwt.sign({sub: user._id}, process.env.TOKEN_SECRET, {expiresIn: "600m"})
        res.json({ ...user.toJSON(),token: jwtToken });
    } else {
        res.status(401).json({ message: "Invalid Credentials" });
    }
};

const getMe = async (req, res) => {
    const {sub} = req.user;
    const user = await User.findById(sub)
    .select("-password");
    res.json({...user.toJSON(), token: null});
};

const update = async (req, res) => {
    const {sub} = req.user;
    const payload = req.body;
    if (payload.password) {
        payload.password = bcrypt.hashSync(payload.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(sub, payload, {new: true});
    res.json(updatedUser);
}

const getAll = async (req, res) => {
    const users = await User.find();
    res.json(users);
}

const deleteOne = async (req, res) => {
    const {id} = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    res.json(deletedUser);
}

module.exports = {
    signup,
    login,
    getMe,
    update,
    getAll,
    deleteOne
};