const passport = require("passport");

const localAuthMiddleware = function (req, res, next) {
  const authenticate = passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (info) {
      return res.status(400).json(info);
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.json("logged in");
    });
  });

  authenticate(req, res, next);
};

module.exports = localAuthMiddleware;
