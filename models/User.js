const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  trainers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trainer",
    },
  ],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
