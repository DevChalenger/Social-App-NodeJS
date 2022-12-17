const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    await bcrypt.hash(password, salt).then((hash) => {
      const user = new User({
        username: username,
        email: email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(200).json("New user is created"))
        .catch((error) => {
          res.status(500).json(error);
        });
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const login = async (req, res) => {
  const { username, email } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });

    if (!user) res.status(404).json("User not found");

    bcrypt
      .compare(req.body.password, user.password)
      .then((valid) => {
        if (!valid) res.status(401).json("Wrong password");

        res.status(200).json({
          token: jwt.sign({ userId: user._id }, process.env.Secure_Token, {
            expiresIn: "1d",
          }),
        });
      })
      .catch((error) => res.status(500).json({ message: error + "" }));
  } catch (error) {
    res.status(500).json({ error });
  }
};

const profile = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.Secure_Token);
    const userId = decodedToken.userId;
    await User.findOne({ _id: userId }).then((user) => {
      if (!user) {
        res.status(404).json("User not found!");
      }
      const { password, ...data } = user._doc;

      res.status(200).json(data);
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  register,
  login,
  profile,
};
