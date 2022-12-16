const User = require("../models/User");

const updateUser = async (req, res) => {
  try {
    const update = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(201).json(update);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getUser = async (req, res) => {};

const deleteUser = async (req, res) => {};

module.exports = {
  updateUser,
  deleteUser,
};
