const mongoose = require('mongoose')

const likeSchema = mongoose.Schema({
    movie:  {type: mongoose.Schema.Types.ObjectId, ref: 'MovieModel'},
    user:   {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    hash:   {type: String, unique:true}

},{collection:'likes'});

module.exports = likeSchema;