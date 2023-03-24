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
    const user = req.body;
    await addUser(user);
    res.status(201).send();
  } catch (error) {
    next(error);
  }
});

route.get("/user", localGuard, async (req, res, next) => {
  res.json(req.user);
});

module.exports = route;
