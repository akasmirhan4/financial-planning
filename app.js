const express = require('express');

// express app
const app = express();

//register view engine
app.set('view engine', 'ejs');

// listen for requests
let port = 80;
app.listen(port);
console.log(`Server live at port ${port} ...`);

// middleware & static files
app.use(express.static(__dirname + '/public'));

// List of tabs
let pages = [
    ['agent-info'],
    ['disclaimer'],
    ['about-you'],
    ['dependants'],
    ['networth'],
    ['cashflow'],
    ['risk-preference'],
    ['financial-needs'],
    ['financial-analysis'],
    [
        'timeline/projection',
        'timeline/goals',
        'timeline/charts'
    ]
]
// Routing
pages.forEach((currentPage, index, pages) => {
    app.get(`/${currentPage}`, (req, res) => {
        res.render('index', { currentPage, clientName: "Amirrul Kasmirhan", pages });
    });
});

//Redirect
app.get('/',(req,res)=>{
    res.redirect('/agent-info');
});

// 404
app.use((req,res)=>{
    res.render('404', {currentPage: ['404 | Webpath Not Found'], clientName: "Amirrul Kasmirhan", pages} );
});