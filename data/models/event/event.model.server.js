const mongoose = require('mongoose');
const eventSchema = require('./event.schema.server');
module.exports = mongoose.model('EventModel',eventSchema);