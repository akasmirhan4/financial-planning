const express = require('express');
const mongoose = require('mongoose');
const FinancialReport = require('./models/financialReport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const ObjectId = mongoose.Types.ObjectId;

// Google Auth
const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = '703685191309-mc19468ht0u6ukg8jcc179njvt8dto2g.apps.googleusercontent.com'
const client = new OAuth2Client(CLIENT_ID);

// express app
const app = express();

//connect to mongodb
const dbURI = 'mongodb+srv://akasmirhan4:20QoGwtNYaDoMNlJ@financial-health-review.cl11n.mongodb.net/FinancialReports?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log('connected to db');
        // listen for requests
        let port = 80;
        app.listen(port);
        console.log(`Server live at port ${port} ...`);
    })
    .catch((err) => {
        console.log('cannot connect to db');
    });

//Session
app.use(session({
    secret: "Secret Message",
    resave: true,
    saveUninitialized: true
}));

// middleware & static files
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(cookieParser());


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
    app.get(`/${currentPage}`, checkAuthenticated, (req, res) => {
        if (req.user.sub == req.session.sub) {
            console.log('session exist');
            res.render('index', { currentPage, pages, user: req.user, data: req.session.data });
        }
        else {
            console.log('session cannot be found');
            FinancialReport.findOne({ _id: req.user.sub }, (err, result) => {
                if (err || !result) {
                    console.log('user not found in database');
                    // Create new profile
                    const financialReport = new FinancialReport({
                        _id: req.user.sub,
                        clientName: req.user.name,
                        agentInfo: { factFindDate: new Date() },
                        clientDetail: { email: req.user.email }
                    });
                    financialReport.save()
                        .then((result) => {
                            console.log('New Data Created!');
                            req.session.sub = req.user.sub;
                            let data = result;
                            req.session.data = data;
                            console.log(`req session created: ${req.session.sub}`);
                            res.redirect('/');
                        })
                        .catch((err) => {
                            // console.log(err);
                            console.log('Error creating new data');
                        });
                }
                else {
                    console.log('User found in database');
                    let data = result;
                    req.session.data = data;
                    req.session.sub = req.user.sub;
                    console.log(`req session created: ${req.session.sub}`);
                    res.render('index', { currentPage, pages, user: req.user, data: req.session.data });
                }
            });
        }
    });
});

app.get('/logout', (req, res) => {
    res.clearCookie('session-token');
    console.log('cookie clear!');
    res.redirect('/login');
});

app.get('/login', (req, res) => {
    res.render('login');
});



//Redirect
app.get('/', (req, res) => {
    res.redirect(`/agent-info`);
});

app.post('/login', (req, res) => {
    let token = req.body.token;

    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
    }
    verify()
        .then(() => {
            res.cookie('session-token', token);
            console.log('cookie made!');
            res.send("success");
        })
        .catch(() => {
            console.log('Incorrect Authentication');
            res.send("unsuccessful")
        });

});

// 404
app.use(checkAuthenticated, (req, res) => {
    res.status(404).render('404', { currentPage: ['404 | Webpath Not Found'], pages, user: req.user });
});

function checkAuthenticated(req, res, next) {
    let token = req.cookies['session-token'];

    let user = {};
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
        });
        const payload = ticket.getPayload();
        console.log(payload);
        user.sub = String(payload.sub);
        user.name = payload.name;
        user.email = payload.email;
    }
    verify()
        .then(() => {
            req.user = user;
            next();
        })
        .catch((err) => {
            console.log("Incorrect Authentication");
            res.redirect('/login');
        })
}