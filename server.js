// server.js
const express = require('express')
// const userRoute = require('./users/controller')
const apiRoute = require('./controllers/api/apiGet')

const server = express();

// server.use('/users',userRoute)
server.use('/',apiRoute)

server.listen(3000,() => console.log("start server")) 