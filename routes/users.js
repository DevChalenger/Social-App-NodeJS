const router = require("express").Router();
const { updateUser, deleteUser } = require("../controllers/users");
const auth = require("../middleware/middleware");

router.put("/:id", auth, updateUser);
router.delete("/:id", auth, deleteUser);

module.exports = router;
