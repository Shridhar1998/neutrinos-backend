const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { versionKey: false }
);

const userModel = new mongoose.model("user", userSchema);

module.exports = userModel;
