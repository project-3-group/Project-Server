// userController.js
const express = require("express")

const route = express.Router();

route.get('/',(req,res) => {
  res.send('hello from the user get route')
});

module.exports = route;