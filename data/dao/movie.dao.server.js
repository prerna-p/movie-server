const movieModel = require('../models/movie/movie.model.server');


function findMoviebyId(movieId){
    return movieModel.findOne({id: movieId})
}

function createMovie(newMovie){
    return movieModel.create(newMovie);
}

function findAllMovies(){
    return movieModel.find();
}



module.exports = {
    findMoviebyId,
    createMovie,
    findAllMovies
};