const mongoose = require('mongoose')

const fanSchema = mongoose.Schema({

    follower:   {type: mongoose.Schema.Types.ObjectId,ref: 'UserModel'},
    fan:        {type:mongoose.Schema.Types.ObjectId,ref: 'UserModel'},
    hash:       {type: String, unique:true}

},{collection:'fans'})

module.exports = fanSchema;