module.exports = function () {
    const mongoose = require('mongoose');
    const databaseName = 'movie-db';
    var   connectionString = 'mongodb://localhost/';
    connectionString += databaseName;

    const heroku_url = "mongodb://moviedb:moviedb123@ds153841.mlab.com:53841/heroku_m68krstg";
    //mongoose.connect(connectionString);
    mongoose.connect(heroku_url);
};