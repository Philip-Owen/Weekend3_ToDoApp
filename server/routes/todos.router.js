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

// POST routes

router.post('/', (req,res) =>{
    let queryText = 'INSERT INTO todos(task) VALUES ($1)';

    pool.query(queryText, [req.body.task])
        .then((results) =>{
            console.log('query results: ', results);        
            res.send(results.rows);
        })
        .catch((err) =>{
            console.log('error making insert query:', err);
            res.sendStatus(500);
        });
});

// PUT routes

router.put('/completeUpdate/:id', (req,res) =>{
    let queryText = `UPDATE todos SET completed = 'Complete' WHERE id = $1`

    pool.query(queryText, [req.params.id])
        .then((results) =>{
            console.log('query results: ', results);        
            res.send(results);
        })
        .catch((err) =>{
            console.log('error making update query:', err);
            res.sendStatus(500);
        });
});

module.exports = router;