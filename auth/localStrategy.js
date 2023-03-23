const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { getUserByEmail } = require("../services/userServices");

const strategy = new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
  try {
    const user = getUserByEmail(email);

    if (user === null) return done(null, false, { message: "Incorrect username" });

    const isPassCorrect = await bcrypt.compare(password, user.password);

    if (isPassCorrect === false) return done(null, false, { message: "Incorrect password" });

    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = strategy;
