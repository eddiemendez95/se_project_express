const jwt = require("jsonwebtoken");
require("dotenv").config();
const UnauthorizedError = require("../errors/Unauthorized");
const JWT_SECRET = require("../utils/config");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(UnauthorizedError)
      .send({ message: "Authorization is required" });
  }
  const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.error(err);
    return res
      .status(UnauthorizedError)
      .send({ message: "Authorization is required" });
  }
  req.user = payload;
  return next();
};
