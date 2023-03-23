const express = require("express");
const bcrypt = require("bcrypt");
const { getAllUser, addUser } = require("../services/userServices");
const { localGuard } = require("../auth");

const route = express.Router();

route.get("/", (req, res) => {
  res.send(getAllUser());
});

route.post("/signup", async (req, res, next) => {
  try {
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const user = { id: req.body.id, email: req.body.email, password: hashedPass };
    addUser(user);
    res.status(201).send();
  } catch (error) {
    next(error);
  }
});

route.get("/user", localGuard, async (req, res, next) => {
  res.json(req.user);
});

module.exports = route;
