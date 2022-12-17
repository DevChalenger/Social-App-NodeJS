const User = require("../models/User");

const updateUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(201).json("Post is updated");
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(201).json("User is deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  updateUser,
  deleteUser,
};
