const router = require("express").Router();
const auth = require("../middleware/auth");
const { getCurrentUser, updateProfile } = require("../controllers/users");
const { validateUserUpdateInfo } = require("../middleware/validation");

router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, validateUserUpdateInfo, updateProfile);

module.exports = router;
