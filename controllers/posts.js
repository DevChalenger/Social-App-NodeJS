const Post = require("../models/Post");
const User = require("../models/User");

const newPost = async (req, res) => {
  const modelPost = new Post(req.body);
  try {
    const savePost = await modelPost.save();
    res.status(200).json({
      message: "Post is created",
      data: savePost,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const updatePost = async (req, res) => {
  try {
    const updating = await Post.findByIdAndUpdate(
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

const deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(201).json("Post is deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  newPost,
  updatePost,
  deletePost,
};
