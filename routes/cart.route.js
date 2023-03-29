const { Router } = require("express");
const cartModel = require("../models/cart.model");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
require("dotenv").config();
const cartRoute = Router();

//
// cartRoute.use(authmiddleware);

cartRoute.get("/", async (req, res) => {
  const carts = await cartModel.find().populate("productId");
  return res.send(carts);
});
cartRoute.post("/", async (req, res) => {
  try {
    const product = await cartModel.findOne({
      productId: req.body.productId,
    });
    if (!product) {
      const cart = await cartModel.create({ ...req.body });
      return res.send({ message: "added to cart", data: cart });
    } else {
      return res.status(403).send({ message: "already added to the cart" });
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
});
cartRoute.delete("/", async (req, res) => {
  const carts = await cartModel.deleteMany({});
  return res.send({
    message: "Chekout Successfull",
  });
});
cartRoute.delete("/:id", async (req, res) => {
  let { id } = req.params;
  const carts = await cartModel.findOneAndDelete({ _id: id });
  return res.status(403).send({
    message: "cart removed",
  });
});

module.exports = cartRoute;
