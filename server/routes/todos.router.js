const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET routes

router.get('/', (req,res) =>{
    let queryText = `SELECT todos.id, todos.task_date, todos.task, todos.completed, categories.category, todos.category_id 
                     FROM todos 
                     JOIN categories ON todos.category_id = categories.id 
                     ORDER BY todos.id`;

    pool.query(queryText)
        .then((results) =>{
            // console.log('query results: ', results);        
            res.send(results.rows);
        })
        .catch((err) =>{
            console.log('error making select query:', err);
            res.sendStatus(500);
        });
});

router.get('/categories', (req,res) =>{
    let queryText = 'SELECT * FROM categories ORDER BY id';

    pool.query(queryText)
        .then((results) =>{
            // console.log('query results: ', results);        
            res.send(results.rows);
        })
        .catch((err) =>{
            console.log('error making select query:', err);
            res.sendStatus(500);
        });
});

// POST routes

router.post('/', (req,res) =>{
    let queryText = 'INSERT INTO todos(task, category_id) VALUES ($1, $2)';

    pool.query(queryText, [req.body.task, req.body.category])
        .then((results) =>{
            // console.log('query results: ', results);        
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
            // console.log('query results: ', results);        
            res.send(results);
        })
        .catch((err) =>{
            console.log('error making update query:', err);
            res.sendStatus(500);
        });
});


// DELETE routes

router.delete('/deleteTodo/:id', (req,res) => {
    let queryText = 'DELETE FROM todos WHERE id = $1';

    pool.query(queryText, [req.params.id])
        .then((results) =>{
            console.log('query results: ', results);        
            res.send(results);
        })
        .catch((err) =>{
            console.log('error making delete query:', err);
            res.sendStatus(500);
        });
});


module.exports = router;