const criticModel = require('../models/critic/critic.model.server');

function createCriticReview(review){
    return criticModel.create(review);
}

function findAllCriticReviewsForMovie(movieId){
    return criticModel.find({movieId: movieId});

}

function findAllCriticReviewsForUser(userId){
    return criticModel.find({reviewerId: userId});

}

function deleteCriticReview(reviewId){

    return criticModel.remove({_id: reviewId});

}

function updateCriticReview(reviewId,reviewTitle,reviewText){

    return criticModel.update({_id:reviewId}, {$set: {title:reviewTitle, text:reviewText} })
}


module.exports = {
    createCriticReview,
    findAllCriticReviewsForMovie,
    findAllCriticReviewsForUser,
    deleteCriticReview,
    updateCriticReview
};