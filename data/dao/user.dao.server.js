const userModel = require('../models/user/user.model.server');


function createUser(user){
    return userModel.create(user);
}

function findAllUsers(){
    return userModel.find();
}

function deleteUser(userId){
    return userModel.deleteOne({_id:userId});
}

function updateUser(userId,user){
    return userModel.updateOne({_id: userId},user);

}

function findAllUsersFavMovies(){

    return userModel.find({type: 'Fan'}).
    populate('favourites').exec();
}

function findUserByUserName(username){
    return userModel.findOne({username:username});

}

function findUserById(id){
    return userModel.findById(id);
}

function findUserByCredentials(cred){
    return userModel.findOne(cred);
}

function findAllUserFavMoviesById(id){
    return userModel.findOne({_id: id}, {favourites: 1}).populate('favourites')
}

function findAllEventsByActorId(actorId){
    return userModel.findOne({_id: actorId}, {events: 1}).populate('events')

}

function updateUserEvent(id,event){
    return userModel.update({_id: id}, {$push: {events: event._id}})
}

function deleteEventofUser(id,event){
    return userModel.update({_id: id}, {$pull: {events: event._id}})
}

function findAllEventsOfUser(user){
    return userModel.findOne({_id: user._id}, {events: 1}).populate('events')
}

function findAllFavouriteMoviesOfUser(user){
    return userModel.findOne({_id: user._id}, {favourites: 1}).populate('favourites')
}

function findAllWatchlistMoviesOfUser(user){
    return userModel.findOne({_id: user._id}, {watchList: 1}).populate('watchList')
}

function deleteUserFavouriteMovie(id,movieId){
    return userModel.update({_id: id}, {$pull: {favourites: movieId}})
}

function deleteUserWatchlistMovie(id,movieId){
    return userModel.update({_id: id}, {$pull: {watchList: movieId}})

}




module.exports = {
    createUser,
    findAllUsers,
    deleteUser,
    updateUser,
    findAllUsersFavMovies,
    findUserByUserName,
    findUserById,
    findUserByCredentials,
    findAllUserFavMoviesById,
    findAllEventsByActorId,
    updateUserEvent,
    deleteEventofUser,
    findAllEventsOfUser,
    findAllFavouriteMoviesOfUser,
    findAllWatchlistMoviesOfUser,
    deleteUserFavouriteMovie,
    deleteUserWatchlistMovie


};