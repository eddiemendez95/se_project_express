const router = require("express").Router();
const user = require("../models/user");
const clothingItem = require("./clothingitem");
const users = require("./users");

router.use("/items", clothingItem);
router.use("/users", users);

router.use((req, res) => {
  res
    .status(error.NOT_FOUND)
    .send({ message: "The requested resource was not found" });
});

module.exports = router;
