const router = require("express").Router();
const clothingItem = require("./clothingitem");
const users = require("./users");
const error = require("../utils/errors");
const { createUser, login } = require("../controllers/users");

router.use("/items", clothingItem);
router.use("/users", users);
router.post("/signin", login);
router.post("/signup", createUser);

router.use((req, res) => {
  res
    .status(error.NOT_FOUND)
    .send({ message: "The requested resource was not found" });
});

module.exports = router;
