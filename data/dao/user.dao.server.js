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




module.exports = {
    createUser,
    findAllUsers,
    deleteUser,
    updateUser,
    findAllUserFavMovies,
    findUserByUserName,
    findUserById,
    findUserByCredentials
};