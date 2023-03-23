const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const localAuthMiddleware = require("./middleware/localAuthMiddleware");
const { addUser } = require("../services/userServices");
const localGuard = require("./middleware/guard");

const route = express.Router();

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

route.get("/login", localAuthMiddleware);

route.get("/logout", function (req, res, next) {
  req.logOut((err) => {
    if (err) next(err);
    res.send("logged out");
  });
});

route.get("/user", localGuard, async (req, res, next) => {
  res.json(req.user);
});

module.exports = route;
