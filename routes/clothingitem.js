const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  validateAddClothingItem,
  validateIDs,
} = require("../middleware/validation");

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingitem");

router.post("/", auth, validateAddClothingItem, createItem);
router.get("/", getItems);
router.delete("/:itemId", auth, validateIDs, deleteItem);
router.put("/:itemId/likes", auth, validateIDs, likeItem);
router.delete("/:itemId/likes", auth, validateIDs, dislikeItem);

module.exports = router;
