const bcrypt = require("bcrypt");
const User = require("../schema/user");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const { name, email, password: rawPassword, phoneNumber, isAdmin } = req.body;

  const hashedPassword = bcrypt.hashSync(rawPassword, 10);

  const user = new User({
    name,
    email,
    password: hashedPassword,
    phoneNumber,
    isAdmin
  });

  const savedUser = await user.save();
  savedUser.password = undefined;
  res.json(savedUser)
};

const login = async (req, res) => {
    const { email, password: rawPassword } = req.body;

    const user = await User.findOne({ email });

    const isValid = bcrypt.compareSync(rawPassword, user.password);

    if (isValid) {
        const jwtToken = jwt.sign({sub: user._id}, process.env.TOKEN_SECRET, {expiresIn: "600m"})
        res.json({ token: jwtToken });
    } else {
        res.status(401).json({ message: "Invalid Credentials" });
    }
};

const getMe = async (req, res) => {
    const {sub} = req.user;
    res.json(await User.findById(sub)
        .select("-password"));
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

module.exports = {
    signup,
    login,
    getMe,
    update
};