const mongoose = require("mongoose");
const cartSchema = mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "product",
    }
  },
  { versionKey: false }
);

const cartModel = new mongoose.model("cart", cartSchema);

module.exports = cartModel;
