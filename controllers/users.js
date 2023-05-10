const User = require("../models/user");
const error = require("../utils/errors");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((e) => {
      res.status(500).send({ message: "Error from getUsers", e });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;

  User.findbyId(userId)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((e) => {
      res.status(500).send({ message: "Error from getUser", e });
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.send({ data: user }))
    .catch((e) => {
      res.status(500).send({ message: "Error from createUser", e });
    });
};

module.exports = { getUser, getUsers, createUser };
