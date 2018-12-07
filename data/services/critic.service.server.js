module.exports = app => {

    app.post('/api/review',createCriticReview);
    app.get('/api/review/:movieId',findAllCriticReviewsForMovie);
    app.get('/api/review',findAllCriticReviewsForUser);
    app.delete('/api/review/:reviewId',deleteCriticReview);
    app.put('/api/review',updateCriticReview);

    const criticDao = require('../dao/critic.dao.server');

    function createCriticReview(req,res){
        let reviewInput = req.body;
        let review = {
            title: reviewInput.title,
            text: reviewInput.text,
            movieName: reviewInput.movieName,
            movieId: reviewInput.movieId,
            reviewerId: req.session.currentUser._id,
            reviewer: req.session.currentUser,
            createdDate: new Date()
        };
        criticDao.createCriticReview(review)
            .then(review=>{
                res.sendStatus(200);
            });
    }

    function findAllCriticReviewsForMovie(req,res) {
        let movieId = req.params['movieId'];
        criticDao.findAllCriticReviewsForMovie(movieId)
            .then(reviews => res.json(reviews));
    }

    function findAllCriticReviewsForUser(req,res) {
        let userId = req.session.currentUser._id;
        criticDao.findAllCriticReviewsForUser(userId)
            .then(reviews => res.json(reviews));
    }

    function deleteCriticReview(req,res) {
        let reviewId = req.params['reviewId'];
        let user = req.session.currentUser;
        criticDao.deleteCriticReview(reviewId)
            .then(() => res.sendStatus(200))
            .then(() => res.sendStatus(200))
    }

    function updateCriticReview(req,res) {
        let review = req.body;
        let reviewTitle = review.reviewTitle;
        let reviewText = review.reviewText;
        let reviewId = review._id;
        criticDao.updateCriticReview(reviewId, reviewTitle, reviewText)
            .then(() => res.sendStatus(200));
    }

};