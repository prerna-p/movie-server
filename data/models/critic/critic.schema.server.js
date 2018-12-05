const mongoose = require('mongoose');
const criticSchema = mongoose.Schema({

    title:      String,
    text:       {type: String, default: ''},
    movieName:  String,
    movieId:    {type: String, required: true},
    reviewerId: {type: mongoose.Schema.ObjectId, ref: 'UserModel', required: true},
    reviewer:   {type: mongoose.Schema.Types.Object, ref: 'UserModel'},
    createdDate: Date

}, {collection: 'critic'});
module.exports = criticSchema;