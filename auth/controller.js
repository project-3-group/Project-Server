const express = require("express");
const localAuthMiddleware = require("./middleware/localAuthMiddleware");

const route = express.Router();

route.get("/login", localAuthMiddleware);

route.get("/logout", function (req, res, next) {
  req.logOut((err) => {
    if (err) next(err);
    res.send("logged out");
  });
});

module.exports = route;
