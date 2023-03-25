`use strict`

// server.js
const express = require('express');
const server = express();
const userRoute = require('./controllers/userControllers');
const getFactsbyCountry = require('./controllers/countryController/getFactsbycountry');
const getFactsbyUser = require('./controllers/countryController/getFactsbyUser');
const getFactsbyID = require('./controllers/countryController/getFactsbyID');
const getQuestion = require('./controllers/countryController/getQuestion');
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
server.get('*', notFoundHandler);
function notFoundHandler(req, res) {
    res.status(404).send("Page not found");
}


client.connect()
.then(()=>{
    server.listen(PORT,() => {
        console.log(`start server in ${PORT}`)}); 
    });

module.exports = client;