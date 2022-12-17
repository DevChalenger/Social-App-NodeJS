const {
  newPost,
  updatePost,
  deletePost,
  getOnePost,
  getAllPost,
} = require("../controllers/posts");
const auth = require("../middleware/middleware");
const router = require("express").Router();

router.post("/", auth, newPost);
router.put("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.get("/:id", getOnePost);
router.get("/", getAllPost);

module.exports = router;
