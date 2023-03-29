const { Router } = require("express");
const userModel = require("../models/user.model");
const userRoute = Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// gives hashed password --secure
async function hashIt(pass) {
  const salt = await bcrypt.genSalt(6);
  const hashed = await bcrypt.hash(pass, salt);
  return hashed;
}

// campares the hashed password
async function compareIt(pass, hashedpass) {
  const validate = await bcrypt.compare(pass, hashedpass);
  return validate;
}

// user routes

userRoute.get("/", async (req, res) => {
  const users = await userModel.find();
  return res.send(users);
});

userRoute.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  // console.log(hashpass,"hashed")

  try {
    const hashpass = await hashIt(password);
    const isuser = await userModel.findOne({ email, password: hashpass });

    if (!isuser) {
      const user = await userModel.create({ ...req.body, password: hashpass });
      res.status(200).send({ message: "signed up successfull ", data: user });
    } else {
      return res.send({ message: "already has an account please login" });
    }

    return res.send(hashpass);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

userRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    console.log(user);
    if (user) {
      const validpass = await compareIt(password, user.password);

      if (validpass) {
        const token = jwt.sign(
          { id: user.id, email: user.email },
          process.env.SECRET,
          { expiresIn: "1 day" }
        );
        return res
          .status(200)
          .send({ message: "logged in successfully ", token });
      } else {
        return res.status(401).send({ message: "wrong password" });
      }
    } else {
      return res.send({ message: "Authentication failed" });
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

module.exports = userRoute;
