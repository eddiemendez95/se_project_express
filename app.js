const express = require("express");
const mongoose = require("mongoose");
const { PORT = 3001 } = process.env;
const app = express();
const validator = require("./middleware/validation");

mongoose.connect("mongodb://localhost:27017/wtwr_db");

const routes = require("./routes");
app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: "64598575504dd542e86f083b",
  };
  next();
});
app.use(routes);
app.use(validator);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
  console.log("This is working");
});
