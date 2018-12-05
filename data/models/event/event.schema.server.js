const mongoose = require('mongoose')

const eventSchema = mongoose.Schema({
    name:       String,
    date:       Date,
    location:   String,
    des :       String

},{collection: 'events'})

module.exports = eventSchema;