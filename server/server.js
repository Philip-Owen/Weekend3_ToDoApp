// Dependencies
const express = require('express');
const app = express();


app.use(express.static('server/public'));


// Port Listener
const port = 8088;
app.listen(port, ()=> console.log(`Server up on port: ${port}`));