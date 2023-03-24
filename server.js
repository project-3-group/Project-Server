// server.js
const express = require('express')
const apiRoute = require('./controllers/api/apiGet')

const server = express();

// server.use('/users',userRoute)

//http://localhost:3000
server.use('/',apiRoute)

server.listen(3000,() => console.log("start server")) 