const { newPost, updatePost, deletePost } = require("../controllers/posts");
const auth = require("../middleware/middleware");
const router = require("express").Router();

router.post("/", auth, newPost);
router.put("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.get("/all");
router.get("/:id");

module.exports = router;
