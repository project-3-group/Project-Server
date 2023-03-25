'use strict';

const express = require("express")

const apiRoute = express.Router();

const axios = require('axios');

require('dotenv').config();

apiRoute.get('/', (req, res) => {
    try {
        const ApiURL = process.env.ApiURL;
        axios.get(ApiURL)
            .then((result) => {
                console.log(result);
                res.send(result.data);

            })

            .catch((err) => {
                console.log("sorry,something went wrong", err);
                res.status(500).send(err);
            })
    }

    catch {

    }
})


apiRoute.get('/:title', (req, res) => {
    try {
        const title = req.params.title;
        const ApiURL = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&titles=${title}&exintro&explaintext&exsentences=10`;
        axios.get(ApiURL)
            .then((result) => {
                console.log(result);
                res.send(result.data);

            })

            .catch((err) => {
                console.log("sorry,something went wrong", err);
                res.status(500).send(err);
            })
    }

    catch {

    }
})



module.exports = apiRoute;