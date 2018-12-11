const fanModel = require('../models/fan/fan.model.server');


findAllFollowers = () => fanModel.find().populate('userId followerId').exec();
findAllMyFollowers = id =>{
    console.log("coming in findallfoloowers")
    console.log(fanModel.find({followerId : id}));
    return fanModel.find({followerId : id}).populate('userId').exec();
}
findAllMyFollowing = id =>fanModel.find({userId : id}).populate('followerId').exec();
findAllMyFollowingId = id =>fanModel.find({userId : id},{followerId : 1});
followUser = (userId , followerId) =>{
    console.log("follow user" , userId , followerId)
    return fanModel.create({userId : userId , followerId : followerId})
}

RemoveFollowUser = (userId , followerId) =>
    userFollowerModel.remove({userId : userId , followerId :followerId});

module.exports = {
    findAllFollowers,
    findAllMyFollowers,
    findAllMyFollowing,
    followUser,
    RemoveFollowUser,
    findAllMyFollowingId};

// function findFollowedFansForUser(id){
//     return fanModel.find({follower: id}, {fan: 1}).populate('fan')
// }
//
// function unfollowFan(id,fanId){
//     return  fanModel.deleteOne({follower: id, fan: fanId})
//
// }
//
// function findFan(id,fanId){
//     return fanModel.findOne({hash: fanId + id})
// }
//
// function addFollow(id,fanId){
//     return fanModel.create({fan: fanId, follower: id, hash: fanId + id})
// }
//
//
// function delFollower(id){
//     return fanModel.remove({follower:id})
// }
//
// function deleteFan(id){
//     return fanModel.remove({fan:id})
// }
//
// module.exports = {
//     findFollowedFansForUser,
//     unfollowFan,
//     findFan,
//     addFollow,
//     delFollower,
//     deleteFan
// };