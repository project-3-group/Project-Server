`use strict`

const express = require("express")
const client=require('../../db/dbConfig');

const route = express.Router();

route.get('/getFactsbyID/:id', getFactsHandler);

function getFactsHandler(req, res) {
    const id = req.params.id;
    console.log(id);
    const sql =`SELECT * FROM facts WHERE id=$1;`;
    const values = [id];
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