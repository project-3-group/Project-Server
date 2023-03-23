const express = require("express");
const session = require("express-session");

const { myPassport, authRoute } = require("./auth");
const userRoute = require("./controllers/userControllers");

const server = express();

// TODO: create the secret inside .env file
server.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);
server.use(myPassport.initialize());
server.use(myPassport.session());
server.use(express.json());

server.use("/auth", authRoute);
server.use("/users", userRoute);

server.use((req, res) => res.status(404).send({ message: "route not found" }));

server.listen(3000, () => console.log("start server"));
