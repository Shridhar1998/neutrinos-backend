const { Router } = require("express");
const productModel = require("../models/product.model");
const productRoute = Router();

productRoute.get("/", async (req, res) => {
  const products = await productModel.find();
  return res.send(products);
});
productRoute.post("/", async (req, res) => {
  const product = await productModel.create(req.body);
  return res.send(product);
});
productRoute.patch("/:id", async (req, res) => {
  const {id}=req.params;
  const product = await productModel.findByIdAndUpdate(id,req.body)
  return res.send(product);
});
productRoute.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const products = await productModel.findOneAndDelete(id);
  return res.send({ message: "product deleted" });
});

module.exports = productRoute;
