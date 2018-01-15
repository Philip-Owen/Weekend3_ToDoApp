const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

let orderDate = false;
let orderDueDate = false;
let orderPriority = false;
let orderCategory = false;


router.get('/orderDate', (req,res) =>{
    let queryText;
    
    if (!orderDate) {
        queryText = `SELECT todos.id, todos.task_date, todos.due_date, todos.task, todos.completed, categories.category, priority.priorities
        FROM todos 
        JOIN categories ON todos.category_id = categories.id
        JOIN priority ON todos.priority_id = priority.id 
        ORDER BY todos.task_date, todos.id DESC`;
        orderDate = true;
    } else {
        queryText = `SELECT todos.id, todos.task_date, todos.due_date, todos.task, todos.completed, categories.category, priority.priorities
        FROM todos 
        JOIN categories ON todos.category_id = categories.id
        JOIN priority ON todos.priority_id = priority.id 
        ORDER BY todos.task_date, todos.id`;
        orderDate = false;
    }

    pool.query(queryText)
        .then((results) =>{
            // console.log('query results: ', results);        
            res.send(results.rows);
        })
        .catch((err) =>{
            // console.log('error making select query:', err);
            res.sendStatus(500);
        });
}); // end get('/dueDate)

// orders due date column
// begin get('/dueDate)
router.get('/orderDueDate', (req,res) =>{
    let queryText;
    
    if (!orderDueDate) {
        queryText = `SELECT todos.id, todos.task_date, todos.due_date, todos.task, todos.completed, categories.category, priority.priorities
        FROM todos 
        JOIN categories ON todos.category_id = categories.id
        JOIN priority ON todos.priority_id = priority.id 
        ORDER BY todos.due_date`;
        orderDueDate = true;
    } else {
        queryText = `SELECT todos.id, todos.task_date, todos.due_date, todos.task, todos.completed, categories.category, priority.priorities
        FROM todos 
        JOIN categories ON todos.category_id = categories.id
        JOIN priority ON todos.priority_id = priority.id 
        ORDER BY todos.due_date DESC`;
        orderDueDate = false;
    }

    pool.query(queryText)
        .then((results) =>{
            // console.log('query results: ', results);        
            res.send(results.rows);
        })
        .catch((err) =>{
            // console.log('error making select query:', err);
            res.sendStatus(500);
        });
}); // end get('/dueDate)

// orders due date column
// begin get('/dueDate)
router.get('/orderPriority', (req,res) =>{
    let queryText;
    
    if (!orderPriority) {
        queryText = `SELECT todos.id, todos.task_date, todos.due_date, todos.task, todos.completed, categories.category, priority.priorities
        FROM todos 
        JOIN categories ON todos.category_id = categories.id
        JOIN priority ON todos.priority_id = priority.id 
        ORDER BY todos.priority_id DESC`;
        orderPriority = true;
    } else {
        queryText = `SELECT todos.id, todos.task_date, todos.due_date, todos.task, todos.completed, categories.category, priority.priorities
        FROM todos 
        JOIN categories ON todos.category_id = categories.id
        JOIN priority ON todos.priority_id = priority.id 
        ORDER BY todos.priority_id`;
        orderPriority = false;
    }

    pool.query(queryText)
        .then((results) =>{
            // console.log('query results: ', results);        
            res.send(results.rows);
        })
        .catch((err) =>{
            // console.log('error making select query:', err);
            res.sendStatus(500);
        });
}); // end get('/dueDate)

router.get('/orderCategory', (req,res) =>{
    let queryText;
    
    if (!orderCategory) {
        queryText = `SELECT todos.id, todos.task_date, todos.due_date, todos.task, todos.completed, categories.category, priority.priorities
        FROM todos 
        JOIN categories ON todos.category_id = categories.id
        JOIN priority ON todos.priority_id = priority.id 
        ORDER BY todos.category_id`;
        orderCategory = true;
    } else {
        queryText = `SELECT todos.id, todos.task_date, todos.due_date, todos.task, todos.completed, categories.category, priority.priorities
        FROM todos 
        JOIN categories ON todos.category_id = categories.id
        JOIN priority ON todos.priority_id = priority.id 
        ORDER BY todos.category_id DESC`;
        orderCategory = false;
    }

    pool.query(queryText)
        .then((results) =>{
            // console.log('query results: ', results);        
            res.send(results.rows);
        })
        .catch((err) =>{
            // console.log('error making select query:', err);
            res.sendStatus(500);
        });
}); // end get('/orderPriority)


module.exports = router;