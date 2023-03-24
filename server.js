`use strict`

// server.js
const express = require('express');
const server = express();
const userRoute = require('./controllers/userControllers');
const getFacts = require('./controllers/countryController/getFacts');
const getQuestion = require('./controllers/countryController/getQuestion');
const cors = require('cors');
server.use(cors());
const pg = require('pg');
const PORT = process.env.PORT || 3000;
server.use(express.json());
require('dotenv').config();
server.use(express.json());
const client = new pg.Client(process.env.DATABASE_URL);






server.use('/users',userRoute);
server.use('/', getFacts);
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