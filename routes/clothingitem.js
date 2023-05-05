const router = require("express").Router();

const { createItem } = require("../controllers/clothingitem");

router.post("/", createItem);

module.exports = router;
