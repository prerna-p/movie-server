const fanModel = require('../models/fan/fan.model.server');

module.exports = app =>{

    app.get('/api/fan', findAllFans);
    app.delete('/api/fan/:fid', (req,res)=>{fanModel.remove({_id :req.params['fid'] }).then(resilt=> res.send("deleted"))});
    app.post('/api/:userId/fan/:fanId', followUser);
    app.delete('/api/:userId/fan/:fanId', unfollowUser);
    app.get('/api/:userId/follower' , findMyFollowers);
    app.get('/api/:userId/following' , findMyFollowing);

    // app.get('/api/fan/likes/:fanId', findFanContent);
    // app.get('/api/fan/:fId/following', findFollowedFansForUser);

    const fanDao = require('../dao/fan.dao.server');

    function findAllFans(req,res){
        fanDao.findAllFollowers().then(result => {
            res.send(result);
        })
    }

    function followUser(req, res){
        return fanDao.followUser(req.params['userId'] , req.params['fanId']).then((result )=>{
            res.send(result);
        })
    }

    function unfollowUser(req, res){
        fanDao.RemoveFollowUser(req.params['userId'] , req.params['fanId']).then((result )=>{
            res.send(result)
        })

    }

    function findMyFollowers(req, res){
        console.log("find my followers" , req.params['userId'])
        fanDao.findAllMyFollowers(req.params['userId']).then(result=>{
            console.log("my result is " , result)
            res.send(result)
        })
    }

    function findMyFollowing(req,res){
        fanDao.findAllMyFollowing(req.params['userId']).then(result=>{
            res.send(result)
        })
    }

    // function findAllFans(req,res) {
    //     userDao.findAllUsers().then( result => res.json(result));
    // }
    //
    // function followFan(req,res) {
    //     fanDao.addFollow(req.params['userId'] , req.params['fanId']).then(() => {
    //         res.sendStatus(200);
    //     });
    //
    //     //let user = req.session['currentUser'];
    //     // let userId = req.params['userId'];
    //     // let fanId = req.params['fanId'];
    //     // if (user === undefined) {
    //     //     res.send("Not found");
    //     // }
    //     // else{
    //     //     fanDao.findFan(userId, fanId)
    //     //         .then(results => {
    //     //             if (results) {
    //     //                 res.send("Error");
    //     //             }
    //     //             else{
    //     //                 fanDao.addFollow(userId, fanId)
    //     //                     .then(() => {
    //     //                         res.sendStatus(200);
    //     //                     })
    //     //             }
    //     //         })
    //     // }
    // }
    //
    // function unfollowFan(req,res) {
    //     let fan = req.body;
    //     let user = req.session.currentUser;
    //     fanDao.unfollowFan(user._id, fan._id)
    //         .then(() => res.sendStatus(200))
    //
    // }
    //
    // function findFanContent(req,res) {
    //     userDao.findAllUserFavMoviesById(req.params['fanId'])
    //         .then(result => res.json(result));
    // }
    //
    // function findFollowedFansForUser(req,res) {
    //     // let user = req.session['currentUser'];
    //     // let resultFans = [];
    //     fanDao.findFollowedFansForUser(req.params['fId']).then(res=>{
    //         res.send(res)
    //     })
    //     // fanDao.findFollowedFansForUser(user._id)
    //     //     .then((followedFans) => {
    //     //         followedFans.map((followedFan) => {
    //     //             resultFans.push(followedFan.fan)
    //     //         });
    //     //         res.send(resultFans);
    //     //     })
    // }


};