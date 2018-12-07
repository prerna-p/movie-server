module.exports = app =>{

    app.post('/api/movie/:movieId/favorite', favouriteMovies);
    app.post('/api/movie/:movieId/watchlist', watchlistMovies);
    app.get('/api/movie/favorites', findFavouriteMovies);
    app.get('/api/movie/watchlist', findWatchlistMovies);
    app.delete('/api/dislikeMovie', dislikeMovie);
    app.delete('/api/user/:userId/movie/:movieId/dislike', deleteMovieForUser);
    app.delete('/api/movie/:movieId/watchlist', removeMovieFromWatchlist);


    const userDao = require('../dao/user.dao.server');
    const movieDao = require('../dao/movie.dao.server');


    function favouriteMovies(req,res){

        let userId = req.session['userId'];
        let user = req.session['currentUser'];
        let movie = req.body;
        let newMovie = {
            title: movie.title,
            id: movie.id,
            release_date: movie.release_date,
            poster_path: (movie.poster_path.length !== 0 ? movie.poster_path : '')
        };
        let favorite;
        if (user === undefined)
            res.sendStatus(500);
        else
            movieDao.findMoviebyId(newMovie)
                .then(queryResult => {
                    if (queryResult === null) {
                        movieDao.createMovie(newMovie)
                            .then((movie) => {
                                user.favorites.push(movie);
                                userDao.updateUser(userId, user)
                                    .then(() => res.json({favorite: favorite}));
                            })
                    }
                    else {
                        user.favorites.push(queryResult._doc);
                        userDao .updateUser(userId, user)
                            .then(() => res.json({favorite: favorite}));
                    }
                })
    }



    function watchlistMovies(req,res){
        let userId = req.session['userId'];
        let user = req.session['currentUser'];
        let movie = req.body;
        let newMovie = {
            title: movie.title,
            id: movie.id,
            release_date: movie.release_date,
            poster_path: (movie.poster_path.length !== 0 ? movie.poster_path : '')
        };

        if (user === undefined)
            res.sendStatus(500);
        else
            movieDao.findMoviebyId(newMovie.id)
                .then(queryResult => {
                    if (queryResult === null) {
                        movieDao.createMovie(newMovie)
                            .then((movie) => {
                                user.watchList.push(movie);
                                userDao.updateUser(userId, user)
                                    .then(() => res.json({watchlist: watchlist}));
                            })
                    } else {
                        user.watchList.push(queryResult._doc);
                        userDao.updateUser(userId, user)
                            .then(() => res.json({watchlist: watchlist}));
                    }
                })
    }

    function findFavouriteMovies(req,res) {
        let user = req.session.currentUser;
        userDao.findAllFavouriteMoviesOfUser(user)
            .then(response => res.json(response));

    }

    function findWatchlistMovies(req,res) {
        let user = req.session.currentUser;
        userDao.findAllWatchlistMoviesOfUser(user)

    }

    function dislikeMovie(req,res) {
        let movie = req.body;
        let user = req.session.currentUser;
        userDao.deleteUserFavouriteMovie(user._id, movie._id)
            .then(() => res.sendStatus(200))

    }

    function deleteMovieForUser(req,res) {
        let userId = req.params['userId'];
        let movieId = req.params['movieId'];
        userDao.deleteUserFavouriteMovie(userId, movieId)
            .then(() => res.sendStatus(200));

    }

    function removeMovieFromWatchlist(req,res) {
        let movie = req.body;
        let user = req.session.currentUser;
        userDao.deleteUserWatchlistMovie(user._id, movie._id)
            .then(() => res.sendStatus(200))
    }


};