const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET routes

router.get('/', (req,res) =>{
    let queryText = 'SELECT * FROM todos ORDER BY id';

    pool.query(queryText)
        .then((results) =>{
            console.log('query results: ', results);        
            res.send(results.rows);
        })
        .catch((err) =>{
            console.log('error making select query:', err);
            res.sendStatus(500);
        });
});

module.exports = router;