const router = require("express").Router();
const user = require("../models/user");
const clothingItem = require("./clothingitem");
const users = require("./users");

router.use("/items", clothingItem);
router.use("/users", users);

router.use((req, res) => {
  res.status(500).send({ message: "Router not found" });
});

module.exports = router;
