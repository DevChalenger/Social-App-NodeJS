const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = new User({
      username: username,
      email: email,
      password: hashPassword,
    });

    const newUser = await user.save();
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.login = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });
    !user && res.status(404).json("User not found");

    const comparePassword = bcrypt.compare(password, user.password);
    !comparePassword && res.status(401).json("Wrong password");

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};
