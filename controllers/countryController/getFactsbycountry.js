`use strict`

const express = require("express")
const route = express.Router();
const client=require('../../db/dbConfig');
const lookup = require('country-code-lookup')

route.get('/getFactsbyCountry/:country', getFactsHandler);
route.get('/getFactsbyCountry/alpha/:id', getFactCountryIdHandler);


function getFactsHandler(req, res) {
    const country = req.params.country;
    console.log(country);
    const sql =`SELECT facts.id,facts.fact,facts.country,facts.author,users.first_name,users.last_name,users.email,users.highest_score
    FROM facts
    LEFT JOIN users ON facts.author = users.id
    WHERE country = $1;`;
    const values = [country];

    client.query(sql,values)
    .then((result)=>{
        res.send(result.rows);
    })
    .catch((error) => {
        res.status(500).send(error)
    })
}

function getFactCountryIdHandler(req, res) {
    const id = req.params.id;
    let country = id;
    try {
        country = lookup.byIso(id)
        if(country === null) throw new Error('no country with that id was found')
        console.log(country);
    } catch (error) {
        return res.status(400).send({message: 'no country with that id was found'})
    }
    const sql =`SELECT facts.id,facts.fact,facts.country,facts.author,users.first_name,users.last_name,users.email,users.highest_score
    FROM facts
    LEFT JOIN users ON facts.author = users.id
    WHERE country = $1;`;
    const values = [country.iso3];

    client.query(sql,values)
    .then((result)=>{
        res.send(result.rows);
    })
    .catch((error) => {
        res.status(500).send(error)
    })
}

module.exports = route;