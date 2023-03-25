require('dotenv').config();
const express = require('express')
const session = require("express-session");

const client = require('./db/dbConfig')
const { myPassport, authRoute } = require("./auth");
const userRoute = require("./controllers/userControllers");
const apiRoute = require('./controllers/api/apiGet')
const crudRoute =require ('./controllers/countryController/countryController')
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
server.post('/addFact',localGuard, crudRoute);
server.delete('/deleteFact/:id',localGuard, crudRoute);

// error handling
server.use((req, res) => res.status(404).send({ message: "route not found" }));

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("server error");
});

// start the server
const PORT = process.env.PORT || 3000

client.connect().then(() =>{
  server.listen(PORT, () => console.log("server start listening at port: " + PORT));
})
