const express = require("express");
const bcrypt = require("bcrypt");
const { getAllUser, addUser } = require("../services/userServices");

const route = express.Router();

route.get("/", (req, res) => {
  res.send(getAllUser());
});

route.post("/signup", async (req, res, next) => {
  try {
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const user = { email: req.body.email, password: hashedPass };
    addUser(user);
    res.status(201).send();
  } catch (error) {
    next(error);
  }
});

module.exports = route;
