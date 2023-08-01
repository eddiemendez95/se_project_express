const router = require("express").Router();
const clothingItem = require("./clothingitem");
const users = require("./users");
const { createUser, login } = require("../controllers/users");
const NotFoundError = require("../errors/NotFound");
const {
  validateUserSignInInfo,
  validateUserSignUpInfo,
} = require("../middleware/validation");

router.use("/items", clothingItem);
router.use("/users", users);
router.post("/signin", validateUserSignInInfo, login);
router.post("/signup", validateUserSignUpInfo, createUser);

router.use(() => {
  throw new NotFoundError("The requested resource was not found");
});

module.exports = router;
