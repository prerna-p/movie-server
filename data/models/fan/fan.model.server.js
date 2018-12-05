const mongoose = require('mongoose');
const fanSchema = require('./fan.schema.server');
module.exports = mongoose.model('FanModel',fanSchema);