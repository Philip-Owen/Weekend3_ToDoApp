// Dependencies
const express = require('express');
const app = express();
const todos = require('./routes/todos.router');


app.use(express.static('server/public'));

// routes
app.use('/todoList', todos);

// Port Listener
const port = 8088;
app.listen(port, ()=> console.log(`Server up on port: ${port}`));