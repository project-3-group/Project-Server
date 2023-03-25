const myPassport = require("./passportConfig");
const authRoute = require("./controller");
const localGuard = require("./middleware/guard");

module.exports = { myPassport, authRoute, localGuard };
