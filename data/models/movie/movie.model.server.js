const mongoose = require('mongoose');
const movieSchema = require('./movie.schema.server');
module.exports = mongoose.model('MovieModel',movieSchema);