const mongoose = require('mongoose')

const movieSchema = mongoose.Schema({
    title:          String,
    id:             {type: Number, unique: true},
    artist:         String,
    releaseDate :   String,
    posterPath:     String

},{collection: 'movies'});

module.exports = movieSchema;