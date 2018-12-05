var express = require('express')
var app = express()
var session = require('express-session')

var bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('./data/db')()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// require('./data/services/ServiceClient')(app);

app.listen(4000);

const client_heroku_url = "";
const client_local_url = "http://localhost:3000";


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin",
        client_local_url);
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

    /* set and get session */

app.get('/api/session/set/:name/:value', setSession);
app.get('/api/session/get/:name', getSession);

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'any string'
}));

function setSession(req, res) {
    var name = req.params['name'];
    var value = req.params['value'];
    req.session[name] = value;
    res.send(req.session);
}

function getSession(req, res) {
    var name = req.params['name'];
    var value = req.session[name];
    res.send(value);
}


