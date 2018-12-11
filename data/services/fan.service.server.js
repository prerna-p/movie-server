module.exports = app =>{

    app.get('/api/fan', findAllFans);
    app.post('/api/fan/:fanId', followFan);
    app.delete('/api/fan/unfollow', unfollowFan);
    app.get('/api/fan/likes/:fanId', findFanContent);
    app.get('/api/actor/events/:actorId', findAllEventsByActorId);
    app.get('/api/fan/following', findFollowedFansForUser);

    const fanDao = require('../dao/fan.dao.server');
    const userDao = require('../dao/user.dao.server');

    function findAllFans(req,res) {
        userDao.findAllUsers().then( result => res.json(result));
    }

    function followFan(req,res) {
        let user = req.session.currentUser;
        let fanId = req.params['fanId'];
        if (user === undefined) {
            res.send("Not found");
        }
        else{

            //fanDao.findFan(req.session.userId, fanId)
            fanDao.findFan(user._id, fanId)
                .then(results => {
                    if (results) {
                        res.send("Error");
                    } else {
                        //fanDao.addFollow(req.session.userId, fanId)
                        fanDao.addFollow(user._id, fanId)
                            .then(() => {
                                res.sendStatus(200);
                            })
                    }
                })
        }
    }

    function unfollowFan(req,res) {
        let fan = req.body;
        let user = req.session.currentUser;
        fanDao.unfollowFan(user._id, fan._id)
            .then(() => res.sendStatus(200))

    }

    function findFanContent(req,res) {
        userDao.findAllUserFavMoviesById(req.params['fanId'])
            .then(result => res.json(result));
    }

    function findAllEventsByActorId(req,res) {
        userDao.findAllEventsByActorId(req.params['actorId'])
            .then(result =>
                res.json(result));
    }

    function findFollowedFansForUser(req,res) {
        let user = req.session['currentUser'];
        let resultFans = [];
        fanDao.findFollowedFansForUser(user._id)
            .then((followedFans) => {
                followedFans.map((followedFan) => {
                    resultFans.push(followedFan.fan)
                });
                res.send(resultFans);
            })
    }


};