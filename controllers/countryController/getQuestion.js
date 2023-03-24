`use strict `

const express = require("express")
const route = express.Router();
const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);
route.use(express.json());
route.get('/getQuestion/:id', getQuestionHandler);


function getQuestionHandler(req, res) {
    const id = req.params.id;
    console.log(id);
    const sql = ` SELECT * from questions WHERE id=$1;`;
    const values = [id];
    console.log(sql);
    console.log(id);

    client.query(sql,values)
    .then((result)=>{
        res.send(result.rows)
    })
    .catch(() => {
        console.log('error');
    })
}
module.exports = route;