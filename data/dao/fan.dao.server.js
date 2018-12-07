const fanModel = require('../models/fan/fan.model.server');



function findFollowedFansForUser(id){

    return fanFollowedModel.find({follower: id}, {fan: 1}).populate('fan')

}

function unfollowFan(id,fanId){
    return  fanModel.deleteOne({follower: id, fan: fanId})

}

function findFan(id,fanId){
    return fanModel.findOne({hash: fanId + id})
}

function addFollow(id,fanId){
    return fanModel.create({fan: fanId, follower: id, hash: fanId + id})
}


function delFollower(id){
    return fanModel.remove({follower:id})
}

function deleteFan(id){
    return fanModel.remove({fan:id})
}

module.exports = {
    findFollowedFansForUser,
    unfollowFan,
    findFan,
    addFollow,
    delFollower,
    deleteFan
};