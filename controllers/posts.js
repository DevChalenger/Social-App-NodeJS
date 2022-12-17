const Post = require("../models/Post");
const User = require("../models/User");

const newPost = async (req, res) => {
  const modelPost = new Post(req.body);
  try {
    await modelPost
      .save()
      .then(() =>
        res.status(200).json({
          message: "Post is created",
        })
      )
      .catch((error) => res.status(500).json(error));
  } catch (error) {
    res.status(500).json(error);
  }
};

const updatePost = async (req, res) => {
  try {
    await Post.findOne({ _id: req.params.id }).then(async (post) => {
      if (!post) res.status(404).json("Post not found");
      await Post.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      )
        .then(() => res.status(201).json("Post is updated"))
        .catch((error) => res.status(500).json(error));
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const deletePost = async (req, res) => {
  try {
    await Post.findOne({ _id: req.params.id }).then(async (post) => {
      if (!post) res.status(404).json("Post not found");
      await Post.findByIdAndDelete(req.params.id)
        .then(() => res.status(201).json("Post is deleted"))
        .catch((error) => res.status(500).json(error));
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getOnePost = async (req, res) => {
  try {
    await Post.findOne({ _id: req.params.id })
      .then(async (post) => {
        console.log(post);
        if (!post) res.status(404).json("Post not found");
        res.status(201).json(post);
      })
      .catch((error) => res.status(500).json(error));
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllPost = async (req, res) => {
  try {
    await Post.find()
      .then((post) => {
        res.status(201).json(post);
      })
      .catch((error) => res.status(500).json(error));
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  newPost,
  updatePost,
  deletePost,
  getOnePost,
  getAllPost,
};
