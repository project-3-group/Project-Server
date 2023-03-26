`use strict `

const express = require("express")
const client=require('../../db/dbConfig');

const route = express.Router();

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