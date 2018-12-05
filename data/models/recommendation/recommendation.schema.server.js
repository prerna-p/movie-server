const mongoose = require('mongoose');
const recommendationSchema = mongoose.Schema({

    movie:  {type: mongoose.Schema.Types.ObjectId, ref: 'MovieModel'},
    user:   {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    hash:   {type: String, unique: true}

}, {collection: 'recommendation'});
module.exports = recommendationSchema;