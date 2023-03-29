const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  info: { type: String, required: true },
  cost: { type: Number, required: true },
}, { versionKey: false });

const productModel = new mongoose.model("product", productSchema);

module.exports = productModel;
