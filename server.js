`use strict`
require('dotenv').config();
const express = require('express');
const session = require("express-session");
const cors = require('cors');

const client = require('./db/dbConfig')
const { myPassport, authRoute ,localGuard} = require("./auth");

// import routes
const userRoute = require("./controllers/userControllers");
const apiRoute = require('./controllers/api/apiGet')
const crudRoute =require ('./controllers/countryController/countryController')

const getFactsbyCountry = require('./controllers/countryController/getFactsbycountry');
const getFactsbyUser = require('./controllers/countryController/getFactsbyUser');
const getFactsbyID = require('./controllers/countryController/getFactsbyID');
const getQuestion = require('./controllers/countryController/getQuestion');
const updateFactsbyID = require('./controllers/countryController/updateFactsbyID');

const server = express();

server.use(express.json());

// middleware
server.use(cors({origin:process.env.FRONTEND_URL,credentials:true}))
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
server.use('/allcountry',apiRoute)
server.use("/auth", authRoute);
server.use("/users", userRoute);
server.post('/addFact',localGuard, crudRoute);
server.delete('/deleteFact/:id',localGuard, crudRoute);

server.use('/', getFactsbyCountry);
server.use('/', getFactsbyUser);
server.use('/', getFactsbyID);
server.use('/', getQuestion);
server.use('/',updateFactsbyID);



server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("server error");
});

const PORT = process.env.PORT || 3000;
client.connect()
.then(()=>{
    server.listen(PORT,() => {
        console.log(`start server in ${PORT}`)}); 
    });

module.exports = client;
