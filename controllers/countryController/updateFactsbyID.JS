`use strict `

const express = require('express');
const route = express();
const pg = require('pg');
const client = require('../db/dbConfig');
route.use(express.json());

route.put('/getFactsbyID/:id', authenticateUser, updatebyID);

function authenticateUser(req, res, next) {
    const Header = req.headers.authorization;
    if (Header) {
        req.user = { id: 123 }; 
        next();
    } else {
        res.status(401).json({ message: 'Missing token' });
    }
};

function updatebyID(req, res, next) {
    const id = req.params.id;
    const fact = req.body;
    const userId = req.user.id;

    const sql = `SELECT * FROM facts WHERE id=$1;`;
    const values = [id];

    client.query(sql, values)
        .then((result) => {
            if (userId !== result.rows[0].author) {
                return res.status(403).send({ message: 'Unauthorized' });
            } else {
                const sql = 'UPDATE facts SET fact=$1, country=$2 WHERE id=$3 RETURNING *';
                const values = [fact.fact, fact.country, id];

                client.query(sql, values)
                    .then((data) => {
                        res.status(200).send(data.rows);
                    })
                    .catch(error => {
                        res.status(500).send('Error updating record');
                    });
            }
        })
        .catch((error) => {
            res.status(500).send('Error querying record');
        });
};

module.exports = route;