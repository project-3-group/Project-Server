`use strict `

const express = require("express")
const route = express.Router();
const pg = require('pg');
const client=require('../db/dbConfig');
route.use(express.json());
route.get('/getQuestion', getQuestionHandler);


function getQuestionHandler(req, res) {

    const sql = `SELECT * from questions ORDER BY RANDOM() LIMIT 1;`;
    console.log(sql);

    client.query(sql)
    .then((result)=>{
        res.send(result.rows)
    })
    .catch(() => {
        console.log('error');
    })
}
module.exports = route;