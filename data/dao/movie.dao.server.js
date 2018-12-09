const movieModel = require('../models/movie/movie.model.server');


function findMoviebyId(movieId){
    return movieModel.find({id: movieId})
}

function createMovie(newMovie){
    return movieModel.create(newMovie);
}


module.exports = {
    findMoviebyId,
    createMovie
};