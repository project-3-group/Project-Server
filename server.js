require('dotenv').config();
const express = require('express')
const session = require("express-session");
const { ValidationError } = require("yup");

const { myPassport, authRoute } = require("./auth");
const userRoute = require("./controllers/userControllers");
const apiRoute = require('./controllers/api/apiGet')

const server = express();

// middleware
server.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
server.use(myPassport.initialize());
server.use(myPassport.session());
server.use(express.json());


// routes
//http://localhost:3000
server.use('/',apiRoute)
server.use("/auth", authRoute);
server.use("/users", userRoute);

// error handling
server.use((req, res) => res.status(404).send({ message: "route not found" }));

server.use((err, req, res, next) => {
  console.log(err);
  if (err instanceof ValidationError) {
    return res.status(400).json(err);
  }
  res.status(500).send("server error");
});

// start the server
server.listen(3000, () => console.log("start server"));
