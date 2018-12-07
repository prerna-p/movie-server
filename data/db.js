module.exports = function () {
    const mongoose = require('mongoose');
    const databaseName = 'movie-db';
    var   connectionString = 'mongodb://localhost/';
    connectionString += databaseName;

    const heroku_url = "";
    mongoose.connect(connectionString);
};