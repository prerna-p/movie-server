var express = require('express');
var app = express();
var session = require('express-session');

var bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('./data/db')()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


const client_heroku_url = "http://desolate-retreat-56126.herokuapp.com";
const client_local_url = "http://pickflick-movieapp.herokuapp.com/";



app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", client_local_url);
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.get('/' , (req ,res) => res.send("Server is up"));

    /* set and get session */

app.get('/api/session/set/:name/:value', setSession);
app.get('/api/session/get/:name', getSession);

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'any string',
    cookie: {
        secure : false,
        httpOnly : false,
        maxAge: idleTimeoutSeconds * 1000,
    },
    rolling: true
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

    /* services*/

require('./data/services/admin.service.server')(app);
require('./data/services/user.service.server')(app);
require('./data/services/critic.service.server')(app);
require('./data/services/event.service.server')(app);
require('./data/services/fan.service.server')(app);
require('./data/services/mapi.service.server')(app);
require('./data/services/movie.service.server')(app);


app.listen(process.env.PORT || 4000);

