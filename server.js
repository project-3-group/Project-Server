// server.js
const express = require('express')
const userRoute = require('./users/controller')

const server = express();

server.use('/users',userRoute)

server.listen(3000,() => console.log("start server")) 