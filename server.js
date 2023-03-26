`use strict`

require('dotenv').config();
const express = require('express');
const server = express();
const session = require("express-session");

const client = require('./db/dbConfig')
const { myPassport, authRoute } = require("./auth");
const userRoute = require("./controllers/userControllers");
const apiRoute = require('./controllers/api/apiGet')

const crudRoute =require ('./controllers/countryController/countryController')






const userRoute = require('./controllers/userControllers');
const getFactsbyCountry = require('./controllers/countryController/getFactsbycountry');
const getFactsbyUser = require('./controllers/countryController/getFactsbyUser');
const getFactsbyID = require('./controllers/countryController/getFactsbyID');
const getQuestion = require('./controllers/countryController/getQuestion');
const updateFactsbyID = require('./controllers/countryController/updateFactsbyID.JS');
const cors = require('cors');
server.use(cors());
const pg = require('pg');
const PORT = process.env.PORT || 3000;
server.use(express.json());
require('dotenv').config();
server.use(express.json());
const client = require('./controllers/db/dbConfig');




server.use('/users',userRoute);
server.use('/', getFactsbyCountry);
server.use('/', getFactsbyUser);
server.use('/', getFactsbyID);
server.use('/', getQuestion);
server.use('/',updateFactsbyID);
server.get('*', notFoundHandler);
function notFoundHandler(req, res) {
    res.status(404).send("Page not found");
}
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


//http://localhost:3000
server.use('/',apiRoute)
server.use("/auth", authRoute);
server.use("/users", userRoute);
server.post('/addFact',localGuard, crudRoute);
server.delete('/deleteFact/:id',localGuard, crudRoute);



server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("server error");
});


client.connect()
.then(()=>{
    server.listen(PORT,() => {
        console.log(`start server in ${PORT}`)}); 
    });

module.exports = client;
