module.exports = function () {
    const mongoose = require('mongoose');
    const databaseName = 'movie-db';
    var   connectionString = 'mongodb://localhost/';
    connectionString += databaseName;
    mongoose.connect(connectionString);
};