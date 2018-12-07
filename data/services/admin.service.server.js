module.exports = app =>{

    app.post('/api/admin/user',createUser);
    app.get('/api/admin/user',findAllUsers);
    app.delete('/api/admin/user/:userId',deleteUser);
    app.put('/api/admin/user/:userId',updateUser);
    app.get('/api/admin/user/favMovies', findAllUserFavMovies);
    app.get('/api/admin/allFavoriteMovies', findAllFavouriteMovies);
    app.delete('/api/admin/favoriteMovie/:favMovieId', deleteFavouriteMovie);

    const userDao = require('../dao/user.dao.server');
    const likeDao = require('../dao/like.dao.server');
    const fanDao = require('../dao/fan.dao.server');
    const recommendationDao = require('../dao/recommendation.dao.server');

    function createUser(req,res){
        userDao.createUser(req.body).then(user =>
            res.send(user))

    }

    function findAllUsers(req,res){
        let user = req.session.currentUser;
        if (user === undefined) {
            res.sendStatus(500);
        }
        else if (user.type !== 'Admin') {
            res.sendStatus(501);
        }
        else {
            userDao.findAllUsers()
                .then(users =>
                    res.json(users))
        }
    }

    function deleteUser(req,res){
        let id = req.params['userId']
        userDao.deleteUser(id)
            .then(() => recommendationDao.deleteRec(id)
                .then(() => fanDao.delFollower(id)
                    .then(() => fanDao.deleteFan(id)
                        .then(() => likeDao.deleteLike(id))
                    )
                )
            )
    }

    function updateUser(req,res){
        userDao.updateUser(req.body,req.params['userId'])
            .then(result => {
                res.sendStatus(200)
            });
    }

    function findAllUserFavMovies(req,res){
        let user = req.session.currentUser;
        if (user.type !== 'Admin') {
            res.sendStatus(501);
        }
        else {
            userDao.findAllUserFavMovies()
                .then(users =>
                    res.json(users))
        }

    }

    function findAllFavouriteMovies(req,res){
        likeDao.findAllFavouriteMovies()
            .then((result) =>
                res.json(result))

    }

    function deleteFavouriteMovie(req,res){
        likeDao.deleteFavouriteMovie(req.params['favMovieId'])
            .then(result =>
                res.sendStatus(200));
    }


};