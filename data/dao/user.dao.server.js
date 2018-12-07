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

function findAllUserFavMovies(){

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
    return userModel.findOne({_id: id}, {favorites: 1}).populate('favorites')
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




module.exports = {
    createUser,
    findAllUsers,
    deleteUser,
    updateUser,
    findAllUserFavMovies,
    findUserByUserName,
    findUserById,
    findUserByCredentials,
    findAllUserFavMoviesById,
    findAllEventsByActorId,
    updateUserEvent,
    deleteEventofUser,
    findAllEventsOfUser,


};