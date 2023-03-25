'use strict';

const express = require("express")

const apiRoute = express.Router();

const axios = require('axios');

require('dotenv').config();

apiRoute.get('/',(req,res) => {
    try{
        const ApiURL = process.env.ApiURL;
        axios.get(ApiURL)
        .then((result)=>{
            console.log(result);
            res.send(result.data);
            
        })

        .catch((err) => {
            console.log("sorry,something went wrong", err);
            res.status(500).send(err);
        })


    }

    catch{

    }
  })

  module.exports = apiRoute;