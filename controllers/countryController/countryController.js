'use strict';
const express = require('express');
const { localGuard } = require("../../auth");
const client = require('../../db/dbConfig')

const crudRoute = express.Router();

//Routes
crudRoute.post('/addFact',localGuard, addFact);
crudRoute.delete('/deleteFact/:id',localGuard, deleteFact);


//functions
function addFact(req, res) {
    const mov = req.body;
    console.log(mov);
    const sql = `INSERT INTO facts (fact,country,author ) 
    VALUES ($1,$2,$3) RETURNING *`;
    const values = [mov.fact, mov.country, req.user.id];
    client.query(sql,values)
        .then(() => {
            res.send('your data was added');
        }).catch((err) => {
            res.status(500).send(err)
        })
}

function deleteFact(req, res) {

    const id = req.params.id;
    const sql = `DELETE FROM facts WHERE id=${id} AND author=${req.user.id}`;
    client.query(sql)
        .then((data) => {
            res.status(204).json({});
            
        })
        .catch((err) => {
            res.status(500).send(err)
        })}

module.exports = crudRoute;