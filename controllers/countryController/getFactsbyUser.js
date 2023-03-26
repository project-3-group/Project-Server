`use strict`

const express = require("express")
const client=require('../../db/dbConfig');

const route = express.Router();

route.get('/getFactsbyUser/:author', getFactsHandler);


function getFactsHandler(req, res) {
    const author = req.params.author;
    console.log(author);
    const sql =`SELECT * FROM facts WHERE author=$1;`;
    const values = [author];
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