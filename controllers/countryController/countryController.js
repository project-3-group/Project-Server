'use strict';
const express = require('express');
const cors = require('cors');
const server = express();

server.use(cors());
server.use(express.json());
//Routes
server.post('/addFact', addFact);
server.delete('/deleteFact/:id', deleteFact);


//functions
function addFact(req, res) {
    const mov = req.body;
    console.log(mov);
    const sql = `INSERT INTO facts (fact,country,author ) 
    VALUES ($1,$2,$3) RETURNING *`;
    const values = [mov.fact, mov.country, mov.author];
    client.query(sql,values)
        .then(() => {
            res.send('your data was added');
        }).catch((err) => {
            errorHandler(err, req, res);

        })
}

function deleteFact(req, res) {

    const id = req.params.id;
    const sql = `DELETE FROM facts WHERE id=${id}`;
    client.query(sql)
        .then((data) => {
            res.status(204).json({});
            
        })
        .catch((err) => {
            errorHandler(err, req, res);
        })}