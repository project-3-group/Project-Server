`use strict`

const express = require("express")
const route = express.Router();
const pg = require('pg');
const client=require('../../server')
route.get('/getFacts/:country', getFactsHandler);


function getFactsHandler(req, res) {
    const country = req.params.country;
    console.log(country);
    const sql =`SELECT fact,author FROM facts WHERE country=$1;`;
    const values = [country];
    console.log(sql);

    client.query(sql,values)
    .then((result)=>{
        // res.send(result.rows)
        res.send(result.rows);

    })
    .catch((error) => {
        console.log('error')
    })
}
module.exports = route;