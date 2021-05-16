const express = require('express');

// express app
const app = express();

//register view engine
app.set('view engine', 'ejs');

// listen for requests
app.listen(8080);

// middleware & static files
app.use(express.static('public'));

app.get('/',(req,res)=>{
    console.log('Request received!');
    res.render('index');
});