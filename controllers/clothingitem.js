const ClothingItem = require("../models/clothingitem");
const BadRequestError = require("../errors/BadRequest");
const NotFoundError = require("../errors/NotFound");
const ForbiddenError = require("../errors/Forbidden");

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;
  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => {
      res.send({ data: item });
    })
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        next(new BadRequestError("The data provided is invalid"));
      } else {
        next(err);
      }
    });
};

const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch(next);
};

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
    .orFail(() => {
      throw new NotFoundError("Item ID not found");
    })
    .then((item) => {
      if (String(item.owner) !== req.user._id) {
        throw new ForbiddenError(
          "You do not have the permission to delete this item"
        );
      }
      return item
        .deleteOne()
        .then(() => res.send({ data: item, message: "Item removed" }));
    })
    .catch(next);
};

const likeItem = (req, res, next) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      throw new NotFoundError("Item ID not found");
    })
    .then((card) => {
      res.send(card);
    })
    .catch(next);

const dislikeItem = (req, res, next) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      throw new NotFoundError("Item ID not found");
    })
    .then((card) => {
      res.send(card);
    })
    .catch(next);

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
};
