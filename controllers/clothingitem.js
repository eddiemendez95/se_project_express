const ClothingItem = require("../models/clothingitem");
const {
  BAD_REQUEST,
  NOT_FOUND,
  SERVER_ERROR,
  FORBIDDEN,
} = require("../utils/errors");

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;
  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => {
      console.log(item);
      res.send({ data: item });
    })
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        res
          .status(BAD_REQUEST)
          .send({ message: "The data provided is invalid" });
      } else {
        res
          .status(SERVER_ERROR)
          .send({ message: "An error has occurred on the server" });
      }
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch(() => {
      res
        .status(SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageUrl } = req.body;

  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageUrl } })
    .orFail(() => {
      const error = new Error("Item ID not found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        res.status(BAD_REQUEST).send({ message: "The id entered is invalid" });
      } else if (err.statusCode === NOT_FOUND) {
        res.status(NOT_FOUND).send({ message: "The id entered was not found" });
      } else {
        res
          .status(SERVER_ERROR)
          .send({ message: "An error has occurred on the server" });
      }
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
    .orFail(() => {
      const error = new Error("Item ID not found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((item) => {
      if (String(item.owner) !== req.user._id) {
        return res.status(FORBIDDEN).send({
          message: "You do not have the permission to delete this item",
        });
      }
      return item
        .deleteOne()
        .then(() => res.send({ data: item, message: "Item removed" }));
    })
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        res.status(BAD_REQUEST).send({ message: "The id entered is invalid" });
      } else if (err.statusCode === NOT_FOUND) {
        res.status(NOT_FOUND).send({ message: "The id entered was not found" });
      } else {
        res
          .status(SERVER_ERROR)
          .send({ message: "An error has occurred on the server" });
      }
    });
};

const likeItem = (req, res) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Item ID not found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then(() => {
      res.send({ message: "Item liked" });
    })
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        res
          .status(BAD_REQUEST)
          .send({ message: "The data provided is invalid" });
      } else if (err.statusCode === NOT_FOUND) {
        res.status(NOT_FOUND).send({ message: "The id entered was not found" });
      } else {
        res
          .status(SERVER_ERROR)
          .send({ message: "An error has occurred on the server" });
      }
    });

const dislikeItem = (req, res) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Item ID not found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then(() => {
      res.send({ message: "Item disliked" });
    })
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        res
          .status(BAD_REQUEST)
          .send({ message: "The data provided is invalid" });
      } else if (err.statusCode === NOT_FOUND) {
        res.status(NOT_FOUND).send({ message: "The id entered was not found" });
      } else {
        res
          .status(SERVER_ERROR)
          .send({ message: "An error has occurred on the server" });
      }
    });

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  likeItem,
  dislikeItem,
};
