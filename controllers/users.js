const User = require("../models/user");
const { BAD_REQUEST, NOT_FOUND, SERVER_ERROR } = require("../utils/errors");

const getUsers = (req, res) => {
  User.find({})
    .orFail()
    .then((users) => res.send(users))
    .catch(() => {
      res
        .status(BAD_REQUEST)
        .send({ message: "An error has occurred on the server" });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        res.status(BAD_REQUEST).send({ message: "The id entered is invalid" });
      } else if (err.name === "NotFoundError") {
        res.status(NOT_FOUND).send({ message: "The id entered was not found" });
      } else {
        res
          .status(SERVER_ERROR)
          .send({ message: "An error has occurred on the server" });
      }
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        res.status(NOT_FOUND).send({ message: "The data entered is invalid" });
      } else {
        res
          .status(BAD_REQUEST)
          .send({ message: "An error has occurred on the server" });
      }
    });
};

module.exports = { getUser, getUsers, createUser };
