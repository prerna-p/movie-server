const likeModel = require('../models/like/like.model.server');


function findAllFavouriteMovies(){

}

function deleteFavouriteMovie(){

}

function deleteLike(id){
    return likeModel.remove({user:id})
}


module.exports = {
    findAllFavouriteMovies,
    deleteFavouriteMovie,
    deleteLike

};