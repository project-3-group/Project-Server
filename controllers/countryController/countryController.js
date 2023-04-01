'use strict';
const express = require('express');
const lookup = require('country-code-lookup')
const { localGuard } = require("../../auth");
const client = require('../../db/dbConfig')

const crudRoute = express.Router();

//Routes
crudRoute.post('/addFact',localGuard, addFact);
crudRoute.delete('/deleteFact/:id',localGuard, deleteFact);


//functions
function addFact(req, res) {
    const mov = req.body;
    let country = mov.country;
    try {
        country = lookup.byIso(mov.country)
    } catch (error) {
        return res.status(400).send({message: 'no country with that id was found'})
    }

    const sql = `INSERT INTO facts (fact,country,author ) 
    VALUES ($1,$2,$3) RETURNING *`;
    const values = [mov.fact, country.iso3, req.user.id];
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