const { register, login, profile } = require("../controllers/auth");
const auth = require("../middleware/middleware");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/profile", auth, profile);

module.exports = router;
