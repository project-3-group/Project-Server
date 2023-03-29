`use strict`

const express = require("express")
const route = express.Router();
const client=require('../../db/dbConfig');

route.get('/getFactsbyCountry/:country', getFactsHandler);


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
module.exports = route;