// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const todos = require('./routes/todos.router');
const orderRouter = require('./routes/order.router');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('server/public'));

// routes
app.use('/todoList', todos);
app.use('/order', orderRouter);

// Port Listener
const port = 8088;
app.listen(port, ()=> console.log(`Server up on port: ${port}`));