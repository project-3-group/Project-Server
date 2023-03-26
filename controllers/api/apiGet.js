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
        const oneCountryAPI = `https://restcountries.com/v3.1/name/${title}`
        axios.get(ApiURL)
            .then((result) => {
                axios.get(oneCountryAPI)
                    .then(item => {
                        const overview = result.data.query.pages;
                        const objValue = Object.values(overview);
                        const myItem = item.data[0];
                        const allData = {...myItem, overview: objValue[0]?.extract}
                        console.log(item);
                        res.send(allData);
                    })
                    .catch((err) => {
                        console.log("sorry,something went wrong", err);
                        res.status(500).send(err);
                    })

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