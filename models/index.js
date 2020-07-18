require("dotenv").config();

const mongoose = require("mongoose");
const connectionString =
  process.env.MONGODB_URI || "mongodb://localhost:27017/poke-tracker";
const configOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

mongoose
  .connect(connectionString, configOptions)
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.log(`Mongo error: ${err}`));

module.exports = {
  Pokemon: require("./Pokemon"),
  Trainer: require("./Trainer"),
  User: require("./User"),
};
