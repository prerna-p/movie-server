const mongoose = require('mongoose')

const fanSchema = mongoose.Schema({

    // follower:   {type: mongoose.Schema.Types.ObjectId,ref: 'UserModel'},
    // fan:        {type:mongoose.Schema.Types.ObjectId,ref: 'UserModel'}
    userId: {type:mongoose.Schema.Types.ObjectId,ref: 'UserModel'},
    followerId:   {type: mongoose.Schema.Types.ObjectId,ref: 'UserModel'}

},{collection:'fans'});

module.exports = fanSchema;