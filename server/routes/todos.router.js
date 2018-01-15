const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

let orderDueDate = false;
let orderPriority = false;

// GET routes

router.get('/', (req,res) =>{

    let queryText = `SELECT todos.id, todos.task_date, todos.due_date, todos.task, todos.completed, categories.category, priority.priorities
                    FROM todos 
                    JOIN categories ON todos.category_id = categories.id
                    JOIN priority ON todos.priority_id = priority.id 
                    ORDER BY todos.completed DESC, todos.task_date DESC, todos.id DESC`
    
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

router.get('/priorities', (req,res) =>{
    let queryText = 'SELECT * FROM priority ORDER BY id';

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
    let queryText
    if (req.body.dueDate.length == 0) {
        queryText= 'INSERT INTO todos(task, due_date, category_id, priority_id) VALUES ($1, NULL, $2, $3)';
        
        pool.query(queryText, [req.body.task,req.body.category, req.body.priority])
        .then((results) =>{
            // console.log('query results: ', results);        
            res.send(results.rows);
        })
        .catch((err) =>{
            console.log('error making insert query:', err);
            res.sendStatus(500);
        });
    } else {
        queryText= 'INSERT INTO todos(task, due_date, category_id, priority_id) VALUES ($1, $2, $3, $4)';
        
        pool.query(queryText, [req.body.task, req.body.dueDate, req.body.category, req.body.priority])
        .then((results) =>{
            // console.log('query results: ', results);        
            res.send(results.rows);
        })
        .catch((err) =>{
            console.log('error making insert query:', err);
            res.sendStatus(500);
        });
    }

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
            // console.log('query results: ', results);        
            res.send(results);
        })
        .catch((err) =>{
            console.log('error making delete query:', err);
            res.sendStatus(500);
        });
});

router.delete('/deleteAllTodos', (req,res) => {
    let queryText = 'DELETE FROM todos';

    pool.query(queryText)
        .then((results) =>{
            // console.log('query results: ', results);        
            res.send(results);
        })
        .catch((err) =>{
            console.log('error making delete query:', err);
            res.sendStatus(500);
        });
});


module.exports = router;