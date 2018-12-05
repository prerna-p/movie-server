const mongoose = require('mongoose')

const userSchema = mongoose.Schema({

    username:       {type: String, required: true},
    password:       String,
    firstName:      {type: String, default: ''},
    lastName:       {type: String, default: ''},
    email:          {type: String, default: ''},
    dob:            {type: Date, default: new Date()},
    phone:          {type: Number, default: 0},
    city:           {type: String, default: ''},
    type:           String,
    followers:      [{type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}],
    following:      [{type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}],
    favourites:     [{type: mongoose.Schema.Types.ObjectId, ref: 'MovieModel'}],
    watchList:      [{type: mongoose.Schema.Types.ObjectId, ref: 'MovieModel'}],
    events:         [{type: mongoose.Schema.Types.ObjectId, ref: 'EventModel'}],
    eventLocation:  {type: String, default: ''},
    eventDes:       {type: String, default: ''}

},{collection: 'users'})

module.exports = userSchema;
