const passport = require("passport");
const strategy = require("./strategies/localStrategy");
const { getUserById } = require("../services/userServices");

passport.use(strategy);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await getUserById(id);
    if (user === null) done(null, false);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
