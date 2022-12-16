const router = require("express").Router();
const { updateUser } = require("../controllers/users");
const {
  verifyToken,
  verifyAuth,
  verifyAdmin,
} = require("../middleware/middleware");

router.put("/:id", verifyAuth, updateUser);

module.exports = router;
