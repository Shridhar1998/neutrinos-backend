const express = require("express");
const dbConnect = require("./config/db");
const mongoose = require("mongoose");
const userRoute = require("./routes/user.route");
const productRoute = require("./routes/product.route");
const cartRoute = require("./routes/cart.route");
mongoose.set("strictQuery", false);
const cors = require("cors")
const app = express();

//middlewares
app.use(express.json());
app.use(cors())

// routes
app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/cart", cartRoute);

app.get("/", (req, res) => {
  res.send("welcome to our ecommerce webiste");
});

app.listen(process.env.PORT, async () => {
  await dbConnect();
  console.log(
    `mongo db and server is connected on http://localhost:${process.env.PORT}`
  );
});
