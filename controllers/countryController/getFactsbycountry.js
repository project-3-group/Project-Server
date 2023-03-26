`use strict`

const express = require("express")
const route = express.Router();
const client=require('../../db/dbConfig');

route.get('/getFactsbyCountry/:country', getFactsHandler);


function getFactsHandler(req, res) {
    const country = req.params.country;
    console.log(country);
    const sql =`SELECT * FROM facts WHERE country=$1;`;
    const values = [country];
    console.log(sql);

    client.query(sql,values)
    .then((result)=>{
        // res.send(result.rows)
        res.send(result.rows);

    })
    .catch((error) => {
        res.send('error')
    })
}
module.exports = route;