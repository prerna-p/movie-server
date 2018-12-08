const likeModel = require('../models/like/like.model.server');


function findAllFavouriteMovies(){

    return likeModel.find().populate('Movie user')

}

function deleteFavouriteMovie(){
    return likeModel.remove({_id: id})

}

function deleteLike(id){
    return likeModel.remove({user:id})
}


module.exports = {
    findAllFavouriteMovies,
    deleteFavouriteMovie,
    deleteLike

};