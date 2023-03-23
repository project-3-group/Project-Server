const myPassport = require("./passport");
const authRoute = require("./controller");
const localGuard = require("./middleware/guard");

module.exports = { myPassport, authRoute, localGuard };
