const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const token = require("../utils/jwt.verif");

const register = async (req, res) => {
  const { username, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const user = await User.findOne({
    $or: [{ email: email }, { username: username }],
  });
  /* if (user.email === email) {
    res.status(403).json("email already registred");
   */
  try {
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
    await User.findOne({ _id: token(req) }).then((user) => {
      console.log(user._id);
      if (!user) {
        res.status(404).json("User not found!");
      }
      const { password, _id, ...data } = user._doc;

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
