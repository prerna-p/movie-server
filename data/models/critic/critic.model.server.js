const mongoose = require('mongoose');
const criticSchema = require('./critic.schema.server');
module.exports = mongoose.model('CriticModel',criticSchema);